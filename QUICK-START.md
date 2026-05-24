# Agent OS on Dokploy - Quick Start

This application is ready to deploy to Dokploy. Follow these steps to get it running.

## What You Have

✅ A Node.js application with Express server  
✅ Dockerfile for containerized deployment  
✅ Git repository initialized with all code committed  
✅ Deployment-ready structure  
✅ Demo mode (ready for when agent-os packages are published)  

## Next Steps

### 1. Create a GitHub Repository

You have two options:

**Option A: Using GitHub CLI**
```bash
cd "/Users/jadengarza/Documents/AI Workspace/rivet/agent-os-app"
gh repo create agent-os-app --public --source=. --remote=origin --push
```

**Option B: Manual GitHub Setup**
1. Go to https://github.com/new
2. Create a repository named `agent-os-app`
3. Run these commands:
```bash
cd "/Users/jadengarza/Documents/AI Workspace/rivet/agent-os-app"
git remote add origin https://github.com/YOUR-USERNAME/agent-os-app.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Dokploy

1. **Access Dokploy**:
   - Open http://localhost:3000
   - Log in to your account

2. **Create New Application**:
   - Click "Create Application" or "+" button
   - Select "Application" type
   - Name it `agent-os-app`

3. **Configure Git Source**:
   - Select "Git" as deploy method
   - Repository URL: `https://github.com/YOUR-USERNAME/agent-os-app.git`
   - Branch: `main`
   - Build method: Choose `Dockerfile` (recommended) or `Nixpacks`

4. **Set Environment Variables** (Optional):
   - `PORT`: `3000` (or leave default)
   - `NODE_ENV`: `production`

5. **Configure Domain**:
   - Use Dokploy's auto-generated domain, or
   - Add your custom domain

6. **Deploy**:
   - Click "Deploy" button
   - Wait for build to complete
   - Check logs for any errors

### 3. Verify Deployment

Once deployed, test your endpoints:

```bash
# Health check
curl https://your-app.domain/

# Application info
curl https://your-app.domain/api/info

# Test session creation (demo mode)
curl -X POST https://your-app.domain/api/session
```

## Application Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | Health check and API overview |
| `/api/info` | GET | Application information |
| `/api/session` | POST | Create agent session (demo) |
| `/api/prompt` | POST | Send prompt to agent (demo) |
| `/api/file` | GET | Read file from VM (demo) |
| `/api/session/:id` | DELETE | Close agent session (demo) |

## Current State

🟡 **Demo Mode**: The application runs without actual agent-os packages  
📦 **Packages**: Waiting for `@rivet-dev/agent-os-core` to be published to npm  
✅ **Deployment**: Fully ready for Dokploy  
🚀 **Production**: Can be enabled once packages are available  

## When Agent OS Packages Are Available

The application is structured to easily enable full functionality:

1. Update `index.js`: Set `AGENT_OS_ENABLED = true`
2. Uncomment the import statements
3. Update `package.json`: Move packages from `optionalDependencies` to `dependencies`
4. Set `ANTHROPIC_API_KEY` environment variable in Dokploy
5. Redeploy

## Troubleshooting

### Port Already in Use
- Check if another service is using port 3000
- Change `PORT` environment variable in Dokploy

### Build Fails
- Verify Node.js version >= 18.0.0
- Check Dokploy build logs
- Ensure Dockerfile is present

### Cannot Connect
- Verify application is binding to `0.0.0.0`
- Check firewall rules
- Confirm domain DNS settings

## Resources

- [Agent OS Documentation](https://rivet.dev/docs/agent-os)
- [Agent OS GitHub](https://github.com/rivet-dev/agent-os)
- [Dokploy Docs](https://docs.dokploy.com)

## Support

For Agent OS: https://github.com/rivet-dev/agent-os/issues  
For Dokploy: https://github.com/dokploy/dokploy/issues  
