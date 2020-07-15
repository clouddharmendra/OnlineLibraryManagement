import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineShoppingService } from 'src/app/services/online-shopping-service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private onlineShoppingService: OnlineShoppingService) { }

  ngOnInit() {
  }
  updateHomePage(){
    this.onlineShoppingService.showBookDetails = false;
  }
}
