# Deploying Agent OS to Dokploy

This guide explains how to deploy the Agent OS application to Dokploy.

## Prerequisites

1. **Dokploy Installation**: Dokploy should be running at `http://localhost:3000`
2. **Git Repository**: Push this application to a Git hosting service (GitHub, GitLab, etc.)
3. **Environment Variables**: Set `ANTHROPIC_API_KEY` for Pi agent functionality

## Deployment Steps

### Option 1: Web Interface Deployment

1. **Access Dokploy**:
   - Open `http://localhost:3000` in your browser
   - Log in to your Dokploy account

2. **Create New Application**:
   - Click "Create Application" or "New Project"
   - Select "Application" type
   - Choose "Git" as the source

3. **Configure Git Source**:
   - Repository URL: `your-git-repo-url`
   - Branch: `main`
   - Build Type: `Nixpacks` or `Dockerfile`

4. **Set Environment Variables**:
   - Add `PORT=3000`
   - Add `NODE_ENV=production`
   - Add `ANTHROPIC_API_KEY=your-key` (optional, for when Agent OS is enabled)

5. **Configure Domain**:
   - Add a custom domain or use Dokploy's generated domain
   - Enable HTTPS/SSL if needed

6. **Deploy**:
   - Click "Deploy" to start the build process
   - Monitor logs for any errors

### Option 2: Dockerfile Deployment

This project includes a `Dockerfile` for containerized deployment:

```bash
# Build the image
docker build -t agent-os-app .

# Run the container
docker run -p 3000:3000 -e NODE_ENV=production agent-os-app
```

Dokploy will automatically detect and use the Dockerfile during deployment.

### Option 3: GitHub Integration

1. Connect your GitHub account to Dokploy
2. Select this repository
3. Enable automatic deployments on push to main branch
4. Dokploy will rebuild and redeploy on every commit

## Post-Deployment

### Access Your Application

- Health check: `https://your-app.domain/`
- API info: `https://your-app.domain/api/info`

### Verify Deployment

```bash
# Check health
curl https://your-app.domain/

# Get application info
curl https://your-app.domain/api/info
```

### Logs

View application logs in Dokploy's web interface:
- Navigate to your application
- Click "Logs" tab
- Monitor real-time output

## When Agent OS Packages Are Available

Once `@rivet-dev/agent-os-core` and related packages are published to npm:

1. Update `index.js`:
   - Change `AGENT_OS_ENABLED` to `true`
   - Uncomment the agent-os imports
   - Uncomment the initialization code

2. Update `package.json`:
   - Move agent-os packages from `optionalDependencies` to `dependencies`

3. Redeploy:
   - Push changes to Git
   - Dokploy will automatically rebuild and redeploy

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | Server port (default: 3000) |
| `NODE_ENV` | No | Environment mode (production/development) |
| `ANTHROPIC_API_KEY` | No* | Required for Pi agent (*when Agent OS is enabled) |

## Troubleshooting

### Build Fails

- Check Dokploy logs for npm install errors
- Verify Node.js version (requires >=18.0.0)
- Ensure all dependencies are available

### Application Won't Start

- Check if PORT environment variable is set correctly
- Verify no port conflicts with other services
- Review startup logs in Dokploy

### Connection Refused

- Ensure the application is binding to `0.0.0.0` not `localhost`
- Check firewall rules
- Verify domain DNS configuration

## Resources

- [Agent OS Documentation](https://rivet.dev/docs/agent-os)
- [Agent OS Repository](https://github.com/rivet-dev/agent-os)
- [Dokploy Documentation](https://docs.dokploy.com)
- [Dokploy GitHub](https://github.com/dokploy/dokploy)
