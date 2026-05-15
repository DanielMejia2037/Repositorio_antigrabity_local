# Manual de Operación: Infra-Agent FLIT
**Estado:** Activo
**Ámbito:** Despliegue de Dashboard Multi-Entorno

## 🛠️ Cómo Desplegar
Con la nueva evolución v1.2, el despliegue es principalmente automático:

### 1. Despliegue Automático (Recomendado)
- **DEV:** Simplemente haz `git push origin develop`. GitHub Actions se encargará del resto.
- **QA:** Haz `git push origin qa`.
- **PDN:** Requiere un PR a `master`. Una vez aprobado y mergeado, se despliega solo.

### 2. Despliegue Manual (Contingencia)
Si GitHub falla o necesitas un despliegue rápido desde la terminal, invoca al agente:
`@[infra-agent 1.md] despliegue en <ENTORNO>`

El agente ejecutará la secuencia SSH segura:
```bash
ssh -i "C:\Users\Trabajo\.ssh\infra_agent" root@177.7.49.115 "..."
```

## 🔙 Cómo Realizar un Rollback
Si detectas un error crítico después de un despliegue:
1.  **Identifica el commit estable** previo (ej: `git log --oneline`).
2.  **Invoca al agente:** `@[infra-agent 1.md] rollback ambiente <ENTORNO> al commit <SHA>`.
3.  El agente:
    - Hará `reset --hard` en la VPS.
    - Reconstruirá los contenedores.
    - Generará un reporte de rollback en `docs/reports/`.

## 📜 Reportes y Auditoría
Cada vez que el agente actúa, deja un rastro documental:
- **Exitoso:** `docs/reports/reporte-despliegue-<env>-<fecha>.md`
- **Error/Reversa:** `docs/reports/rollback-<env>-<fecha>.md`

## 🔐 Gestión de Secretos
**NUNCA** coloques contraseñas o llaves en el código.
Usa los **GitHub Secrets** (`VPS_HOST`, `VPS_SSH_KEY`, `VPS_USER`).

---
**Infra-Agent FLIT** - *Manual del Operador*
