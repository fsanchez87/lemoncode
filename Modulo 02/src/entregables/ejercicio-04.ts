console.log("");
console.log("");
console.log("************** Entregable 4. Read Books *********************");
console.log("");

/**
 * Read Books
 *
 * Crea una función isBookRead que reciba una lista de libros y un título
 * y devuelva si se ha leído o no dicho libro.
 *
 * Un libro es un objeto con:
 * - title: string
 * - isRead: boolean
 *
 * En caso de no existir el libro devolver false
 *
 * TIP: Existe un método de Array.prototype que te ayudará a buscar según un patrón.
 */

interface Book {
  title: string;
  isRead: boolean;
}

const books: Book[] = [
  { title: "Harry Potter y la piedra filosofal", isRead: true },
  { title: "Canción de hielo y fuego", isRead: false },
  { title: "Devastación", isRead: true },
];

function isBookRead(books: Book[], titleToSearch: string): boolean {
  return books.some((b) => b.title === titleToSearch && b.isRead);
}

console.log("--- isBookRead(books, title) ---");
console.log(`Entrada: ${JSON.stringify(books)}`);


console.log(`isBookRead(books, "Devastación"): ${isBookRead(books, "Devastación")}`); // true
console.log(`isBookRead(books, "Canción de hielo y fuego"): ${isBookRead(books, "Canción de hielo y fuego")}`); // false
console.log(`isBookRead(books, "Los Pilares de la Tierra"): ${isBookRead(books, "Los Pilares de la Tierra")}`); // false
