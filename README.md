Artemis II
Plataforma digital para la gestión de academias de patinaje

Descripción 
Es una aplicación web moderna diseñada para academias (especialmente deportivas) que permite centralizar la gestión de estudiantes, procesos y operaciones en una sola plataforma.
Su objetivo es optimizar la administración, reducir procesos manuales y mejorar la experiencia tanto para administradores como usuarios.

Características principales
*Interfaz web moderna e interactiva
*Arquitectura modular (frontend + backend + base de datos)
*Gestión centralizada de información
*Integración mediante API
*Diseño escalable tipo startup

Arquitectura del proyecto
apps/
 ├── web        → Frontend (interfaz de usuario)
 ├── api        → Backend (lógica del servidor)
 └── pocketbase → Base de datos

Tecnologías utilizadas
*Frontend: JavaScript moderno (React)
*Backend: Node.js
*Base de datos: PocketBase
*Estilos:Tailwind CSS
*Gestión de paquetes: NPM

Instalación local
Requisitos
* Node.js (v18 o superior)
* NPM

Pasos
1. Clonar el repositorio:
git clone https://github.com/TU-USUARIO/artemis2.git

2. Entrar al proyecto:
cd artemisII

3. Instalar dependencias:
npm install

4. Ejecutar el proyecto:
npm run dev

5. Abrir en el navegador:
http://localhost:3000

Despliegue
El proyecto puede desplegarse utilizando:

*Frontend: Vercel o Netlify
*Backend: Railway o Render

Variables de entorno
Crea un archivo '.env' basado en el siguiente ejemplo:
PORT=3000
DATABASE_URL=
API_KEY=

Estructura del proyecto
apps/web        → Interfaz de usuario
apps/api        → Lógica del servidor
apps/pocketbase → Base de datos

Experiencia de usuario
El diseño de Artemis 2 está enfocado en:

* Simplicidad
* Accesibilidad
* Interfaz moderna tipo SaaS
* Adaptabilidad a dispositivos móviles

Mejoras futuras

* Integración de pagos en línea
* Panel administrativo avanzado
* Notificaciones automáticas
* App móvil
* Optimización SEO

Demo
https://escueladepatinaje.online/

Contribución
Este proyecto puede ser extendido y adaptado según las necesidades del cliente o negocio.

Licencia
Uso privado / Proyecto académico o comercial según acuerdo.

Autor
Mario Mutis
Desarrollador Web
https://www.linkedin.com/in/mario-mutis/

Contacto
mariogmutis@gmail.com

Nota final
Artemis II no es solo una aplicación, es una base escalable para la transformación digital de academias de patinaje.
