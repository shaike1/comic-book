#!/usr/bin/env bash
# ============================================================
# deploy.sh — deploy Comic Creator to a remote Ubuntu server
# Usage:
#   ./deploy.sh <user@server-ip> [ssh-key-path]
# Examples:
#   ./deploy.sh root@1.2.3.4
#   ./deploy.sh ubuntu@1.2.3.4 ~/.ssh/my_key
# ============================================================

set -euo pipefail

SERVER="${1:-}"
SSH_KEY="${2:-}"

if [ -z "$SERVER" ]; then
  read -rp "Server (user@ip):  " SERVER
fi

SSH_OPTS="-o StrictHostKeyChecking=no"
if [ -n "$SSH_KEY" ]; then
  SSH_OPTS="$SSH_OPTS -i $SSH_KEY"
fi

REMOTE_DIR="/opt/comic-creator"

echo ""
echo "🚀  Deploying Comic Creator → $SERVER"
echo "    Remote dir: $REMOTE_DIR"
echo ""

# ---- 1. Install Docker on server (skip if already installed) ----
echo "🔧  [1/4] Ensuring Docker is installed on server..."
# shellcheck disable=SC2087
ssh $SSH_OPTS "$SERVER" bash <<'REMOTE'
if ! command -v docker &>/dev/null; then
  echo "Installing Docker..."
  curl -fsSL https://get.docker.com | sh
  systemctl enable --now docker
  echo "Docker installed ✓"
else
  echo "Docker already present ✓"
fi
REMOTE

# ---- 2. Sync project files (exclude heavy dirs) ----
echo ""
echo "📦  [2/4] Syncing project files..."
ssh $SSH_OPTS "$SERVER" "mkdir -p $REMOTE_DIR"

rsync -az --progress \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude 'data' \
  --exclude '*.db' \
  --exclude 'dist' \
  ${SSH_KEY:+-e "ssh -i $SSH_KEY -o StrictHostKeyChecking=no"} \
  ./ "$SERVER:$REMOTE_DIR/"

# ---- 3. Build & start containers ----
echo ""
echo "🐳  [3/4] Building and starting Docker containers (may take ~3 min on first run)..."
# shellcheck disable=SC2087
ssh $SSH_OPTS "$SERVER" bash <<REMOTE
cd $REMOTE_DIR
docker compose down --remove-orphans 2>/dev/null || true
docker compose build --no-cache
docker compose up -d
REMOTE

# ---- 4. Health check ----
echo ""
echo "🏥  [4/4] Health check..."
sleep 5

IP=$(echo "$SERVER" | cut -d@ -f2)
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "http://${IP}" || echo "000")

echo ""
if [ "$HTTP_CODE" = "200" ]; then
  echo "✅  Deployment successful!"
  echo "    🌐  http://${IP}"
else
  echo "⚠️   Server returned HTTP $HTTP_CODE — containers might still be starting."
  echo "    Check logs: ssh $SSH_OPTS $SERVER 'cd $REMOTE_DIR && docker compose logs -f'"
  echo "    🌐  http://${IP}"
fi

echo ""
echo "📋  Useful commands (run on server):"
echo "    Logs:    cd $REMOTE_DIR && docker compose logs -f"
echo "    Restart: cd $REMOTE_DIR && docker compose restart"
echo "    Stop:    cd $REMOTE_DIR && docker compose down"
