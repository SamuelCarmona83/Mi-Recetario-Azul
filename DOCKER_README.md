# Mi Recetario Azul - Production Docker Setup

This document explains how to run your application in production using Docker.

## 🚀 Quick Start

1. **Clone and setup**
   ```bash
   git clone <your-repo>
   cd Mi-Recetario-Azul
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your production values
   ```

3. **Deploy**
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

## 📋 Prerequisites

- Docker (>= 20.0)
- Docker Compose (>= 2.0)

## 🔧 Configuration

### Environment Variables

Update the `.env` file with your production values:

```bash
# Database
DB_NAME=mi_recetario
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_HOST=postgres
DB_PORT=5432

# Application
NODE_ENV=production
APP_PORT=3000
PORT=5001

# Security
JWT_SECRET=your_jwt_secret_here
SESSION_SECRET=your_session_secret_here
```

### Database Configuration

The PostgreSQL database will be automatically created with:
- Database: `mi_recetario` (or your custom name)
- User: `postgres` (or your custom user)
- Port: `5432`
- Persistent volume for data

## 🐳 Docker Commands

### Basic Operations
```bash
# Build and start all services
npm run docker:up

# Stop all services
npm run docker:down

# View logs
npm run docker:logs

# Restart services
npm run docker:restart

# Build images
npm run docker:build
```

### Manual Docker Commands
```bash
# Build and start
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f app
docker-compose logs -f postgres

# Rebuild
docker-compose build --no-cache
```

## 🌐 Service URLs

After deployment, your application will be available at:

- **Main Application**: http://localhost:3000
- **API Documentation**: http://localhost:3000/docs
- **Health Check**: http://localhost:3000/api/health

## 🗂️ Project Structure

```
Mi-Recetario-Azul/
├── Dockerfile              # Production container definition
├── docker-compose.yml      # Multi-service orchestration
├── nginx.conf              # Reverse proxy configuration
├── deploy.sh               # Deployment script
├── .dockerignore           # Docker build exclusions
├── .env.example            # Environment template
├── init.sql                # Database initialization
├── api/                    # Backend source
├── src/                    # Frontend source
└── dist/                   # Built frontend (generated)
```

## 🔒 Security Features

- Non-root user in containers
- Health checks for all services
- Rate limiting via Nginx
- Security headers
- CORS configuration
- Environment variable isolation

## 📊 Monitoring

### Health Checks
```bash
# Application health
curl http://localhost:3000/api/health

# Database health
docker-compose exec postgres pg_isready -U postgres
```

### Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f app
docker-compose logs -f postgres
docker-compose logs -f nginx
```

## 🔄 Updates and Maintenance

### Application Updates
```bash
# Pull latest code
git pull

# Rebuild and redeploy
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Database Backup
```bash
# Create backup
docker-compose exec postgres pg_dump -U postgres mi_recetario > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U postgres mi_recetario < backup.sql
```

## 🐛 Troubleshooting

### Common Issues

1. **Port conflicts**
   ```bash
   # Check what's using the port
   lsof -i :3000
   
   # Change port in .env
   APP_PORT=8080
   ```

2. **Database connection issues**
   ```bash
   # Check database logs
   docker-compose logs postgres
   
   # Test connection
   docker-compose exec postgres psql -U postgres -d mi_recetario -c "SELECT 1;"
   ```

3. **Build issues**
   ```bash
   # Clean build
   docker-compose down -v
   docker system prune -f
   docker-compose build --no-cache
   ```

### Service Status
```bash
# Check running containers
docker-compose ps

# Check resource usage
docker stats

# Inspect specific service
docker-compose exec app sh
```

## 🚀 Production Deployment

For production servers:

1. **Setup SSL certificates** (optional)
   - Place certificates in `./ssl/` directory
   - Uncomment HTTPS section in `nginx.conf`

2. **Configure domain**
   - Update `server_name` in `nginx.conf`
   - Update CORS settings in `.env`

3. **Security hardening**
   - Use strong passwords
   - Configure firewall
   - Regular security updates

## 📈 Scaling

To scale the application:

```bash
# Scale app service
docker-compose up -d --scale app=3

# Use external load balancer
# Configure multiple instances behind ALB/nginx
```

## 🆘 Support

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables
3. Ensure all required ports are available
4. Check Docker and Docker Compose versions
