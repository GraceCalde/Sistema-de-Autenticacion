# Sistema de Autenticación - Microservicio de Gestión de Identidades

Este es un microservicio de autenticación robusto y escalable desarrollado con **Node.js**, utilizando la sintaxis moderna de **ES Modules**, **Express**, **Prisma ORM** y una base de datos **PostgreSQL**.

---

## 📹 Video Explicativo del Proyecto
Adjunto la explicación del funcionamiento del flujo de login y la estructura del código haciendo clic en la miniatura o en el enlace de abajo:

[![Ver Video Explicativo](https://img.youtube.com/vi/2BUKjH_eq0k/maxresdefault.jpg)](https://www.youtube.com/watch?v=2BUKjH_eq0k)



---

## 🛠️ Requerimientos Técnicos Implementados

* **Registro (`/api/auth/register`):** Implementa la encriptación segura de contraseñas utilizando la librería `bcrypt` mediante un hashing con 10 rondas de salado.
* **Login (`/api/auth/login`):** Validación estricta de credenciales contrastadas con PostgreSQL y generación automatizada de un **Access Token (JWT)** con tiempo de expiración configurado a 1 hora.
* **Protección de Rutas (`/api/auth/private`):** Creación del middleware `isAuth` encargado de interceptar las peticiones a la ruta privada, validar la autenticidad del token en el encabezado `Authorization` (`Bearer token`) y restringir el acceso no autorizado.

---

