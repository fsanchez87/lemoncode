/**
 * Comprobación de credenciales del ejercicio: no hay backend real, así que la
 * promesa se resuelve con el resultado de comparar usuario y contraseña.
 */
export const doLogin = (
  username: string,
  password: string
): Promise<boolean> => Promise.resolve(username === "admin" && password === "test");
