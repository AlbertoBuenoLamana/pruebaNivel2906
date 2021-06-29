import { Routes, Route } from '@angular/router';
import { AuthenticationGuard } from '../core/guard/authentication.guard';
import { ShellComponent } from '../shell/shell/shell.component';


export class Shell {

    /**
     * Crea rutas que contienen el componente shell (dento un ruter) y un authenticationGuard
     * @param routes Rutas a añadir como hijas
     * @return {Route} La nueva ruta creada
     */
    static childRoutes(routes: Routes, path : string = ''): Route {
        return {
            path,
            component: ShellComponent,
            children: routes,
            canActivate: [AuthenticationGuard],
        };
    }
}