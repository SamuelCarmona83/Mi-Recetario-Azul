#!/bin/bash

# Production deployment script for Mi Recetario Azul
# This script helps you deploy your application using Docker

set -e  # Exit on any error

echo "🚀 Starting production deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "⚠️  Please edit .env file with your production values before continuing!"
    echo "🔑 Make sure to set secure passwords and secrets!"
    read -p "Press Enter to continue after updating .env file..."
fi

# Build and start services
echo "🏗️  Building Docker images..."
docker-compose build --no-cache

echo "📦 Starting services..."
docker-compose up -d

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Services are running!"
    echo ""
    echo "🌐 Application URLs:"
    echo "   - Main app: http://localhost:3000"
    echo "   - API docs: http://localhost:3000/docs"
    echo "   - Health check: http://localhost:3000/api/health"
    echo ""
    echo "📊 To view logs: docker-compose logs -f"
    echo "🛑 To stop: docker-compose down"
    echo "🔄 To restart: docker-compose restart"
else
    echo "❌ Some services failed to start. Check logs with: docker-compose logs"
    exit 1
fi
