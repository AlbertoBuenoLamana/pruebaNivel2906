import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  usersList: any;
  constructor( private usersService: UsersService,private auth: AuthenticationService) { }

  ngOnInit(): void {

    this.getListaUsuarios();

    //console.log(this.usersList)
  }


  getListaUsuarios() {

    this.usersService.getUsers().subscribe(usuarios => {
      this.usersList = usuarios;
    }, err => {
      console.log(err.message);
    })

  }

}
