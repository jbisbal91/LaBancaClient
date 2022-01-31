import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { News } from "../models/news";
@Injectable({
  providedIn: "root",
})
export class NewsService {
  constructor(protected http: HttpClient) {}

  getAllNews(): Observable<News[]> {
    return this.http.get<News[]>("/noticias").pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }

  getNewsById(newsId: number): Observable<News> {
    return this.http.get<News>(`/noticias/${newsId}`).pipe(
      catchError((err) => {
        return throwError(err);
      })
    );
  }
}
