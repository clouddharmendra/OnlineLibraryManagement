import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { SelectedBooks } from '../models/selected-books.model';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class OnlineLibraryMgmtService {
  private userData = new BehaviorSubject(null);
  userData$ = this.userData.asObservable();
  subscribeUserData(userInfo: User) {
    this.userData.next(userInfo);
  }
  private _showBookDetails: boolean;

  public get showBookDetails(): boolean {
    return this._showBookDetails;
  }
  public set showBookDetails(value: boolean) {
    this._showBookDetails = value;
  }
  constructor(private http: HttpClient) {
  }

  getAllBooks(): any {
    return this.http.get<any>(environment.getBookssUrl);
  }

  userLogin(emailId: string): any {
    return this.http.get<any>(environment.loginUrl + emailId);
  }

  getSelectedBooksInfo(emailId: string) {
    return this.http.get<any>(environment.getSelectedBooks + emailId);
  }

  saveMyBooks(myBooks: SelectedBooks): any {
    return this.http.post<any>(environment.saveMyBooks, myBooks);
  }

  updateMyBooks(myBooks: SelectedBooks): any {
    return this.http.post<any>(environment.updateMyBooks, myBooks);
  }
}
