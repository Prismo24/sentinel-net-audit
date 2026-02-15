import axios from 'axios';

// Configuración base para nuestras auditorías
export const auditAPI = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Podremos añadir interceptores aquí para manejar la seguridad de las peticiones