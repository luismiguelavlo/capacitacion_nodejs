# 🚀 Proyecto de Capacitación - API REST

API REST desarrollada en Node.js con TypeScript que maneja conexiones a PostgreSQL y SQL Server, incluyendo consumo de procedimientos almacenados.

## 📋 Tabla de Contenidos

- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Prerrequisitos](#-prerrequisitos)
- [Instalación](#-instalación)
- [Configuración](#-configuración)
- [Ejecución](#-ejecución)
- [Endpoints](#-endpoints)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Base de Datos](#-base-de-datos)
- [Desarrollo vs Producción](#-desarrollo-vs-producción)

## ✨ Características

- 🔗 **Doble conexión de base de datos**: PostgreSQL y SQL Server
- 🏊 **Pool de conexiones** optimizado
- 📦 **Arquitectura limpia** con separación de capas
- 🔒 **Variables de entorno** centralizadas
- 🛡️ **Manejo de errores** robusto
- 📝 **TypeScript** para mayor seguridad de tipos
- 🚀 **Procedimientos almacenados** de SQL Server

## 🛠️ Tecnologías

- **Node.js** - Runtime de JavaScript
- **TypeScript** - Superset tipado de JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM para PostgreSQL
- **mssql** - Driver para SQL Server
- **dotenv** - Manejo de variables de entorno
- **env-var** - Validación de variables de entorno

## 📋 Prerrequisitos

- Node.js (v16 o superior)
- npm o yarn
- PostgreSQL (para la base de datos principal)
- SQL Server (para procedimientos almacenados)

## 🚀 Instalación

1. **Clonar el repositorio**

```bash
git clone <url-del-repositorio>
cd capacitacion
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
cp .env.example .env
```

## ⚙️ Configuración

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto de la aplicación
PORT=3000

# Configuración PostgreSQL
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=tu_usuario
DB_PASSWORD=tu_contraseña
DB_NAME=tu_base_datos

# Configuración SQL Server
MSSQL_DB_HOST=tu_servidor_sql
MSSQL_DB_PORT=1433
MSSQL_DB_USERNAME=tu_usuario_sql
MSSQL_DB_PASSWORD=tu_contraseña_sql
MSSQL_DB_NAME=tu_base_datos_sql
```

## 🏃‍♂️ Ejecución

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
npm start
```

## 📡 Endpoints

### Usuarios

| Método | Endpoint            | Descripción                       | Parámetros                   |
| ------ | ------------------- | --------------------------------- | ---------------------------- |
| `POST` | `/users/register`   | Registrar nuevo usuario           | `body: { name, email, ... }` |
| `GET`  | `/users/`           | Obtener todos los usuarios        | -                            |
| `GET`  | `/users/consume_pa` | Ejecutar procedimiento almacenado | `query: ?payStatus=2`        |

### Ejemplo de uso del PA

```bash
# Ejecutar procedimiento almacenado PA_SCI_SQL_PAGOE_ESTADO
GET http://localhost:3000/users/consume_pa?payStatus=2
```

**Respuesta:**

```json
{
  "success": true,
  "data": [...],
  "message": "Procedimiento almacenado ejecutado correctamente",
  "parameter": { "ESTA_PAG": 2 }
}
```

## 📁 Estructura del Proyecto

```
src/
├── app.ts                 # Punto de entrada de la aplicación
├── config/
│   ├── constants.ts       # Constantes de la aplicación
│   ├── envs.ts           # Variables de entorno centralizadas
│   └── generate-uuid.ts  # Utilidades para UUID
├── data/
│   ├── index.ts          # Exportaciones de datos
│   ├── postgres/
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   └── postgres-database.ts
│   └── mssql/
│       └── mssql-database.ts
├── presentation/
│   ├── routes.ts         # Rutas principales
│   ├── server.ts         # Configuración del servidor
│   └── users/
│       ├── controller.ts
│       ├── routes.ts
│       └── services/
│           ├── consume-pa.service.ts
│           ├── creator-user.service.ts
│           └── finder-all-user.service.ts
└── domain/               # Lógica de negocio (futuro)
```

## 🗄️ Base de Datos

### PostgreSQL

- **Propósito**: Base de datos principal para usuarios
- **ORM**: Sequelize con TypeScript
- **Modelos**: User model con validaciones

### SQL Server

- **Propósito**: Procedimientos almacenados empresariales
- **Driver**: mssql
- **Procedimientos**: PA_SCI_SQL_PAGOE_ESTADO

## 🔧 Desarrollo vs Producción

### Configuración de Desarrollo

```typescript
// src/data/mssql/mssql-database.ts
options: {
  encrypt: true,
  trustServerCertificate: true, // ✅ Permite certificados no válidos
}
```

### Configuración de Producción

```typescript
// Descomenta la configuración de producción en mssql-database.ts
options: {
  encrypt: true,
  trustServerCertificate: false, // 🔒 Solo certificados válidos
  enableArithAbort: true,
  requestTimeout: 30000,
  connectTimeout: 15000,
}
```

## 🐳 Docker (Opcional)

```bash
# Ejecutar con Docker Compose
docker-compose up -d
```

## 📝 Scripts Disponibles

```bash
npm run dev      # Desarrollo con hot reload
npm run build    # Compilar TypeScript
npm start        # Ejecutar versión compilada
```

## 🚨 Solución de Problemas

### Error de conexión SQL Server

- Verifica que el servidor SQL Server esté ejecutándose
- Confirma las credenciales en el archivo `.env`
- Para desarrollo, asegúrate de que `trustServerCertificate: true`

### Error de parámetros en PA

- Verifica que el nombre del parámetro coincida: `ESTA_PAG` (no `ESTADO_PAG`)
- Confirma que el procedimiento almacenado existe en la base de datos

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

**syc** - Desarrollador del proyecto

---

⭐ Si este proyecto te fue útil, ¡dale una estrella!
