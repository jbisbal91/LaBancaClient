import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { NewsService } from 'app/app-news/services/news.service';
import { DateService } from 'app/app-common/services/date.service';
import { DeleteItemComponent } from 'app/shared/components/delete-item/delete-item.component';
import { DeleteItemService } from 'app/shared/components/delete-item/service/delete-item.service';
import { FormControl } from '@angular/forms';
import { LocalStorageService } from 'app/app-core/services/local-storage.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit,OnDestroy {
  description = new FormControl();
  _description :any;
  isEdit = false;
  srcImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRBhTyGxLk3vpmRRkC6qx1nLT4ho6ZeWIiOKDva7X4gxzhRGxHQT3hLNhRbJkJtnk13Bc&usqp=CAU';
  selectedNews!: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectedNewsSubscriptions: Subscription[] = [];
  constructor(
    private newsService: NewsService,
    private dateService: DateService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewsDetailsComponent>,
    private dialog: MatDialog,
    private ls: LocalStorageService,
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
        this._description = _selectedNews.content;
        this.srcImg = this.srcImg = this.getUrl(_selectedNews.imagen_titulo.url);     
        console.log('NewsDetailsComponent: '+this.selectedNews.content);
      }
    })
  }

getUrl(value: string):string{
  if(value!==undefined){
    return value;
  }else{
    return this.srcImg;
  }
}

sizeErrorMessage() {
  this._snackBar.open('La imagen es muy grande', '¡Inténtalo de nuevo!', {
      duration: 3000,
      panelClass: ['format-error-snackbar', 'format-error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
  });
}

formatErrorMessage() {
  this._snackBar.open('El formato del archivo no es correcto', '¡Inténtalo de nuevo!', {
      duration: 3000,
      panelClass: ['format-error-snackbar', 'format-error'],
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
  });
}

onFileChange(evt: any) {
  if (evt.target.files[0].type === "image/jpeg" || evt.target.files[0].type === "image/png") {
    if(evt.target.files[0].size >= 20000){
      this.sizeErrorMessage();
      return;
    }
    const target: DataTransfer = <DataTransfer>evt.target;
    if (target.files.length !== 1)
      throw new Error("Cannot use multiple files");
    const reader: FileReader = new FileReader();
    reader.addEventListener("load", () => {
      this.ls.setItem("recent-image", reader.result);
      this.srcImg = this.ls.getItem("recent-image");
    });
    reader.readAsDataURL(evt.target.files[0]);
  } else {
    this.formatErrorMessage();
    return;
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
  var imagen_titulo ={
    url:this.srcImg
  }
  this.selectedNews.content = this._description;
  this.selectedNews.imagen_titulo = imagen_titulo;
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
