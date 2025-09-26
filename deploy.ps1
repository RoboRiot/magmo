Write-Host "=== Building Next.js ==="
npm run build

Write-Host "=== Removing old SSR build from functions/.next ==="
Remove-Item -Recurse -Force "functions\.next"

Write-Host "=== Copying fresh .next build into functions/.next ==="
Copy-Item -Recurse ".next" "functions\.next"

Write-Host "=== Deploying to Firebase ==="
firebase deploy
