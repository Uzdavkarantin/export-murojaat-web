#git pull && npm run build && sudo systemctl reload nginx

#!/bin/bash

echo "Pulling latest code..."
git pull || { echo "Git pull failed"; exit 1; }

echo "Building React app..."
npm run build || { echo "Build failed"; exit 1; }

echo "Reloading Nginx..."
sudo /bin/systemctl reload nginx || { echo "Failed to reload Nginx"; exit 1; }

echo "Update completed successfully!"
