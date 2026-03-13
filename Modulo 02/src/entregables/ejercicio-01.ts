console.log("************** Entregable 1. Array operations ****************");
console.log("");

// Array de pruebas único para todas las funciones
const testArray = [1, "b", 3];

/**
 * Head
 *
 * Implementa una función head (inmutable), tal que, dado un array como entrada extraiga y devuelva
 * su primer elemento. Utiliza destructuring.
 */
const head = <T>(array: T[]): T | undefined => {
  const [first] = array;
  return first;
};

console.log("--- head(array) ---");
console.log("Entrada:", testArray);
console.log("Salida:", head(testArray));
console.log("");

/**
 * Tail
 *
 * Implementa una función tail (inmutable), tal que, dado un array como entrada
 * devuelva todos menos el primer elemento. Utiliza rest operator.
 */
const tail = <T>(array: T[]): T[] | undefined => {
  const [, ...rest] = array;
  return rest;
};

console.log("--- tail(array) ---");
console.log("Entrada:", testArray);
console.log("Salida:", tail(testArray));
console.log("");

/**
 * Init
 * Implementa una función init (inmutable), tal que, dado un array como entrada
 * devuelva todos los elementos menos el último. Utiliza los métodos que ofrece Array.prototype.
 */
const init = <T>(array: T[]): T[] | undefined => array.slice(0, -1);

console.log("--- init(array) ---");
console.log("Entrada:", testArray);
console.log("Salida:", init(testArray));
console.log("");

/**
 * Last
 *
 * Implementa una función last (inmutable), tal que, dado un array como entrada
 * devuelva el último elemento.
 */
const last = <T>(array: T[]): T | undefined => array.at(-1);

console.log("--- last(array) ---");
console.log("Entrada:", testArray);
console.log("Salida:", last(testArray));
