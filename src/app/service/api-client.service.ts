import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { JavEngWord, WordCountResponse } from '../model/Response';

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

  getWord(word: string): Observable<JavEngWord[]> {
    const url = this.API_URL + "/chain-game/word/" + word;
    return this.http.get<JavEngWord[]>(url, {
      responseType: "json",
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": this.API_URL
      })
    }).pipe(
      catchError(this.handleError<JavEngWord[]>('getWordInfo', []))
    );
  }

  getWordByPrefix(prefix: string, limit: number, offset: number): Observable<JavEngWord[]> {
    const url = this.API_URL + "/chain-game/word";
    return this.http.get<JavEngWord[]>(url, {
      responseType: "json",
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": this.API_URL
      }),
      params: { prefix: prefix, limit: limit.toString(), offset: offset.toString() }
    }).pipe(
      catchError(this.handleError<JavEngWord[]>('getWordByPrefix', []))
    );
  }

  randomWord(prefix: string, limit?: number): Observable<JavEngWord[]> {
    if (!limit) {
      limit = 10;
    }
    const url = this.API_URL + "/chain-game/random";
    return this.http.get<JavEngWord[]>(url, {
      responseType: "json",
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": this.API_URL
      }),
      params: { prefix: prefix, limit: limit.toString() }
    }).pipe(
      catchError(this.handleError<JavEngWord[]>('randomWord', []))
    );
  }

  countWord(prefix: string): Observable<WordCountResponse> {
    const url = this.API_URL + "/chain-game/count";
    return this.http.get<WordCountResponse>(url, {
      responseType: "json",
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": this.API_URL
      }),
      params: { prefix: prefix }
    }).pipe(
      catchError(this.handleError<WordCountResponse>('countWord', null))
    );
  }

}
