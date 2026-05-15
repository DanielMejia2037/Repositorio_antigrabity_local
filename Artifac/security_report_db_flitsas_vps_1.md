
# 🔐 Informe de Auditoría de Seguridad — `db.flitsas.io`

**Fecha:** 12 de mayo de 2026  
**IP Objetivo:** `177.7.49.115`  
**Método:** Reconocimiento pasivo + escaneo activo no-intrusivo  
**Herramientas:** Nslookup, TCP Port Scan (PowerShell), HTTP Header Probe, SSL Labs, SecurityHeaders.com, IPInfo.io

---

## 📋 Información de Infraestructura

| Campo | Valor |
|---|---|
| **Subdominio** | `db.flitsas.io` |
| **IP Pública** | `177.7.49.115` |
| **Hostname reverso (PTR)** | `srv1630700.hstgr.cloud` |
| **Proveedor / ASN** | Hostinger International Limited (AS47583) |
| **Ubicación** | Boston, Massachusetts, EE.UU. |
| **Sistema Operativo** | Ubuntu (inferido del servidor nginx) |
| **Servidor Web** | nginx/1.24.0 (Ubuntu) |

---

## 🚨 Resumen Ejecutivo de Hallazgos

| # | Criticidad | Hallazgo |
|---|---|---|
| 1 | 🔴 **CRÍTICO** | Certificado SSL con nombre incorrecto (Certificate Name Mismatch) |
| 2 | 🔴 **CRÍTICO** | Puerto SSH (22) expuesto públicamente sin filtrado |
| 3 | 🔴 **CRÍTICO** | Puerto 8080 expuesto sin autenticación visible |
| 4 | 🟠 **ALTO** | Sin redireccionamiento forzado HTTP → HTTPS |
| 5 | 🟠 **ALTO** | Calificación F en cabeceras de seguridad HTTP |
| 6 | 🟡 **MEDIO** | Versión de nginx expuesta en cabecera `Server` |
| 7 | 🟡 **MEDIO** | Sin cabecera `Strict-Transport-Security` (HSTS) |
| 8 | 🟡 **MEDIO** | Sin `Content-Security-Policy` (CSP) |
| 9 | 🟢 **INFO** | TLS 1.2 y 1.3 soportados (configuración moderna) |

---

## 🔌 Puertos TCP — Resultado del Escaneo

| Puerto | Estado | Servicio | Observación |
|---|---|---|---|
| **22** | 🔴 ABIERTO | SSH | Expuesto a internet — vector de ataque por fuerza bruta |
| **80** | 🟡 ABIERTO | HTTP | Responde 404, sin redirección a HTTPS |
| **443** | 🟡 ABIERTO | HTTPS | Responde 404, cert inválido para este dominio |
| **8080** | 🔴 ABIERTO | HTTP Alt | Responde 200 OK — servicio activo sin aparente autenticación |
| 21 | FILTERED | FTP | Bloqueado |
| 23 | FILTERED | Telnet | Bloqueado |
| 25 | FILTERED | SMTP | Bloqueado |
| 3306 | FILTERED | MySQL | Bloqueado ✅ |
| 5432 | FILTERED | PostgreSQL | Bloqueado ✅ |
| 6379 | FILTERED | Redis | Bloqueado ✅ |
| 27017 | FILTERED | MongoDB | Bloqueado ✅ |
| 9200/9300 | FILTERED | Elasticsearch | Bloqueado ✅ |

> ✅ Puertos de bases de datos están correctamente filtrados. Sin embargo, el puerto 8080 tiene un servicio activo que necesita revisión.

---

## 🔒 SSL / TLS — Análisis Detallado

| Parámetro | Valor |
|---|---|
| **Calificación SSL Labs** | **T** (Trust Issues) |
| **Calificación sin trust issues** | A (buena configuración técnica) |
| **Protocolos soportados** | TLS 1.2 ✅, TLS 1.3 ✅ |
| **Problema crítico** | **Certificate Name Mismatch** |
| **Cert emitido para** | `visortesla.flitsas.com`, `apivisortesla.flitsas.com` |
| **Cert requerido para** | `db.flitsas.io` |

### ⚠️ Implicación del Mismatch:
Cualquier cliente que verifique certificados (navegadores, APIs, apps) recibirá un **error de seguridad SSL**. Si el código cliente omite la verificación (`verify=false`), se vuelve vulnerable a ataques **Man-in-the-Middle (MitM)**.

---

## 🛡️ Cabeceras HTTP de Seguridad

### Puerto 80 (HTTP) — Respuesta:
```
HTTP Status: 404 Not Found
Server: nginx/1.24.0 (Ubuntu)
Connection: keep-alive
```

### Puerto 8080 — Respuesta:
```
HTTP Status: 200 OK
X-Frame-Options: SAMEORIGIN          ✅
X-Content-Type-Options: nosniff      ✅
Referrer-Policy: strict-origin-when-cross-origin ✅
Permissions-Policy: camera=(), microphone=(), geolocation=() ✅
Server: nginx                        ⚠️ (versión oculta — mejor)
```

