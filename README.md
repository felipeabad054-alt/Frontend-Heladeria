# 🍦 Aplicación Web de Heladería con Docker

Aplicación web funcional para la gestión de sabores de una heladería.

El sistema permite realizar operaciones CRUD sobre una base de datos PostgreSQL mediante una arquitectura de tres capas:

- Frontend desarrollado con React.
- Backend desarrollado con Node.js y Express.
- Base de datos PostgreSQL.
- Despliegue mediante Docker y Docker Compose.

---

# 📋 Descripción del proyecto

Este proyecto consiste en una aplicación web para administrar los sabores disponibles en una heladería.

El usuario puede:

- Registrar nuevos sabores.
- Consultar los sabores existentes.
- Editar la información de un sabor.
- Eliminar sabores.
- Visualizar precio, stock y descripción.
- Mantener la información almacenada mediante persistencia de datos.

La aplicación se ejecuta utilizando tres contenedores Docker:

1. Contenedor del Frontend.
2. Contenedor del Backend.
3. Contenedor de PostgreSQL.

Además, se construyen dos imágenes Docker propias:

- `heladeria-frontend`
- `heladeria-backend`

La base de datos utiliza la imagen oficial:

- `postgres:17`

---

# 🎯 Objetivo

Desarrollar e implementar una aplicación web funcional para una heladería, utilizando una arquitectura de tres capas y permitiendo realizar operaciones CRUD sobre una base de datos PostgreSQL.

El despliegue se realiza mediante Docker Compose para garantizar que el Frontend, Backend y la Base de Datos se ejecuten en contenedores independientes y se comuniquen correctamente dentro de una red Docker.

---

# 🏗️ Arquitectura del sistema

La aplicación utiliza una arquitectura de tres capas:

