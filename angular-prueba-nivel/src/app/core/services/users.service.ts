import { Injectable } from "@angular/core";
import { ApiService } from "../http/api.service";
import { Observable, throwError, BehaviorSubject } from "rxjs";

@Injectable()
export class UsersService {

    private subject = new BehaviorSubject<string>("");
    private pullerObserver: Observable<string> = this.subject.asObservable();
    
    constructor(private apiService: ApiService) {

    }

    getUsers(): Observable<any> {
        return new Observable<any>(observer => {
            this.apiService.get('/users').subscribe(usuarios => {
                observer.next(usuarios.items);
                observer.complete();
            }, err => {
                observer.error(new Error(err.message ? err.message : err))
                observer.complete();
            });
        });
    }


    subscribe(observer:any){
        return this.pullerObserver.subscribe(observer);
    }

}