import { Component, OnInit } from '@angular/core';
import { OnlineShoppingObserver } from 'src/app/services/online-shopping-observer';
import { User } from 'src/app/models/user.dto';
import { Router } from '@angular/router';
import { OnlineShoppingService } from 'src/app/services/online-shopping-service';
import * as appProperties from 'src/app/app.properties';
import { Book } from 'src/app/models/books.model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {

  languages: Array<string> = appProperties.languages;
  genres: Array<string> = appProperties.genres;
  // public language: string;
  // public genre: string;
  // public title: string;
  // public author: string;
  books: Array<Book> = [];
  booksFilter: Array<Book> = [];
  searchForm: FormGroup;
  emptyString: string = '';
  noRecordsFound: boolean = false;
  constructor(private fb: FormBuilder, private onlineShoppingService: OnlineShoppingService, private onlineShoppingObserver: OnlineShoppingObserver, private router: Router) {
    this.searchForm = this.fb.group({
      language: ['Select'],
      genre: ['Select'],
      title: [null],
      author: [null]
    });
  }

  ngOnInit(): void {
    this.onlineShoppingObserver.userData$.subscribe((user: User) => {
      if (null === user) {
        this.router.navigateByUrl(appProperties.URL_WLCM);
      } else {
        this.onlineShoppingService.getAllBooks().subscribe(data => {
          this.books = data;
        });
      }
    });
  }

  onSearch() {
    this.booksFilter = [];
    let language = this.searchForm.controls['language'].value;
    let genre = this.searchForm.controls['genre'].value;
    let title = this.searchForm.controls['title'].value;
    let author = this.searchForm.controls['author'].value;
    this.noRecordsFound = false;
    if (null !== language && 'Select' !== language) {
      this.booksFilter = this.books.filter((book) => {
        return book.language.trim().toLowerCase() === language.trim().toLowerCase();
      });
      this.noRecordsFound = true;
    }
    if (null !== genre && 'Select' !== genre) {
      this.books.forEach((book) => {
        if (book.genre.trim().toLowerCase() === genre.trim().toLowerCase()) {
          this.booksFilter.push(book);
        }
      });
      this.noRecordsFound = true;
    }
    if (null !== title && '' !== title && undefined !== title) {
      this.books.forEach((book) => {
        if (book.title.trim().toLowerCase() === title.trim().toLowerCase()) {
          this.booksFilter.push(book);
        }
      });
      this.noRecordsFound = true;
    }
    if (null !== author && '' !== author && undefined !== author) {
      this.books.forEach((book) => {
        if (book.author.trim().toLowerCase() === author.trim().toLowerCase()) {
          this.booksFilter.push(book);
        }
      });
      this.noRecordsFound = true;
    }
    if (this.booksFilter.length > 0) {
      this.noRecordsFound = false;
    } else if (!this.noRecordsFound) {
      // this.booksFilter = this.books;
    }
  }
}
