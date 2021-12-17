# React Microfrontend Starter Kit

React Microfrontend Starter Kit es un proyecto gratuito y de código abierto. El mismo ya tiene incorporado TailwindCSS para un mejor aspecto. El proyecto tambien incorpora diferentes bibliotecas preconfiguradas como webpack, typescript y react query, listas para ser usadas.

React Microfrontend Starter Kit is a free and open source project. It already has TailwindCSS built in for a better look. The project also incorporates different preconfigured libraries such as webpack, typescript and react query, ready to be used.

## Instalacion de dependencias
En la raíz de cada proyecto primero deber ejecutar el siguiente comando para instalar dependencias:
```sh
npm install
```
## Correr en modo local
En la raíz del proyecto general ejecutar el siguiente comando
```sh
npm run start
```

## Variables de Entorno

Puedes utilizar variables de entorno en todo el proyecto, agrega el archivo .env como se puede ver en .env.example. 

## Deploy en Vercel 

En caso que necesites deployar tu app, Vercel es un muy buena alternativa, aqui te dejo algunos pasos de utilidad.

1. Crear una cuenta en Vercel: https://vercel.com/
2. Crear un nuevo projecto.
3. Enlazar los proyectos desde tu consola, para ello te recomiendo instalar globalmente Vercel CLI:

```sh
npm i -g vercel    
yarn global add vercel
```

4. Para enlazar un proyecto desde tu consola después de correr un "vercel login" débes correr el comando:

```sh
vercel <root-directory>
```

5. Algo muy útil es la posibilidad de generar un build con el paso de variables de entorno de la siguiente manera:

```sh
vercel --build-env REACT_APP_ANY_ENV=value
```


