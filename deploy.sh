#!/bin/bash
set -e

echo "=== Deploying Märsta Bilhus ==="

cd /root/apps/bilhus

# Pull latest code
git pull origin main

# Build and restart containers
docker compose down
docker compose build --no-cache
docker compose up -d

# Show status
echo ""
echo "=== Deployment complete ==="
docker compose ps
