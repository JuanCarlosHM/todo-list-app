# Gestión de Tareas - Proyecto Fullstack

Este proyecto es una aplicación web para gestionar tareas, subtareas y comentarios. Incluye autenticación de usuarios y es completamente responsiva. Está dividido en dos partes:

- **Backend**: Implementado en Node.js con Express, utilizando MongoDB como base de datos.
- **Frontend**: Construido con Next.js y React.

## Requisitos Previos

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **MongoDB Atlas** o una instancia local de MongoDB.
- **Git**: [Descargar Git](https://git-scm.com/)

## Instalación

### Clonar el Repositorio
Clona el repositorio en tu máquina local:
```bash
git clone https://github.com/JuanCarlosHM/todo-list-app.git
cd todo-list-app
```

### Configuración del Backend

1. Ve al directorio del backend:
   ```bash
   cd backend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env`:
   ```env
   MONGO_URI=
   JWT_SECRET=
   PORT=
   MONGO_USER=
   MONGO_PASSWORD=
   NODE_ENV=
   ```

4. Inicia el servidor:
   ```bash
   npm run dev
   ```

   El backend estará corriendo en [http://localhost:5000](http://localhost:5000).

### Configuración del Frontend

1. Ve al directorio del frontend:
   ```bash
   cd frontend
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno creando un archivo `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=
   ```

4. Inicia la aplicación:
   ```bash
   npm run dev
   ```

   La aplicación estará disponible en [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

### Backend
- `npm start`: Inicia el servidor.
- `npm run dev`: Inicia el servidor en modo de desarrollo.

### Frontend
- `npm run dev`: Inicia el servidor de desarrollo.
- `npm run build`: Genera una versión optimizada para producción.
- `npm start`: Inicia la versión optimizada para producción.

## Características

### Backend
- Autenticación y autorización con JWT.
- Gestión de usuarios.
- CRUD para tareas, subtareas y comentarios.

### Frontend
- Interfaz responsiva y moderna.
- Gestión de tareas con subtareas y comentarios.
- Autenticación de usuarios.
- Despliegue en Vercel.

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama para tu feature:
   ```bash
   git checkout -b mi-feature
   ```
3. Realiza tus cambios y haz un commit:
   ```bash
   git commit -m "Agrego mi feature"
   ```
4. Haz un push a tu rama:
   ```bash
   git push origin mi-feature
   ```
5. Abre un Pull Request.

## Contacto

Si tienes dudas o sugerencias, no dudes en contactarme:

- **GitHub**: [Mi GitHub](https://github.com/JuanCarlosHM)

¡Gracias por usar esta aplicación! 🚀
