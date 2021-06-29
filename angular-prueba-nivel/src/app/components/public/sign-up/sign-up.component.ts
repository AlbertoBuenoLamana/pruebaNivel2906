import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  emailVerificationMessage: boolean = false;
  registerMessage: boolean = false;
  signUpForm!: FormGroup;
  error: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { 
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  signUp() {

    this.authenticationService.signup(this.signUpForm.value)
      .subscribe(bool => {
        if(bool){
         this.registerMessage = true
        }else{
          this.error = "Fallo en el registro";
          //console.log("Ha fallado")
        }
      }, error => {
      
        this.error = error.message;
      });

  }

}
