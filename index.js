import express from 'express';
import { AgentOs } from '@rivet-dev/agent-os';
import common from '@rivet-dev/agent-os-common';
import pi from '@rivet-dev/agent-os-pi';

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Agent OS
let vm = null;

async function initializeAgentOS() {
  try {
    console.log('Initializing Agent OS...');
    vm = await AgentOs.create({ software: [common, pi] });
    console.log('Agent OS initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Agent OS:', error);
    throw error;
  }
}

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Agent OS is running',
    timestamp: new Date().toISOString()
  });
});

// Create session endpoint
app.post('/api/session', async (req, res) => {
  try {
    if (!vm) {
      return res.status(503).json({ error: 'Agent OS not initialized' });
    }

    const { sessionId } = await vm.createSession('pi', {
      env: { 
        ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || ''
      },
    });

    res.json({ sessionId });
  } catch (error) {
    console.error('Error creating session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Send prompt endpoint
app.post('/api/prompt', async (req, res) => {
  try {
    if (!vm) {
      return res.status(503).json({ error: 'Agent OS not initialized' });
    }

    const { sessionId, prompt } = req.body;

    if (!sessionId || !prompt) {
      return res.status(400).json({ error: 'sessionId and prompt are required' });
    }

    // Set up event listener for this request
    const events = [];
    const listener = (event) => {
      events.push(event);
    };

    vm.onSessionEvent(sessionId, listener);

    await vm.prompt(sessionId, prompt);

    res.json({ 
      success: true,
      events 
    });
  } catch (error) {
    console.error('Error sending prompt:', error);
    res.status(500).json({ error: error.message });
  }
});

// Read file endpoint
app.get('/api/file', async (req, res) => {
  try {
    if (!vm) {
      return res.status(503).json({ error: 'Agent OS not initialized' });
    }

    const { path } = req.query;

    if (!path) {
      return res.status(400).json({ error: 'path query parameter is required' });
    }

    const content = await vm.readFile(path);
    const text = new TextDecoder().decode(content);

    res.json({ 
      path,
      content: text 
    });
  } catch (error) {
    console.error('Error reading file:', error);
    res.status(500).json({ error: error.message });
  }
});

// Close session endpoint
app.delete('/api/session/:sessionId', async (req, res) => {
  try {
    if (!vm) {
      return res.status(503).json({ error: 'Agent OS not initialized' });
    }

    const { sessionId } = req.params;
    vm.closeSession(sessionId);

    res.json({ success: true });
  } catch (error) {
    console.error('Error closing session:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
async function start() {
  try {
    await initializeAgentOS();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Agent OS server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Cleanup on shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  if (vm) {
    await vm.dispose();
  }
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  if (vm) {
    await vm.dispose();
  }
  process.exit(0);
});

start();