### Puerto 443 (HTTPS) — Respuesta:
```
HTTP Status: 404 Not Found
access-control-allow-origin: *       🔴 CORS abierto (wildcard)
Server: nginx/1.24.0 (Ubuntu)        ⚠️ Versión expuesta
```

### Cabeceras Faltantes en HTTPS (calificación F en SecurityHeaders.com):

| Cabecera | Riesgo si falta |
|---|---|
| `Content-Security-Policy` | XSS, injection de contenido |
| `X-Frame-Options` | Clickjacking |
| `X-Content-Type-Options` | MIME sniffing attacks |
| `Referrer-Policy` | Fuga de información en URLs |
| `Permissions-Policy` | Abuso de APIs del navegador |
| `Strict-Transport-Security` | Downgrade a HTTP, MitM |

---

## 🌐 Análisis CORS

```
access-control-allow-origin: *
```
> 🔴 **CORS wildcard activo**: Cualquier dominio puede hacer peticiones cross-origin al API. Esto es aceptable para APIs públicas pero **peligroso si el endpoint maneja datos autenticados**.

---

## 🔐 Análisis del Puerto 8080

El servicio en `:8080` devuelve `200 OK` con un archivo HTML estático (`923 bytes`). Las cabeceras de seguridad están configuradas correctamente en este puerto (X-Frame-Options, X-Content-Type-Options, etc.). Sin embargo:

- **No hay autenticación visible** en la capa HTTP
- Está accesible directamente desde internet sin HTTPS
- El campo `Server: nginx` (sin versión) es positivo

> 🔴 Si este es un panel de administración (Netdata, pgAdmin, phpMyAdmin, Portainer, etc.), **debe protegerse con contraseña o VPN**.

---

## 🔐 Puerto SSH (22)

El puerto SSH está abierto públicamente. Riesgos:

| Riesgo | Descripción |
|---|---|
| **Fuerza bruta** | Bots escanean y atacan SSH 24/7 |
| **Exploits de versión** | Si OpenSSH no está actualizado, puede tener CVEs |
| **Exposición de usuario root** | Si `PermitRootLogin yes` está activo |

---

## 📋 Plan de Remediación Priorizado

### 🔴 Acciones Inmediatas (0-48 horas)

1. **Corregir el certificado SSL**
   ```bash
   # Emitir certificado correcto con certbot
   certbot certonly --nginx -d db.flitsas.io
   ```
   O generar un certificado wildcard `*.flitsas.io` que cubra todos los subdominios.

2. **Proteger el servicio en puerto 8080**
   ```nginx
   # Agregar autenticación básica (mínimo) o reubicar detrás de VPN
   location / {
       auth_basic "Restricted";
       auth_basic_user_file /etc/nginx/.htpasswd;
   }
   ```
   **Mejor opción:** Bloquear el acceso externo y acceder solo por VPN o túnel SSH.

3. **Restringir SSH por IP o implementar fail2ban**
   ```bash
   # En /etc/ssh/sshd_config
   PermitRootLogin no
   PasswordAuthentication no  # Solo llaves SSH
   # En firewall (UFW):
   ufw allow from TU_IP_FIJA to any port 22
   ufw deny 22
   ```

### 🟠 Acciones a Corto Plazo (1-7 días)

4. **Forzar HTTPS y agregar HSTS**
   ```nginx
   server {
       listen 80;
       server_name db.flitsas.io;
       return 301 https://$host$request_uri;
   }
   server {
       listen 443 ssl;
       add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
       add_header Content-Security-Policy "default-src 'self'" always;
       add_header X-Frame-Options "DENY" always;
       add_header X-Content-Type-Options "nosniff" always;
       add_header Referrer-Policy "strict-origin-when-cross-origin" always;
       add_header Permissions-Policy "geolocation=(), microphone=(), camera=()" always;
   }
   ```

5. **Ocultar versión de nginx**
   ```nginx
   # En /etc/nginx/nginx.conf
   server_tokens off;
   ```

6. **Restringir CORS wildcard**
   ```nginx
   # Reemplazar * por el dominio específico del frontend
   add_header Access-Control-Allow-Origin "https://app.flitsas.io" always;
   ```

### 🟡 Acciones a Mediano Plazo (1-4 semanas)

7. **Implementar Fail2Ban** para SSH y nginx
8. **Actualizar nginx** si hay versiones más recientes con parches de seguridad
9. **Configurar un WAF** (ModSecurity o Cloudflare)
10. **Auditoría interna** de los servicios corriendo en el servidor

---

## ✅ Lo que está bien configurado

- ✅ Puertos de bases de datos (MySQL, PostgreSQL, Redis, MongoDB, Elasticsearch) correctamente filtrados
- ✅ TLS 1.2 y 1.3 soportados (sin TLS 1.0/1.1 obsoletos)
- ✅ Puerto 8080 tiene algunas cabeceras de seguridad configuradas
- ✅ Puerto 21 (FTP), 23 (Telnet) bloqueados

---

*Informe generado el 12/05/2026 — Análisis no-intrusivo, reconocimiento pasivo y escaneo de puertos TCP básico.*
