import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouteReuseStrategy, RouterModule } from '@angular/router';

import { AuthInterceptorService } from './authentication/authentication.interceptor';
import { AuthenticationService } from './authentication/authentication.service';

import { ApiService } from './http/api.service';
 import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; 
import { ReactiveFormsModule } from '@angular/forms';
import { LOCAL } from '../app.constants';
import { AuthenticationGuard } from './guard/authentication.guard';
import { UsersService } from './services/users.service';



@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        RouterModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        },
        AuthenticationService,
        AuthenticationGuard,
        ApiService,
        UsersService,
    ]
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        // Import guard
        if (parentModule) {
            throw new Error(`${parentModule} has already been loaded. Import Core module in the AppModule only.`);
        }
    }

}