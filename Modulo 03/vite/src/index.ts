import styles from "./styles.module.css";

/**
 * Esté configurado con TypeScript y que permita detectar errores de tipos en la terminal si los hubiera.
 */
const user: string = "Lemoncoder";
console.log(`Hello, ${user}!`);

/**
 * Tenga variables de entorno. Crea un setup de modo que las variables puedan tener un valor para desarrollo y otro distinto para producción. Utiliza un console.log para mostrar su valor por consola, de manera que en desarrollo local (npm start) muestre un valor, pero al levantar la build (npm run preview) su valor sea específico para producción.
 */
console.log(`Valor variable de entorno: ${import.meta.env.VITE_SOME_KEY}`);

/**
 * Crea un elemento <h1> con texto, utilizando la API del DOM, y dale estilos con CSSModules.
 */
const title: HTMLHeadingElement = document.createElement("h1");
title.className = styles.title;
title.textContent = "Módulo 03: Bundling - Vite";

document.querySelector("header")?.appendChild(title);
