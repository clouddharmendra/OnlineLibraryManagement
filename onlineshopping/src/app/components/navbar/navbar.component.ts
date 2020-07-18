import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OnlineLibraryMgmtService } from 'src/app/services/online-library-mgmt.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router, private onlineLibraryMgmtService: OnlineLibraryMgmtService) { }

  ngOnInit() {
  }
  updateHomePage(){
    this.onlineLibraryMgmtService.showBookDetails = false;
  }
}
