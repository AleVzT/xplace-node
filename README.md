# xplace-node

## Sobre la construcción de la App 🛠️

Trata de un Backend server desarrollado con Express de node y conectado con base de datos en mongodb. Nos permite realizar diferente consultas a nuestra base de datos, consultas como:
    1.- Crear un nuevo usuario.
    2.- Loguear un usuario y crear un JWT
    3.- Dar de alta una busqueda laboral.
    4.- Eliminar una busqueda laboral.
    5.- Editar una busqueda laboral.
    6.- Listar todas las busquedas laboral activas.
    7.- Listar todas las busquedas labroal de un recruiter en especifico.

Ademas de ciertas validaciones logicas y que por temas de negocio se decidieron incluir.


## Comenzando 🚀

Para iniciar con la instalación y ejecución del backend. debemos clonar el proyecto en el directorio de tu preferencia y donde no requieras permisos especiales para acceder.

### Pre-requisitos 📋

Una teniendo los archivos que componen backend server en tu Pc. debemos verificar que contemos con ciertos pre-requisitos. Nota: acontinuacion te dare una serie de comandos deben ser utilizados en la terminal de tu sistema operativo.

    1.- Node v10.15.3 o superior: Si no estas seguro sobre que version de node tienes instalada o si tienes instalado node en tu Pc debes ejecutar el siguiente comando 

        ```
        node -v
        ```

    Esto de deberia arrojar la version de node, en caso de que no sea asi te dejo un link para su instalación. 

        https://nodejs.org/es/download/

    2.- Manejador de paquetes npm v6.14: este manejador de paquete por lo general viene con instalado por defecto cuando instalamos node pero de igual forma se los coloco para que verifiquen su existencia.

        ```
        npm -v
        ```

    En caso de no tenerlo o querer actualizar su versión podrias probar el siguiente comando.

        ```
        npm install -g npm@latest
        ```

    3.- Instalar mongodb y de forma opcional instalar mongodb compas para el manejo de la base de datos. Ademas tambien configurar y crear tu propia base de datos. toma en cuenta que vamos a necesitar el DB connect

### Instalación 🔧

Una vez revisado y completada la lista de pre-requisitos podemos acceder a la instalación y ejecución del backend server en modo desarrollo.

Para esto es necesito que abrar la terminal de tu sistema operativo y navegues a la carpeta que contiene el proyecto. He ingrese a la carpeta /functions.

Una vez dentro de la carpeta principal debemos ejecutar desde la terminal el siguiente comando.

    ```
    npm install
    ```
    
Ya instalado todos los paquetes de node, deberiamos tener una carpeta en nuestra raiz denominada node_modules. seguido a esto debemos hacer en nueva terminal

    ```
    npm run dev
    ```

Esto levantara el servidor y estara listo para realizar las primeras consultas desde el frontend https://github.com/AleVzT/jobsSearch-App


## NOTA:
En la raiz de nuestro directorio tenemos un archivo llamado .env.temp  📋  Lo primero que debemos hacer es cambiarle el nombre al archivo y dejarlo en .env luego de eso dentro del archivo debemos agregar en la variable DB_CNN el DB Connect generado en mongodb.

Toma encuenta que este es un paso muy importante para poder configurar la conexion con tu base de datos.
