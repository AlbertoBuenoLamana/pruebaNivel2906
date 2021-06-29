import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


//Components
import { HomeComponent } from '../components/private/home/home.component';
import { UsersComponent } from '../components/private/users/users.component';
import { Shell } from './shell.service';


const routes: Routes = [
    Shell.childRoutes([
       { path: '', redirectTo: '/home',pathMatch: 'full' },
       { path: 'home', component: HomeComponent},
       { path: 'users', component: UsersComponent},
   ])
];

@NgModule({
   imports: [RouterModule.forChild(routes)],
   exports: [RouterModule],
   providers: []
})
export class ShellRouteModule { }