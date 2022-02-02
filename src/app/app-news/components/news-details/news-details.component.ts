import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { NewsService } from 'app/app-news/services/news.service';
import { DateService } from 'app/app-common/services/date.service';
import { DeleteItemComponent } from 'app/shared/components/delete-item/delete-item.component';
import { DeleteItemService } from 'app/shared/components/delete-item/service/delete-item.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit,OnDestroy {
  description = new FormControl();
  _description :any;
  isEdit = false;
  selectedNews!: any;
  selectedNewsSubscriptions: Subscription[] = [];
  constructor(
    private newsService: NewsService,
    private dateService: DateService,
    public dialogRef: MatDialogRef<NewsDetailsComponent>,
    private dialog: MatDialog,
    private deleteItemService: DeleteItemService
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

getUrl(value: string):string{
  if(value!==undefined){
    return value;
  }else{
    return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBhTyGxLk3vpmRRkC6qx1nLT4ho6ZeWIiOKDva7X4gxzhRGxHQT3hLNhRbJkJtnk13Bc&usqp=CAU';
  }
}




  getFormattedDate(date: string): string {
    return this.dateService.toShortDate(date);
  }

  adjustContent(content: any){
    return content.replace(/<[^>]*>?/g, '');
   }

   deleteNews(idNews:number){
    this.dialogRef.close();
      this.deleteItemService.setSelectedNewsId(idNews);
      const dialogRef = this.dialog.open(DeleteItemComponent);
      dialogRef.afterClosed().subscribe((result) => {
        console.log(`Dialog result: ${result}`);
        if(result === true){
          this.dialogRef.close();
        }else{
          const dialogRef = this.dialog.open(NewsDetailsComponent,{
            width: '35vw'
          });
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
        }
      });
 }

 onDescriptionChange(event:any){
  console.log(event);
  this._description = event;
 }

 updateNews(){
  this.selectedNews.content = this._description;
  this.newsService.updateNews(this.selectedNews);
   console.log(this.selectedNews)
 }

 modeEdit(){
  this.isEdit = true;
 }

 modeEditOff(){
  this.isEdit = false;
 }

}
