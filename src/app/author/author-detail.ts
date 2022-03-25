import { Book } from "../book/book";
import { Author } from "./author";

export class AuthorDetail extends Author {
  books: Array<Book>;

  constructor(id: number,
    name: string,
    birthDate: any,
    image: string,
    description: string,
    books: Array<Book>
    ){
      super(id, name, birthDate, image, description);
      this.books = books;
    }
}
