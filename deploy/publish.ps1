# Publie site/ dans arxWeb/AITraining/ puis pousse — Coolify redeploie au push.
# Usage : .\deploy\publish.ps1 [-ArxWeb "chemin\vers\arxWeb"] [-NoPush]
param(
  [string]$ArxWeb = "G:\My Drive\Arx Capital\web\arxWeb",
  [switch]$NoPush
)
$ErrorActionPreference = "Stop"

$src = Join-Path $PSScriptRoot "..\site"
if (-not (Test-Path $src))    { throw "Introuvable : $src" }
if (-not (Test-Path $ArxWeb)) { throw "Depot arxWeb introuvable : $ArxWeb" }

$dst = Join-Path $ArxWeb "AITraining"
New-Item -ItemType Directory -Force $dst | Out-Null
Copy-Item (Join-Path $src "*") $dst -Recurse -Force
Write-Host "Copie -> $dst"

git -C $ArxWeb add "AITraining"
git -C $ArxWeb diff --cached --quiet
if ($LASTEXITCODE -eq 0) {
  Write-Host "Rien a commiter."
  exit 0
}
git -C $ArxWeb commit -m "AITraining: mise a jour du programme de formation"
if ($NoPush) { Write-Host "Commit fait, push ignore (-NoPush)."; exit 0 }

$branch = (git -C $ArxWeb rev-parse --abbrev-ref HEAD).Trim()
git -C $ArxWeb push origin $branch
Write-Host "Pousse sur $branch. Verifier : https://arx-consulting.com/AITraining/"
