import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as appProperties from 'src/app/app.properties';
import { SelectedBooks } from '../models/selected-books.model';
import { Book } from '../models/books.model';

@Injectable({
  providedIn: 'root'
})
export class OnlineShoppingService {

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

  // placeOrder(orderData): any {
  //   return this.http.post<any>(environment.placeOrderUrl, orderData);
  // }


  // getMyOrders(emailId): any {
  //   return this.http.get<any>(environment.getMyOrdersUrl + emailId);
  // }

  // updateOrderStatus(order): any {
  //   return this.http.put<any>(environment.updateOrderStatus + order.id, order);
  // }
  // updateUserDetails(user, type): any {
  //   if (type && type === appProperties.ADD_OPERATION) {
  //     return this.http.post<any>(environment.addUserDetailsUrl, user);
  //   } else {
  //     return this.http.put<any>(environment.updateUserDetailsUrl, user);
  //   }
  // }
}
