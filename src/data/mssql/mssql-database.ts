// Importación de las librerías necesarias para conectar con SQL Server
import sql, { ConnectionPool } from "mssql";

// Interfaz que define la estructura de opciones para la conexión
interface Options {
  host: string; // Dirección del servidor SQL Server
  port: number; // Puerto de conexión (por defecto 1433)
  username: string; // Usuario de la base de datos
  password: string; // Contraseña del usuario
  database: string; // Nombre de la base de datos a conectar
}

export class MssqlDatabase {
  // Configuración de conexión que se pasará al pool
  private config: sql.config;
  // Pool de conexiones que maneja múltiples conexiones simultáneas
  private pool: ConnectionPool | null = null;

  constructor(options: Options) {
    // Configuración completa de la conexión a SQL Server
    // NOTA: Esta configuración está optimizada para DESARROLLO
    // Para PRODUCCIÓN, descomentar la configuración de producción arriba
    this.config = {
      // Configuración básica de conexión
      server: options.host, // Dirección IP o nombre del servidor
      port: options.port, // Puerto de conexión (1433 por defecto)
      user: options.username, // Usuario de autenticación
      password: options.password, // Contraseña del usuario
      database: options.database, // Base de datos específica a usar

      // Opciones de seguridad y cifrado produccion
      /*options: {
        encrypt: true, // Habilita el cifrado de la conexión (OBLIGATORIO en producción)
        trustServerCertificate: false, // NO confiar en certificados no válidos (SEGURIDAD en producción)
        enableArithAbort: true, // Habilita terminación aritmética para mejor compatibilidad
        requestTimeout: 30000, // Timeout de 30 segundos para requests
        connectTimeout: 15000, // Timeout de 15 segundos para conexión
      },*/

      // Configuración del pool de conexiones
      /*pool: {
        max: 10, // Máximo número de conexiones simultáneas (ajustar según servidor en producción)
        min: 0, // Mínimo número de conexiones mantenidas (considerar min: 2 en producción)
        idleTimeoutMillis: 30000, // Tiempo en ms antes de cerrar conexiones inactivas (30 segundos)
        acquireTimeoutMillis: 60000, // Timeout para adquirir conexión del pool (60 segundos)
        createTimeoutMillis: 30000, // Timeout para crear nueva conexión (30 segundos)
        destroyTimeoutMillis: 5000, // Timeout para destruir conexión (5 segundos)
        reapIntervalMillis: 1000, // Intervalo para limpiar conexiones inactivas (1 segundo)
      },*/

      // Opciones de seguridad y cifrado desarrollo
      options: {
        encrypt: true, // Habilita el cifrado de la conexión
        trustServerCertificate: true, // Confía en el certificado del servidor (útil para desarrollo)
      },

      // Configuración del pool de conexiones desarrollo
      pool: {
        max: 10, // Máximo número de conexiones simultáneas
        min: 0, // Mínimo número de conexiones mantenidas
        idleTimeoutMillis: 30000, // Tiempo en ms antes de cerrar conexiones inactivas (30 segundos)
      },
    };
  }

  // Método para establecer la conexión con SQL Server
  async connect() {
    try {
      // Crear un nuevo pool de conexiones con la configuración
      this.pool = new ConnectionPool(this.config);
      // Establecer la conexión inicial
      await this.pool.connect();
      console.log("SQL Server connection has been established successfully.");
    } catch (error) {
      console.error("Error connecting to SQL Server:", error);
      throw error;
    }
  }

  // Método para cerrar la conexión y liberar recursos
  async disconnect() {
    try {
      if (this.pool) {
        // Cerrar todas las conexiones del pool
        await this.pool.close();
        // Limpiar la referencia al pool
        this.pool = null;
        console.log("SQL Server connection has been closed.");
      }
    } catch (error) {
      console.error("Error closing SQL Server connection:", error);
      throw error;
    }
  }

  // Método para obtener la instancia del pool de conexiones
  getPool(): ConnectionPool | null {
    return this.pool;
  }

  // Método para ejecutar consultas SQL directas (no procedimientos almacenados)
  async query(queryString: string) {
    if (!this.pool) {
      throw new Error("Database not connected");
    }
    // Ejecutar una consulta SQL directa
    return await this.pool.request().query(queryString);
  }
}
