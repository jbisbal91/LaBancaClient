import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsService } from 'app/app-news/services/news.service';
import { News } from 'app/app-news/models/news';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit,OnDestroy {
  actionSubscriptions: Subscription[] = [];
  news: News[];

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;
  screenHeight :any;
  screenWidth:any;
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
        this.screenHeight = window.innerHeight;
        this.screenWidth = window.innerWidth;
        console.log(this.screenHeight, this.screenWidth);
  }

  constructor(private newsService: NewsService) { }
 
  ngOnInit(): void {
    this.newsService.getNewsById(171).subscribe(news => {
      if(news!==undefined){       
        console.log(news);
      }
    });
    this.actionSubscriptions.push(this.catchAction());
  }

  ngOnDestroy(): void {
    this.actionSubscriptions.forEach(as => as.unsubscribe());
  }

 catchAction(){
  return this.newsService.getAllNews().subscribe(news => {
    if(news!==undefined){
      this.news = news;
      console.log(this.news);
    }
  });
 }

}
