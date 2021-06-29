import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit {
  bAuthenticated = false;
  navbarOpen = false;
  @ViewChild("navbar-cmp", {static: false}) button:any;
  
  constructor(private auth: AuthenticationService,private router: Router) {
    

   }

  ngOnInit(): void {  }

  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  
  logOut(){
    this.auth.logout();
    this.router.navigate(['/login'], { replaceUrl: true });

  }

}
