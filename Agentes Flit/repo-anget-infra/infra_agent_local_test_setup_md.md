# Infra Agent Local Test Setup

## Objetivo

Este documento permite realizar una prueba local controlada del Infra Agent utilizando:

- Repositorio principal del agente:

```text
D:\repro_codecommit\agent-infra-repo
```

- Repositorio de pruebas:

```text
D:\repro_codecommit\BackAuthentication
```

---

# 1. Validar estructura inicial

## Verificar existencia de carpetas

Debe existir:

```text
D:\repro_codecommit\agent-infra-repo
D:\repro_codecommit\BackAuthentication
```

---

# 2. Validar Git

Abrir PowerShell.

---

## Validar repositorio BackAuthentication

```powershell
cd D:\repro_codecommit\BackAuthentication

git status
```

---

## Validar repositorio agent-infra-repo

```powershell
cd D:\repro_codecommit\agent-infra-repo

git status
```

---

# 3. Crear estructura del agente

Entrar al repositorio principal:

```powershell
cd D:\repro_codecommit\agent-infra-repo
```

---

## Crear carpetas

```powershell
mkdir agents
mkdir scripts
mkdir logs
mkdir orchestrator
mkdir workspace
mkdir deploys
mkdir templates
```

---

# 4. Crear script create-branch.ps1

Crear archivo:

```text
D:\repro_codecommit\agent-infra-repo\scripts\create-branch.ps1
```

---

## Contenido

```powershell
param(
    [string]$RepoPath,
    [string]$BranchName
)

Write-Host "==============================="
Write-Host "INFRA AGENT - CREATE BRANCH"
Write-Host "==============================="

Set-Location $RepoPath

Write-Host "Repositorio actual:"
Get-Location

Write-Host "Cambiando a develop..."
git checkout develop

Write-Host "Actualizando repositorio..."
git pull

Write-Host "Creando nueva rama..."
git checkout -b $BranchName

Write-Host "=================================="
Write-Host "Branch creada correctamente"
Write-Host "=================================="
Write-Host "Branch: $BranchName"
```

---

# 5. Ejecutar primera prueba local

Entrar al repositorio principal:

```powershell
cd D:\repro_codecommit\agent-infra-repo
```

---

## Ejecutar script

```powershell
.\scripts\create-branch.ps1 `
-RepoPath "D:\repro_codecommit\BackAuthentication" `
-BranchName "deploy/dev-auth-v1"
```

---

# 6. Resultado esperado

Debe visualizar:

```text
INFRA AGENT - CREATE BRANCH
Repositorio actual:
D:\repro_codecommit\BackAuthentication

Switched to branch 'develop'

Branch creada correctamente
Branch: deploy/dev-auth-v1
```

---

# 7. Verificar rama creada

Entrar al repositorio BackAuthentication:

```powershell
cd D:\repro_codecommit\BackAuthentication
```

---

## Ejecutar

```powershell
git branch
```

Debe aparecer:

```text
deploy/dev-auth-v1
```

---

# 8. Crear auditoría básica

Crear archivo:

```text
D:\repro_codecommit\agent-infra-repo\logs\audit.log
```

---

## Ejemplo contenido

```text
[INFO] Infra Agent iniciado
[INFO] Repo: BackAuthentication
[INFO] Acción: create_branch
[INFO] Branch: deploy/dev-auth-v1
```

---

# 9. Flujo funcional esperado

```text
Usuario
 ↓
Infra Agent
 ↓
Validación
 ↓
PowerShell Script
 ↓
Git
 ↓
Nueva rama
 ↓
Auditoría
```

---

# 10. Primera prueba funcional completa

## Simulación

Prompt:

```text
Use the infra-agent to create a deploy branch for DEV
```

---

## Acción esperada

El agente:

1. Valida reglas.
2. Selecciona repositorio permitido.
3. Genera nombre de rama.
4. Ejecuta create-branch.ps1.
5. Registra auditoría.
6. Devuelve resultado.

---

# 11. Próximo paso recomendado

Después de validar la creación de ramas:

## Construir:

- main.py
- git_manager.py
- security_manager.py
- deploy_manager.py

---

# 12. Objetivo siguiente

Automatizar:

- Docker
- Docker Compose
- GitHub Actions
- Deploy DEV
- Rollback controlado

---

# 13. Seguridad mínima obligatoria

El agente NO debe:

- Ejecutar comandos arbitrarios.
- Ejecutar Remove-Item.
- Modificar producción.
- Exponer secretos.
- Hacer merge automático.

---

# 14. Allowlist inicial

Comandos permitidos:

```text
- git status
- git checkout
- git checkout -b
- git add
- git commit
- git pull
- git push
```

---

# 15. Resultado esperado de la prueba

Si todo funciona correctamente:

✅ El script crea una rama.

✅ El repositorio cambia de branch.

✅ El log se registra.

✅ El agente puede iniciar automatización GitOps.

---

# FIN

