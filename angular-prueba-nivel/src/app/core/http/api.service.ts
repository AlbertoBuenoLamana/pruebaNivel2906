import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Subject, Observable, Subscription, Observer, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SERVER_PATH } from 'src/app/app.constants';

const defaultHeaders = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
const defaultParams : HttpParams = new HttpParams();
@Injectable()
export class ApiService {
    constructor(public http: HttpClient) {
    }
    private formatErrors(error: any) {
        return throwError(error);
    }
    get(path: string, options : any = { headers: defaultHeaders, params: defaultParams}): Observable<any> {
        return this.http.get(`${SERVER_PATH}${path}`, options)
            .pipe(catchError(this.formatErrors));
    }

    put(path: string, body: Object = {}, options : any = { headers: defaultHeaders}): Observable<any> {
        return this.http.put(
            `${SERVER_PATH}${path}`,
            JSON.stringify(body),
            options
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: Object = {}, options : any = { headers: defaultHeaders}): Observable<any> {
        return this.http.post(
            `${SERVER_PATH}${path}`,
            JSON.stringify(body),
            options
        ).pipe(catchError(this.formatErrors));
    }

    delete(path: string, options : any= { headers: defaultHeaders}): Observable<any> {
        return this.http.delete(
            `${SERVER_PATH}${path}`,
            options
        ).pipe(catchError(this.formatErrors));
    }

    
}