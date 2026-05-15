param([string]$RepoPath, [string]$LogPath)

function Registrar-Evento($Mensaje) {
    $Fecha = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $Linea = "[$Fecha] $Mensaje"
    Write-Host $Linea
    try {
        Add-Content -Path $LogPath -Value $Linea -ErrorAction SilentlyContinue
    } catch {}
}

Registrar-Evento "------------------------------------------------"
Registrar-Evento "INFRA AGENT: INICIANDO DESPLIEGUE DE PRUEBA (SIMULACION)"
Registrar-Evento "Repositorio: $RepoPath"

if (-not (Test-Path $RepoPath)) {
    Registrar-Evento "ERROR: El repositorio no existe."
    exit 1
}

Set-Location $RepoPath
$RamaActual = git rev-parse --abbrev-ref HEAD
Registrar-Evento "Rama actual: $RamaActual"

Registrar-Evento "PASO 1: Intentando construccion Docker (Mocked for simulation)..."

if (Test-Path "Dockerfile") {
    Registrar-Evento "Dockerfile detectado. Analizando contenido..."
    $Content = Get-Content "Dockerfile"
    $FoundFailure = $false
    foreach ($line in $Content) {
        if ($line -match "RUN exit 1") {
            $FoundFailure = $true
            break
        }
    }
    
    if ($FoundFailure) {
        Registrar-Evento "Deteccion: Se encontro un comando de fallo intencional en el Dockerfile."
        $BuildSuccess = $false
    } else {
        $BuildSuccess = $true
    }
} else {
    Registrar-Evento "ERROR: No se encontro Dockerfile."
    $BuildSuccess = $false
}

if (-not $BuildSuccess) {
    Registrar-Evento "RESULTADO: Fallo en la construccion Docker (Simulado)."
    Registrar-Evento "PASO 2: Iniciando ROLLBACK automatico a la rama 'develop'..."
    
    git checkout develop
    if ($LASTEXITCODE -eq 0) {
        Registrar-Evento "ROLLBACK: Completado con exito. Repositorio restaurado."
        Registrar-Evento "ESTADO FINAL: FALLIDO / ROLLBACK OK."
    } else {
        Registrar-Evento "ERROR CRITICO: No se pudo volver a develop."
        exit 1
    }
} else {
    Registrar-Evento "RESULTADO: Construccion exitosa (Simulada)."
    Registrar-Evento "ESTADO FINAL: COMPLETADO."
}

Registrar-Evento "------------------------------------------------"
