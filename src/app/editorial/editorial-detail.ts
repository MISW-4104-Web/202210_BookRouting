import { Book } from "../book/book";
import { Editorial } from "./editorial";

export class EditorialDetail extends Editorial {
  books: Array<Book> = [];

  constructor(id: number, name: string, books: Array<Book>) {
    super(id, name);
    this.books = books;
  }

}
