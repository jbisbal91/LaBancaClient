import { Component, OnInit, HostListener, Input} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

import { DateService } from 'app/app-common/services/date.service';
import { NewsService } from 'app/app-news/services/news.service';
import { NewsDetailsComponent } from '../news-details/news-details.component';
@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  public _news: any;
  @Input()
  set news(value: any) {
      this._news = value;
  }

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

  constructor(
    private dateService: DateService,
    private dialog: MatDialog,
    private newsService: NewsService,) { }
 
  ngOnInit(): void {

  }
  ondblclick2(id:any){
    this.newsService.deleteNews(id);
    console.log(id);
/*
    const dialogRef = this.dialog.open(NewsDetailsComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
*/
  }


  ondblclick(news:any){
    this.newsService.sendSelectedNews(news);
    const dialogRef = this.dialog.open(NewsDetailsComponent,{
      width: '35vw'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  getFormattedDate(date: string): string {
    return this.dateService.toShortDate(date);
  }

  getUrl(value: string):string{
    if(value!==undefined){
      return value;
    }else{
      return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBhTyGxLk3vpmRRkC6qx1nLT4ho6ZeWIiOKDva7X4gxzhRGxHQT3hLNhRbJkJtnk13Bc&usqp=CAU';
    }
  }

  adjustContent(content: any){
   return content.replace(/<[^>]*>?/g, '');
  }



}
