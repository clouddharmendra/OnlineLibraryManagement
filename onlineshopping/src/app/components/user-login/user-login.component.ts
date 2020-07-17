import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineShoppingService } from 'src/app/services/online-shopping-service';
import { OnlineShoppingObserver } from 'src/app/services/online-shopping-observer';
import { User } from 'src/app/models/user.dto';
import * as appProperties from 'src/app/app.properties';
import { SelectedBooks } from 'src/app/models/selected-books.model';

@Component({
    selector: 'app-user-login',
    templateUrl: './user-login.component.html',
    styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
    loading = false;
    emailId: string;
    userData: User;
    emailErr: boolean = false;
     reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    constructor(private onlineShoppingService: OnlineShoppingService, private onlineShoppingObserver:
        OnlineShoppingObserver, private router: Router) {
    }

    ngOnInit() {

    }

    // To validate the use who is logging in, if record matches redirection will happen to the products page.
    loginUser() {        
        if (!this.reg.test(this.emailId)) {
            this.emailErr = true;
        } else if (this.emailId) {
            this.onlineShoppingService.userLogin(this.emailId).subscribe(response => {
                if (response && response.emailId) {
                    this.userData = response;
                    this.onlineShoppingObserver.subscribeUserData(this.userData);
                    this.router.navigateByUrl(appProperties.URL_HOME);
                } else {
                    this.router.navigateByUrl(appProperties.URL_ACCT);
                }
            }, (error: any) => {
                    this.router.navigateByUrl(appProperties.URL_NOTFND);
                });
                this.emailErr = false;
        }
    }
}
