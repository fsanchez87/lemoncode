
console.log("************** DELIVERABLE 01 *********************");
console.log("************** 1. Array operations ****************");

// Array de pruebas único para todas las funciones
const testArray = [1, 'b', 3];



/**
 * Devuelve el primer elemento de un array.
 * @template T
 * @param {T[]} array - Array de entrada.
 * @returns {T | undefined} El primer elemento del array o undefined si está vacío.
 */
const head = <T>(array: T[]): T | undefined => {
  const [first] = array;
  return first;
};

console.log('--- head(array) ---');
console.log('Entrada:', testArray);
console.log('Salida:', head(testArray));
console.log('');




/**
 * Devuelve todos los elementos de un array excepto el primero.
 * @template T
 * @param {T[]} array - Array de entrada.
 * @returns {T[] | undefined} Un nuevo array sin el primer elemento, o undefined si está vacío.
 */
const tail = <T>(array: T[]): T[] | undefined => {
  const [, ...rest] = array;
  return rest;
};

console.log('--- tail(array) ---');
console.log('Entrada:', testArray);
console.log('Salida:', tail(testArray));
console.log('');




/**
 * Devuelve todos los elementos de un array excepto el último.
 * @template T
 * @param {T[]} array - Array de entrada.
 * @returns {T[] | undefined} Un nuevo array sin el último elemento, o undefined si está vacío.
 */
const init = <T>(array: T[]): T[] | undefined => array.slice(0, -1);

console.log('--- init(array) ---');
console.log('Entrada:', testArray);
console.log('Salida:', init(testArray));
console.log('');




/**
 * Devuelve el último elemento de un array.
 * @template T
 * @param {T[]} array - Array de entrada.
 * @returns {T | undefined} El último elemento del array o undefined si está vacío.
 */
const last = <T>(array: T[]): T | undefined => array.at(-1);

console.log('--- last(array) ---');
console.log('Entrada:', testArray);
console.log('Salida:', last(testArray));
console.log('');
