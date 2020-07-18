import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import * as appProperties from 'src/app/app.properties';
import { OnlineLibraryMgmtService } from 'src/app/services/online-library-mgmt.service';

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
    constructor(private onlineLibraryMgmtService: OnlineLibraryMgmtService,  private router: Router) {
    }

    ngOnInit() {

    }

    // To validate the use who is logging in, if record matches redirection will happen to the products page.
    loginUser() {        
        if (!this.reg.test(this.emailId)) {
            this.emailErr = true;
        } else if (this.emailId) {
            this.onlineLibraryMgmtService.userLogin(this.emailId).subscribe(response => {
                if (response && response.emailId) {
                    this.userData = response;
                    this.onlineLibraryMgmtService.subscribeUserData(this.userData);
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
