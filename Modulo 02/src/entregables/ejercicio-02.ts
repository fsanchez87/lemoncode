console.log("************** DELIVERABLE 02 *********************");
console.log("************** 2. Concat **************************");
console.log('');

// Arrays de pruebas para todas las funciones
const testArrayA = [1, 'b', 3];
const testArrayB = ['D', 5, 'f'];
const testArrayC = [ 7, 7, 'z'];


/**
 * Devuelve la concatenación de dos arrays de forma inmutable.
 * Utiliza rest/spread operators.
 * @template T
 * @param {T[]} arrayA - Primer array de entrada.
 * @param {T[]} arrayB - Segundo array de entrada.
 * @returns {T[] | undefined} Un nuevo array con los elementos de ambos arrays concatenados.
 */
const concat = <T>(arrayA: T[], arrayB: T[]): T[] | undefined => {
  return [...arrayA, ...arrayB];
};

console.log('--- concat(arrayA, arrayB) ---');
console.log('Entrada:', testArrayA, testArrayB);
console.log('Salida:', concat(testArrayA, testArrayB));
console.log('');


/**
 * Devuelve la concatenación de múltiples arrays de forma inmutable.
 * No utiliza Array.prototype.concat.
 * @template T
 * @param {...T[][]} arrays - Arrays de entrada a concatenar.
 * @returns {T[] | undefined} Un nuevo array con todos los elementos concatenados.
 */
const concatMany = <T>(...arrays: T[][]): T[] | undefined => {
  return [...arrays.flat()];
};

const salida = concatMany(testArrayA, testArrayB, testArrayC);

console.log('--- concatMany(arrayA, arrayB, arrayC) ---');
console.log('Entrada:', testArrayA, testArrayB, testArrayC);
console.log('Salida:', salida);
console.log('');

