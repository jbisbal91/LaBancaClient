import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { News } from 'app/app-news/models/news';
import { NewsService } from 'app/app-news/services/news.service';
import { LocalStorageService } from 'app/app-core/services/local-storage.service';

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
        if(this.screenWidth<871){
          this.cols = 1;
          this.gridList = 'grid-list-container-cols-1';
        }else{
          this.cols = 2;
          this.gridList = 'grid-list-container-cols-2';
        }
        console.log(this.screenHeight, this.screenWidth);
  }

  constructor(
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
        this.ls.setItem('dataNewsLocalStorage',_news.noticias);
        this.news = this.ls.getItem('dataNewsLocalStorage');
      }
    });
  }
 }
}
