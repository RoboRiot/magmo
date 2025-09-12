#!/bin/bash
set -e

echo "=== Building Next.js ==="
npm run build

echo "=== Removing old SSR build from functions/.next ==="
rm -rf functions/.next

echo "=== Copying fresh .next build into functions/.next ==="
cp -r .next functions/.next

echo "=== Deploying to Firebase ==="
firebase deploy
