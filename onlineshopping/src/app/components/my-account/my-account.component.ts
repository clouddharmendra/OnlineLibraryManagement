import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/models/user.dto';
import { OnlineShoppingObserver } from 'src/app/services/online-shopping-observer';
import { OnlineShoppingService } from 'src/app/services/online-shopping-service';
import * as appProperties from 'src/app/app.properties';
import { Router } from '@angular/router';
import { SelectedBooks } from 'src/app/models/selected-books.model';
import { Book } from 'src/app/models/books.model';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  // userInfo: User;
  accountDetails: FormGroup;
  myBooks: Array<Book> = [];
  constructor(fb: FormBuilder, private onlineShoppingObserver: OnlineShoppingObserver, private onlineShoppingService:
    OnlineShoppingService, private router: Router) {
  }

  ngOnInit() {
    this.onlineShoppingObserver.userData$.subscribe((user: User) => {
      if (!user || undefined === user || null === user) {
        this.router.navigateByUrl(appProperties.URL_WLCM);
      } else {
        this.onlineShoppingService.getSelectedBooksInfo(user.emailId).subscribe((selectedBooks: SelectedBooks) => {
          this.myBooks = selectedBooks.myBooks;
        });
      }
    });
  }
}