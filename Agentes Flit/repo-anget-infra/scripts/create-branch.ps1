param(
    [string]$RepoPath,
    [string]$BranchName
)

Write-Host "==============================="
Write-Host "INFRA AGENT - CREAR RAMA"
Write-Host "==============================="

if (-not (Test-Path $RepoPath)) {
    Write-Error "Error: El repositorio no existe en $RepoPath"
    exit 1
}

Set-Location $RepoPath

Write-Host "Repositorio actual:"
Get-Location

Write-Host "Cambiando a develop..."
git checkout develop
if ($LASTEXITCODE -ne 0) { Write-Error "Fallo al cambiar a develop"; exit 1 }

Write-Host "Actualizando repositorio..."
git pull
# Ignoramos error de pull si no hay remoto configurado para pruebas locales

Write-Host "Creando nueva rama: $BranchName..."
git checkout -b $BranchName
if ($LASTEXITCODE -ne 0) { Write-Error "Fallo al crear la rama $BranchName"; exit 1 }

Write-Host "=================================="
Write-Host "Rama creada correctamente"
Write-Host "=================================="
Write-Host "Rama: $BranchName"
