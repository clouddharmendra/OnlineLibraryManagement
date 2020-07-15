import { Book } from './books.model';

export class SelectedBooks {
    public id: string;
    public emailId: string;
    public myBooks: Array<Book> = [];
}
