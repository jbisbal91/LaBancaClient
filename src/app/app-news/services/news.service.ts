import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import { News } from '../models/news';
import { environment } from 'environments/environment';


@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(
    protected http: HttpClient) {
  }

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>('/noticias');
      }

  getNewsById(newsId: number): Observable<News> {
    return this.http.get<News>(`${environment.apiURL}/noticias/${newsId}`)
      .pipe(
       catchError(err => {
         return throwError(err);
        })
        );
    }   
}
