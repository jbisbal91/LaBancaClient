import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsService } from 'app/app-news/services/news.service';
import { DateService } from 'app/app-common/services/date.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit,OnDestroy {

  selectedNews!: any;
  selectedNewsSubscriptions: Subscription[] = [];
  constructor(
    private newsService: NewsService,
    private dateService: DateService
  ) { }

  ngOnInit(): void {
    this.selectedNewsSubscriptions.push(this.catchSelectedNews());
  }

  ngOnDestroy(): void {
    this.selectedNewsSubscriptions.forEach(as => as.unsubscribe());
  }

  catchSelectedNews(){
    return this.newsService.selectedNews$.subscribe(_selectedNews => {
      if(_selectedNews!==null){
        this.selectedNews = _selectedNews;
        console.log('NewsDetailsComponent: '+this.selectedNews.content);
      }
    })
  }

  getFormattedDate(date: string): string {
    return this.dateService.toShortDate(date);
  }

  adjustContent(content: any){
    return content.replace(/<[^>]*>?/g, '');
   }

}
