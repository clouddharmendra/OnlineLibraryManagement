import { Component, OnInit, Input } from '@angular/core';
import { Book } from 'src/app/models/books.model';
import { OnlineShoppingService } from 'src/app/services/online-shopping-service';
import { SelectedBooks } from 'src/app/models/selected-books.model';
import { User } from 'src/app/models/user.dto';
import { OnlineShoppingObserver } from 'src/app/services/online-shopping-observer';
import { Router, ActivatedRoute } from '@angular/router';
import * as appProperties from 'src/app/app.properties'

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @Input('bookDetails') bookDetails: Book;
  userEmail: string;
  selectedBooks: SelectedBooks;

  constructor(private onlineShoppingService: OnlineShoppingService,
    private onlineShoppingObserver: OnlineShoppingObserver,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onlineShoppingObserver.userData$.subscribe((user: User) => {
      this.userEmail = user.emailId;
      if (null === user) {
          this.router.navigateByUrl(appProperties.URL_WLCM);
      } else {
        this.onlineShoppingService.getSelectedBooksInfo(this.userEmail).subscribe((response: SelectedBooks) => {
          this.selectedBooks = response;
        });
        let bookDetails = this.route.snapshot.queryParamMap.get('book');
        // let bookDetails = this.route.snapshot.paramMap.get('book');
        console.log('Route Data from Home:-> ', JSON.parse(bookDetails));
        this.bookDetails = JSON.parse(bookDetails);
      }
    });
  }
  barrowBook() {
    if (undefined === this.selectedBooks || null === this.selectedBooks) {
      this.selectedBooks = new SelectedBooks();
      this.selectedBooks.myBooks = [];
    }
    this.bookDetails.available = false;
    this.bookDetails.btnText = 'Not Available';
    this.bookDetails.borrowedDate = new Date();
    this.selectedBooks.emailId = this.userEmail;
    this.selectedBooks.myBooks.push(this.bookDetails);
    this.onlineShoppingService.updateMyBooks(this.selectedBooks).subscribe(response => {
      console.log('Response on Book Save :-> ', response);
    });
    // this.router.navigateByUrl(appProperties.URL_ROUTE_ACCT);
    this.router.navigateByUrl(appProperties.URL_HOME);
  }
}
