# Agent OS Application

A Node.js application running Rivet Agent OS, deployed on Dokploy.

## Features

- RESTful API for interacting with Agent OS
- Support for Pi agent (Claude integration)
- Session management
- File system operations
- Health check endpoint

## API Endpoints

### Health Check
```
GET /
```

### Create Session
```
POST /api/session
```

### Send Prompt
```
POST /api/prompt
Body: { "sessionId": "...", "prompt": "..." }
```

### Read File
```
GET /api/file?path=/path/to/file
```

### Close Session
```
DELETE /api/session/:sessionId
```

## Environment Variables

- `PORT` - Server port (default: 3000)
- `ANTHROPIC_API_KEY` - Required for Pi agent functionality

## Development

```bash
npm install
npm run dev
```

## Deployment on Dokploy

This application is configured to run on Dokploy with automatic deployment from Git.

## Built With

- [@rivet-dev/agent-os](https://github.com/rivet-dev/agent-os) - Portable OS for AI agents
- Express.js - Web framework
- Node.js - Runtime environment
