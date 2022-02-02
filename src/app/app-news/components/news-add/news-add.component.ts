import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';

import { NewsService } from "app/app-news/services/news.service";
import { DateService } from "app/app-common/services/date.service";
import { DeleteItemComponent } from "app/shared/components/delete-item/delete-item.component";
import { DeleteItemService } from "app/shared/components/delete-item/service/delete-item.service";
import { FormControl } from "@angular/forms";
import { NewsDetailsComponent } from "../news-details/news-details.component";
import { LocalStorageService } from "app/app-core/services/local-storage.service";
import { Base64Validator } from "ngx-custom-validators/src/app/base64/directive";
import { News } from "app/app-news/models/news";

@Component({
  selector: "app-news-add",
  templateUrl: "./news-add.component.html",
  styleUrls: ["./news-add.component.scss"],
})
export class NewsAddComponent implements OnInit {
  _title :any;
  _description :any;
  srcImg: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(
    private newsService: NewsService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<NewsDetailsComponent>,
    private ls: LocalStorageService,
    private dialog: MatDialog,
    private deleteItemService: DeleteItemService
  ) {}

  ngOnInit(): void {}


  formatErrorMessage() {
    this._snackBar.open('El formato del archivo no es correcto', '¡Inténtalo de nuevo!', {
        duration: 3000,
        panelClass: ['format-error-snackbar', 'format-error'],
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
    });
}

sizeErrorMessage() {
  this._snackBar.open('La imagen es muy grande', '¡Inténtalo de nuevo!', {
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

  createNews(){
    var imagen_titulo ={
      url:this.srcImg
    }
    var news = {
      id:Math.random(),
      content:this._description,
      created_at:new Date(),
      fecha:new Date(),
      gallery_id:null,
      imagen_titulo:imagen_titulo,
      order_view:'',
      subtitulo:'',
      titulo: this._title,
      updated_at:new Date(),
      visible:true   
    }
    this.newsService.createNews(news);
  }

  onTitleChange(event:any){
    this._title = event;
   }

  onDescriptionChange(event:any){
  this._description = event;
 }

}
