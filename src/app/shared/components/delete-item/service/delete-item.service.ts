import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteItemService {

  idNews:number;

  constructor() { }

  setSelectedNewsId(idNews:number): void {
    this.idNews = idNews;
  }

  getSelectedNewsId() {
    return this.idNews;
  }


}
