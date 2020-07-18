import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import * as appProperties from 'src/app/app.properties';
import { Router } from '@angular/router';
import { SelectedBooks } from 'src/app/models/selected-books.model';
import { Book } from 'src/app/models/books.model';
import { OnlineLibraryMgmtService } from 'src/app/services/online-library-mgmt.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {
  // userInfo: User;
  accountDetails: FormGroup;
  myBooks: Array<Book> = [];
  constructor(fb: FormBuilder, private onlineLibraryMgmtService: OnlineLibraryMgmtService, private router: Router) {
  }

  ngOnInit() {
    this.onlineLibraryMgmtService.userData$.subscribe((user: User) => {
      if (!user || undefined === user || null === user) {
        this.router.navigateByUrl(appProperties.URL_WLCM);
      } else {
        this.onlineLibraryMgmtService.getSelectedBooksInfo(user.emailId).subscribe((selectedBooks: SelectedBooks) => {
          this.myBooks = selectedBooks.myBooks;
        });
      }
    });
  }
}