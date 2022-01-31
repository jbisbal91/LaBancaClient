import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { NewsService } from 'app/app-news/services/news.service';
import { DeleteItemService } from './service/delete-item.service';

@Component({
  selector: 'app-delete-item',
  templateUrl: './delete-item.component.html',
  styleUrls: ['./delete-item.component.scss']
})
export class DeleteItemComponent implements OnInit {

  idNews:number;
  
  constructor(
    private dialog: MatDialog, 
    private deleteItemService: DeleteItemService,
    private newsService: NewsService) { }

  ngOnInit(): void {
   
  }

  deleteNews(){
    this.idNews = this.deleteItemService.idNews;
    this.newsService.deleteNews(this.idNews);
}
}
