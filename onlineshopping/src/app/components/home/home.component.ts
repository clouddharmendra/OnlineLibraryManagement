import { Component, OnInit } from '@angular/core';
import * as appProperties from 'src/app/app.properties';
import { Book } from 'src/app/models/books.model';
import { SelectedBooks } from 'src/app/models/selected-books.model';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { OnlineLibraryMgmtService } from 'src/app/services/online-library-mgmt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public userInfo: User;
  public books: Book[] = [];
  public booksMsterData: Book[];
  public searchText: string;
  public selectedBooks: SelectedBooks;
  constructor(public onlineLibraryMgmtService: OnlineLibraryMgmtService,  public router: Router) { }

  ngOnInit() {
    this.onlineLibraryMgmtService.userData$.subscribe(user => {
      this.userInfo = user;

      if (null === user) {
        this.router.navigateByUrl(appProperties.URL_WLCM);
      } else {
        this.onlineLibraryMgmtService.getAllBooks().subscribe(data => {
          if (null !== this.userInfo && null !== this.userInfo.emailId) {
            this.onlineLibraryMgmtService.getSelectedBooksInfo(this.userInfo.emailId).subscribe((selectedBooks) => {
              this.selectedBooks = selectedBooks;
              for (var j = 0; j < data.length; j++) {
                for (var k = 0; k < this.selectedBooks.myBooks.length; k++) {
                  if (data[j].title === this.selectedBooks.myBooks[k].title) {
                    data[j].available = false;
                    data[j].btnText = this.selectedBooks.myBooks[k].btnText;
                  }
                }
                this.books.push(data[j]);
              }
            }, error => {
              this.booksMsterData = this.books = data;
            });
          }
          this.booksMsterData = this.books;
        });
      }
    });
  }

  // To Filter the cloths based on given search criteria.
  searchDetails() {
    this.books = JSON.parse(JSON.stringify(this.booksMsterData));
    if (null !== this.searchText && '' !== this.searchText.trim()) {
      let searchValue = this.searchText.trim().toLocaleLowerCase() ? this.searchText.trim().toLocaleLowerCase() : this.searchText.trim();
      this.books = [];
      for (var l = 0; l < this.booksMsterData.length; l++) {
        let title = this.booksMsterData[l].title.trim().toLocaleLowerCase();
        if (title.includes(searchValue)) {
          this.books.push(this.booksMsterData[l]);
        }
      }
    }
  }

  advancedSearch() {
    this.router.navigateByUrl(appProperties.URL_ADVSERCH);
  }

  // To show Book Details in new window
  onClick(book: Book) {
    // this.selectedBook = book;
    // this.onlineShoppingService.showBookDetails = !this.onlineShoppingService.showBookDetails;
    this.router.navigate(['/book'], { queryParams: { 'book': JSON.stringify(book) } });
    // this.router.navigate(['/book', { 'book': JSON.stringify(book) }]);
  }

  barrowBook(book: Book) {
    book.available = false;
    book.emailId = this.userInfo.emailId;
    book.btnText = 'Not Available';
    book.borrowedDate = new Date();
    if (this.selectedBooks && this.selectedBooks.myBooks.length > 0
      && null !== this.selectedBooks.emailId) {
      if (!this.selectedBooks.myBooks.find((bk) => { bk.id === book.id })) {
        this.selectedBooks.myBooks.push(book);
      }
    } else {
      let sb = new SelectedBooks();
      sb.myBooks.push(book);
      this.selectedBooks = sb;
    }
    this.selectedBooks.emailId = this.userInfo.emailId;
    this.onlineLibraryMgmtService.updateMyBooks(this.selectedBooks).subscribe((response: SelectedBooks) => {
      this.selectedBooks = response;
    }, (error: any) => {
      console.error('Error :=> ', error)
    });
  }
}