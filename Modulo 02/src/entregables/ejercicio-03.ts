console.log("");
console.log("");
console.log("************** Entregable 3. Clone merge *********************");
console.log("");

// Objeto de pruebas para todas las funciones
const original: object = {
  name: "John",
  surname: "Doe",
  details: { age: 25, city: "Madrid" },
};

/**
 * Clone
 *
 * Implementa una función clone que, a partir de un objeto de entrada source
 * devuelva un nuevo objeto con las propiedades de source:
 */
function clone<T extends object>(source: T): T {
  return { ...source };
}

const resultado = clone(original);

console.log("--- clone(original) ---");
console.log("Entrada:", original);
console.log("Salida:", resultado);

/**
 * Merge
 *
 * Implementa una función merge que, dados dos objetos de entrada source y target, devuelva un nuevo objeto con todas las propiedades de target y de source, y en caso de propiedades con el mismo nombre, source sobreescribe a target.
 */

const a = { name: "Maria", surname: "Ibañez", country: "SPA" };
const b = { name: "Luisa", age: 31, married: true };

function merge<T extends object>(source: object, target: object): T {
  return { ...target, ...source } as T;
}

const resultadoMerge = merge(a, b);
console.log(resultadoMerge);
