console.log("");
console.log("");
console.log("************** Entregable 2. Concat **************************");
console.log("");

// Arrays de pruebas para todas las funciones
const testArrayA = [1, "b", 3];
const testArrayB = ["D", 5, "f"];
const testArrayC = [7, 7, "z"];

/**
 * Concat
 *
 * Implementa una función concat (inmutable) tal que, dados 2 arrays como entrada,
 * devuelva la concatenación de ambos. Utiliza rest / spread operators.
 */
const concat = <T>(arrayA: T[], arrayB: T[]): T[] | undefined => {
  return [...arrayA, ...arrayB];
};

console.log("--- concat(arrayA, arrayB) ---");
console.log("Entrada:", testArrayA, testArrayB);
console.log("Salida:", concat(testArrayA, testArrayB));
console.log("");

/**
 * Opcional
 *
 * Implementa una nueva versión de concat donde se acepten múltiples arrays
 * de entrada (más de 2). No utilices el método Array.prototype.concat.
 */
const concatMany = <T>(...arrays: T[][]): T[] | undefined => {
  return [...arrays.flat()];
};

const salida = concatMany(testArrayA, testArrayB, testArrayC);

console.log("--- concatMany(arrayA, arrayB, arrayC) ---");
console.log("Entrada:", testArrayA, testArrayB, testArrayC);
console.log("Salida:", salida);
