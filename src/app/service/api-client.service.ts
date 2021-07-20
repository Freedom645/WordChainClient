import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { JavEngWord } from '../model/JavEngWord';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  readonly API_URL: string = environment.api.wordChainHost;

  constructor(
    private http: HttpClient
  ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      if (400 <= error.status && error.status < 500) {
        console.error(error.status);
      } else if (500 <= error.status) {
        console.error(error.status);
      }
      return of(result as T);
    };
  }

  getWordInfo(word: string): Observable<JavEngWord[]> {
    const url = this.API_URL + "/word/" + word;
    console.log(url);
    return this.http.get<JavEngWord[]>(url, {
      responseType: "json",
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": this.API_URL
      })
    }).pipe(
      catchError(this.handleError<JavEngWord[]>('getWordInfo', []))
    );
  }

}
