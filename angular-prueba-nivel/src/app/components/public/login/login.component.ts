import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  emailVerificationMessage: boolean = false;
  loginForm!: FormGroup;


  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  login() {

    this.authenticationService.login(this.loginForm.value)
      .subscribe(credentials => {
        this.router.navigate(['/home'], { replaceUrl: true });
      }, error => {
      
        this.emailVerificationMessage = error.message;
      });

  }



}