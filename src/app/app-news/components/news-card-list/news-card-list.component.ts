import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { News } from 'app/app-news/models/news';
import { NewsService } from 'app/app-news/services/news.service';
import { LocalStorageService } from 'app/app-core/services/local-storage.service';
import { NewsAddComponent } from '../news-add/news-add.component';

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.scss']
})
export class NewsCardListComponent implements OnInit,OnDestroy {
  news: any;
  actionSubscriptions: Subscription[] = [];
  cols = 0;
  gridList = '';
  screenHeight :any;
  screenWidth:any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        if(this.screenWidth > 1366){
          this.cols = 3;
          this.gridList = 'grid-list-container-cols-3';
        }
        if(this.screenWidth > 837 && this.screenWidth <= 1366){
          this.cols = 2;
          this.gridList = 'grid-list-container-cols-2';
        }
       if(this.screenWidth <= 837 ){
          this.cols = 1;
          this.gridList = 'grid-list-container-cols-1';
        }
        console.log(this.screenHeight, this.screenWidth);
  }

  constructor(
    private dialog: MatDialog,
    private newsService: NewsService,
    private ls: LocalStorageService) { 
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.catchDataNews();
    this.news = this.ls.getItem('dataNewsLocalStorage');
    this.actionSubscriptions.push(this.catchAction());
  }

  ngOnDestroy(): void {
    this.actionSubscriptions.forEach(as => as.unsubscribe());
  }

  catchDataNews(){
    this.newsService.dataNews$.subscribe(_news => {
      if(_news!==null){
        this.news = [..._news];
      }
    })
  }


 catchAction(){
  if(this.ls.getItem('dataNewsLocalStorage') !== null){
    return;
  }else if(this.ls.getItem('dataNewsLocalStorage') === null){
    return this.newsService.getAllNews().subscribe(_news => {
      if(_news!==undefined){
        var newsResult =_news.noticias.sort((a, b) => this.sortData(a, b));
        this.ls.setItem('dataNewsLocalStorage',newsResult);
        this.news = this.ls.getItem('dataNewsLocalStorage');
      }
    });
  }
 }

 addNews() {
    const dialogRef = this.dialog.open(NewsAddComponent,{
      width: '35vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
 }

 sortData(a: any, b: any): number {
  if (a.OrderId < b.OrderId) {
    return 1;
  }
  if (a.OrderId > b.OrderId) {
    return -1;
  }
  return 0;
}


}
