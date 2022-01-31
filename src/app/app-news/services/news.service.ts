import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { BehaviorSubject, forkJoin, of, Subject } from 'rxjs';

import { News } from "../models/news";
import { LocalStorageService } from "app/app-core/services/local-storage.service";
@Injectable({
  providedIn: "root",
})
export class NewsService {

  private dataNewsLocalStorage: any[] = [];;
  private dataNewsSubject = new BehaviorSubject<any[]>(this.dataNewsLocalStorage);
  dataNews$ = this.dataNewsSubject.asObservable();

  constructor(
    protected http: HttpClient,
    private ls: LocalStorageService) {
    this.dataNewsLocalStorage = this.ls.getItem('dataNewsLocalStorage');
  }

  getAllNews(): Observable<any> {
    return this.http.get<any>("/noticias").pipe(
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

  deleteNews(newsId: number) {
    const index = this.dataNewsLocalStorage.findIndex((n) => n.id === newsId);
    this.dataNewsLocalStorage.splice(index, 1);
    this. sendDataNews(this.dataNewsLocalStorage);
    this.ls.setItem('dataNewsLocalStorage',this.dataNewsLocalStorage);
  }

  sendDataNews(dataNews: any[]) {
    this.dataNewsSubject.next(dataNews);
  }

}