```text
┌──────────────────────────────┐
│       Usuario/Navegador      │
└───────────────┬──────────────┘
                │
                ▼
┌──────────────────────────────┐
│       Frontend - React       │
│       Puerto: 5173           │
└───────────────┬──────────────┘
                │ HTTP / Axios
                ▼
┌──────────────────────────────┐
│ Backend - Node.js + Express  │
│       Puerto: 5000           │
└───────────────┬──────────────┘
                │ SQL / pg
                ▼
┌──────────────────────────────┐
│     Base de datos PostgreSQL │
│ Puerto interno: 5432         │
│ Puerto externo: 5433         │

└──────────────────────────────┘
Flujo de funcionamiento
El usuario interactúa con la interfaz desarrollada en React.
React realiza peticiones HTTP al Backend utilizando Axios.
Express recibe las solicitudes y ejecuta la lógica del CRUD.
El Backend utiliza el paquete pg para conectarse con PostgreSQL.
PostgreSQL almacena y devuelve la información.
El Backend responde al Frontend en formato JSON.
React actualiza dinámicamente la interfaz.
🛠️ Tecnologías utilizadas
Frontend
React
Vite
JavaScript
Axios
Bootstrap
HTML
CSS
Backend
Node.js
Express
JavaScript
CORS
dotenv
pg
Nodemon
Base de datos
PostgreSQL 17
SQL
Contenedores y despliegue
Docker
Docker Desktop
Docker Compose
Dockerfile
Volúmenes Docker
Redes internas de Docker Compose
Control de versiones
Git
GitHub
📁 Estructura del proyecto
heladeria-docker/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   └── saborController.js
│   │   │
│   │   ├── models/
│   │   │   └── saborModel.js
│   │   │
│   │   ├── routes/
│   │   │   └── saborRoutes.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── src/
│   │   ├── services/
│   │   │   └── saborService.js
│   │   │
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── public/
│   ├── .dockerignore
│   ├── .env
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── database/
│   └── init.sql
│
├── .gitignore
├── docker-compose.yml
└── README.md
📂 Descripción de las carpetas
backend

Contiene la API REST desarrollada con Node.js y Express.

backend/src/config

Contiene la configuración de conexión con PostgreSQL.

backend/src/models

Contiene las consultas SQL utilizadas para:

Consultar sabores.
Crear sabores.
Actualizar sabores.
Eliminar sabores.
backend/src/controllers

Contiene la lógica que recibe las solicitudes HTTP y devuelve las respuestas.

backend/src/routes

Contiene las rutas o endpoints de la API REST.

backend/src/app.js

Configura Express, CORS, JSON y las rutas principales.

backend/src/server.js

Inicia el servidor y comprueba la conexión con PostgreSQL.

frontend

Contiene la interfaz desarrollada con React.

frontend/src/services

Contiene las funciones de Axios para comunicarse con el Backend.

frontend/src/App.jsx

Contiene la interfaz principal y la lógica del CRUD.

frontend/src/App.css

Contiene los estilos específicos de la aplicación.

frontend/src/main.jsx

Es el punto de entrada de React.

database

Contiene el archivo SQL que se ejecuta automáticamente cuando PostgreSQL se inicializa por primera vez.

El archivo:

database/init.sql

crea la tabla sabores e inserta registros iniciales.

🗄️ Estructura de la base de datos

La aplicación utiliza una tabla llamada:

sabores
Campos
Campo	Tipo	Descripción
id	SERIAL	Identificador único
nombre	VARCHAR(100)	Nombre del sabor
precio	NUMERIC(10,2)	Precio del producto
stock	INTEGER	Cantidad disponible
descripcion	TEXT	Descripción del sabor
creado_en	TIMESTAMP	Fecha de creación
Script SQL
CREATE TABLE IF NOT EXISTS sabores (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    precio NUMERIC(10, 2) NOT NULL CHECK (precio >= 0),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    descripcion TEXT,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🌐 Endpoints de la API

La URL base del Backend es:

http://localhost:5000

La URL base de los sabores es:

http://localhost:5000/api/sabores
Consultar todos los sabores
GET /api/sabores

Ejemplo:

http://localhost:5000/api/sabores
Consultar un sabor por ID
GET /api/sabores/:id

Ejemplo:

http://localhost:5000/api/sabores/1
Crear un sabor
POST /api/sabores

Body JSON:

{
  "nombre": "Maracuyá",
  "precio": 2.80,
  "stock": 25,
  "descripcion": "Helado tropical de maracuyá"
}
Actualizar un sabor
PUT /api/sabores/:id

Ejemplo:

http://localhost:5000/api/sabores/1

Body JSON:

{
  "nombre": "Chocolate Premium",
  "precio": 3.50,
  "stock": 30,
  "descripcion": "Helado de chocolate con mayor concentración de cacao"
}
Eliminar un sabor
DELETE /api/sabores/:id

Ejemplo:

http://localhost:5000/api/sabores/1
✅ Validaciones implementadas

La aplicación valida que:

El nombre sea obligatorio.
El precio sea obligatorio.
El precio no sea negativo.
El stock sea obligatorio.
El stock no sea negativo.
El stock sea un número entero.
No se actualice un sabor inexistente.
No se elimine un sabor inexistente.
El usuario confirme antes de eliminar un registro.
📦 Requisitos previos

Para ejecutar el proyecto se necesita:

Git
Docker Desktop
Docker Compose
Navegador web

Node.js no es obligatorio para ejecutar el proyecto con Docker, porque las imágenes del Frontend y Backend ya incluyen Node.js.

Verificar Git
git --version
Verificar Docker
docker --version
Verificar Docker Compose
docker compose version

Docker Desktop debe estar iniciado antes de ejecutar los contenedores.

🚀 Instalación y ejecución
1. Clonar el repositorio
git clone https://github.com/felipeabad054-alt/Docker-Heladeria.git
2. Entrar en la carpeta del proyecto
cd Docker-Heladeria
3. Verificar la estructura
dir

Deben aparecer:

backend
frontend
database
docker-compose.yml
README.md
🔐 Configuración de variables de entorno

Los archivos .env pueden estar ignorados por Git para proteger las credenciales.

Backend

Crea el archivo:

backend/.env

Contenido:

DB_HOST=postgres
DB_PORT=5432
DB_NAME=heladeria
DB_USER=postgres
DB_PASSWORD=12345
PORT=5000
Frontend

Crea el archivo:

frontend/.env

Contenido:

VITE_API_URL=http://localhost:5000/api
Importante

Dentro de Docker Compose, el Backend utiliza:

DB_HOST=postgres

No debe utilizar:

DB_HOST=localhost

Esto se debe a que postgres es el nombre del servicio dentro de la red interna de Docker Compose.

🐳 Construcción manual de las imágenes Docker
Imagen del Backend

Entrar en la carpeta:

cd backend

Construir la imagen:

docker build -t heladeria-backend .

Regresar a la raíz:

cd ..
Imagen del Frontend

Entrar en la carpeta:

cd frontend

Construir la imagen:

docker build -t heladeria-frontend .

Regresar a la raíz:

cd ..
Verificar imágenes
docker images

Deben aparecer:

heladeria-backend:latest
heladeria-frontend:latest
postgres:17

Las imágenes propias del proyecto son:

heladeria-backend
heladeria-frontend

La imagen postgres:17 es una imagen oficial.

🐳 Ejecución con Docker Compose

Desde la carpeta raíz del proyecto:

docker compose up --build

Este comando:

Construye la imagen del Frontend.
Construye la imagen del Backend.
Descarga o utiliza PostgreSQL 17.
Crea la red interna.
Crea el volumen de PostgreSQL.
Crea los tres contenedores.
Inicia todos los servicios.
Ejecutar en segundo plano
docker compose up --build -d

La opción -d permite ejecutar los contenedores en segundo plano.

📦 Contenedores creados

Docker Compose crea los siguientes contenedores:

heladeria-frontend
heladeria-backend
heladeria-postgres
Verificar contenedores
docker compose ps

También puede utilizarse:

docker ps

Los tres deben aparecer con estado:

Up

PostgreSQL también puede mostrar:

healthy
🔗 Acceso a la aplicación
Frontend
http://localhost:5173
Backend
http://localhost:5000
API de sabores
http://localhost:5000/api/sabores
PostgreSQL desde Windows
localhost:5433

Dentro de la red Docker, PostgreSQL utiliza:

postgres:5432
💾 Persistencia de datos

PostgreSQL utiliza un volumen llamado:

postgres_data

Esto permite conservar la información aunque los contenedores sean detenidos o eliminados.

Para comprobar la persistencia:

docker compose down

Luego:

docker compose up -d

Los datos registrados anteriormente deben continuar disponibles.

Advertencia

El siguiente comando elimina también el volumen:

docker compose down -v

Al utilizar -v, se elimina la información almacenada en PostgreSQL.

🧪 Verificar la base de datos

Para consultar los registros desde el contenedor PostgreSQL:

docker compose exec postgres psql -U postgres -d heladeria -c "SELECT * FROM sabores;"

Para entrar en PostgreSQL:

docker compose exec postgres psql -U postgres -d heladeria

Dentro de PostgreSQL pueden utilizarse estos comandos:

\dt
SELECT * FROM sabores;

Para salir:

\q
📋 Comandos principales
Iniciar todos los servicios
docker compose up --build
Iniciar en segundo plano
docker compose up --build -d
Ver servicios activos
docker compose ps
Ver contenedores activos
docker ps
Ver registros
docker compose logs
Ver registros en tiempo real
docker compose logs -f
Ver registros del Backend
docker compose logs -f backend
Ver registros del Frontend
docker compose logs -f frontend
Ver registros de PostgreSQL
docker compose logs -f postgres
Detener los servicios
docker compose stop
Iniciar servicios detenidos
docker compose start
Detener y eliminar contenedores
docker compose down
Reconstruir solamente el Backend
docker compose up --build -d backend
Reconstruir solamente el Frontend
docker compose up --build -d frontend
Ver imágenes
docker images
Ver volúmenes
docker volume ls
🔄 Reconstrucción después de modificar el código

Como el código se copia dentro de las imágenes Docker, después de modificar archivos puede ser necesario reconstruir los servicios.

Reconstruir todo
docker compose up --build -d
Reconstruir el Backend
docker compose build backend
docker compose up -d backend
Reconstruir el Frontend
docker compose build frontend
docker compose up -d frontend
🧹 Reiniciar completamente el proyecto

Para eliminar contenedores y volver a construirlos:

docker compose down
docker compose up --build -d

Para reiniciar también la base de datos desde cero:

docker compose down -v
docker compose up --build -d

El segundo procedimiento elimina todos los datos almacenados.

⚠️ Solución de problemas
Docker Desktop no está iniciado

Error posible:

Cannot connect to the Docker daemon

Solución:

Abrir Docker Desktop.
Esperar a que Docker indique que está ejecutándose.
Volver a ejecutar:
docker compose up --build
El puerto 5432 está ocupado

El proyecto publica PostgreSQL en el puerto externo:

5433

Configuración:

ports:
  - "5433:5432"

Esto evita conflictos con PostgreSQL instalado en Windows.

El Backend dentro de Docker debe seguir usando:

DB_PORT=5432
El puerto 5000 está ocupado

Comprobar el puerto:

netstat -ano | findstr :5000

Detener el proceso correspondiente o cambiar el puerto publicado en docker-compose.yml.

El puerto 5173 está ocupado

Comprobar:

netstat -ano | findstr :5173

Detener el proceso o cambiar el puerto del Frontend.

El Backend no se conecta a PostgreSQL

Verificar que en Docker se utilice:

DB_HOST=postgres

No utilizar:

DB_HOST=localhost

Verificar los registros:

docker compose logs backend

Verificar PostgreSQL:

docker compose logs postgres
La tabla sabores no existe

El archivo init.sql solo se ejecuta cuando PostgreSQL crea un volumen nuevo.

Para reiniciar la base de datos:

docker compose down -v
docker compose up --build -d

Este comando elimina los datos anteriores.

Los cambios del Frontend no aparecen

Reconstruir el Frontend:

docker compose build frontend
docker compose up -d frontend

Después actualizar el navegador con:

Ctrl + F5
Los cambios del Backend no aparecen

Reconstruir el Backend:

docker compose build backend
docker compose up -d backend
Verificar la comunicación entre contenedores
docker compose ps

Los tres servicios deben estar activos.

También puede revisarse:

docker compose logs -f
📸 Capturas recomendadas

Para documentar el proyecto se recomienda incluir capturas de:

Estructura del proyecto en Visual Studio Code.
Construcción de la imagen heladeria-backend.
Construcción de la imagen heladeria-frontend.
Resultado del comando docker images.
Resultado del comando docker compose ps.
Los tres contenedores activos en Docker Desktop.
Pruebas GET, POST, PUT y DELETE.
Interfaz principal de React.
Creación de un nuevo sabor.
Edición de un sabor.
Confirmación para eliminar un sabor.
Información almacenada en PostgreSQL.
🔒 Archivos ignorados por Git

El archivo .gitignore evita subir archivos innecesarios o sensibles.

Ejemplo:

backend/node_modules/
frontend/node_modules/

backend/.env
frontend/.env

frontend/dist/

*.log
.DS_Store
Thumbs.db

.vscode/
.idea/

Las carpetas node_modules no deben subirse al repositorio porque las dependencias se restauran mediante:

npm install

o automáticamente durante la construcción de las imágenes Docker.

🌿 Clonar y ejecutar rápidamente

Para una ejecución rápida desde otro computador:

git clone https://github.com/felipeabad054-alt/Docker-Heladeria.git
cd Docker-Heladeria
docker compose up --build -d

Después abrir:

http://localhost:5173

Comprobar servicios:

docker compose ps
🧪 Pruebas manuales recomendadas
Crear un sabor
{
  "nombre": "Mora",
  "precio": 2.75,
  "stock": 15,
  "descripcion": "Helado de mora"
}
Editar el sabor

Cambiar:

{
  "nombre": "Mora Premium",
  "precio": 3.25,
  "stock": 20,
  "descripcion": "Helado premium de mora"
}
Eliminar

Presionar el botón Eliminar y confirmar la acción.

Persistencia
Crear un sabor.
Ejecutar:
docker compose down
docker compose up -d
Actualizar el navegador.
Comprobar que el sabor continúa registrado.
🎓 Requisitos cumplidos
Frontend funcional desarrollado con React.
Backend funcional desarrollado con Node.js y Express.
API REST para las operaciones CRUD.
Base de datos PostgreSQL.
Aplicación completamente funcional.
Despliegue mediante Docker Compose.
Tres contenedores en ejecución.
Imagen Docker propia del Frontend.
Imagen Docker propia del Backend.
Persistencia mediante volumen Docker.
Comunicación entre contenedores.
Validaciones de formularios.
Confirmación para operaciones destructivas.
