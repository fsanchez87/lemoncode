/**
 * Tipado de los CSS Modules. Vite los resuelve como objetos con los nombres de
 * clase locales, de ahí que se puedan importar con `import css from "./x.module.css"`.
 */
declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
