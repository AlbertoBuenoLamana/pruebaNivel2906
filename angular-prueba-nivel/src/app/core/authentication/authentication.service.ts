import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ApiService } from '../http/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';


export interface Credenciales {
    accessToken:string,
    refreshToken:string,
    tokenType:string
}

export interface LoginContext {
    email: string;
    password: string;
}

export interface SignupContext {
    email: string;
    password: string;
    name: string;
    surname: string;
}

const credentialsKey = 'credentials';

@Injectable()
export class AuthenticationService {
    private helper = new JwtHelperService();
    private _credentials!: any | null;
    private subject = new BehaviorSubject<string>("");
    private pullerObserver: Observable<string> = this.subject.asObservable();

    constructor(private api : ApiService) {
        const savedCredentials = sessionStorage.getItem(credentialsKey);
        if (savedCredentials) {
            this._credentials = JSON.parse(savedCredentials);
        }
    }

    /**
     * Autentica a un usuario en el backend.
     * @param {LoginContext} context Contexto de inicio de sesión. (email, password)
     * @return {Observable<Credenciales>} Devuelve informacion del token
     */
    login(context: LoginContext): Observable<Credenciales> {
        //TODO: PERSONALIZAR Llamada de inicio de sesión
        return new Observable<Credenciales>(observer => {
            this.api.post('/auth/log-in',{
                email : context.email,
                password : context.password
            }).subscribe(loginResult =>{
                let cred = {
                    accessToken:  loginResult['accessToken'],
                    refreshToken:  loginResult['refreshToken'],
                    tokenType:  loginResult['tokenType'],
                }
                this.setCredentials(cred);
                observer.next(cred)
                observer.complete();
               
            },err=>{
                
                this.setCredentials(null);
                observer.error(new Error(err.message ? err.message : err))
                observer.complete();
            });
        });
    }

    signup(context: SignupContext): Observable<any> {
        return new Observable<boolean>(observer => {
            this.api.post('/auth/sign-up',{
                email : context.email,
                password : context.password,
                name: context.name,
                surname: context.surname
            }).subscribe(result =>{
                //si llega es que ha ido bien, devolvemos el true
                observer.next(true)
                observer.complete();
               
            },err=>{
                //si da error devolvemos el false
                observer.next(false)
                observer.complete();
            });
        });
    }

    logout(): Observable<boolean> {
        this.setCredentials();
        return of(true);
    }

    /**
     * Comprueba si el usuario está autenticado.
     * @return {boolean} True si el usuario está autenticado
     */
    isAuthenticated(): boolean {
        try{
            return !!this.credentials && !this.helper.isTokenExpired(this.token);
        }catch(e){
            return false;
        }
        
    }

    /**
     * Obtiene las credenciales de autenticación
     * @return {Credenciales} NULL si no está autenticado
     */
    get credentials(): Credenciales | null {
        return this._credentials;
    }

    get token(): any {

        return !!this.credentials ? this._credentials.accessToken : null;
    }

    private setCredentials(credentials?: any) {
        this._credentials = credentials || null;

        if (credentials) {
            const storage = sessionStorage;
            storage.setItem(credentialsKey, JSON.stringify(credentials));
            storage.setItem('token', this.token);
            this.subject.next("");
        } else {
            sessionStorage.removeItem(credentialsKey);
            sessionStorage.removeItem('token');
            this.subject.next("");
        }
    }
    public subscribe(observer: any) {
        return this.pullerObserver.subscribe(observer);
    }

}