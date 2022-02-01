import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import { NewsService } from 'app/app-news/services/news.service';
import { DateService } from 'app/app-common/services/date.service';
import { DeleteItemComponent } from 'app/shared/components/delete-item/delete-item.component';
import { DeleteItemService } from 'app/shared/components/delete-item/service/delete-item.service';
import { FormControl } from '@angular/forms';
import { NewsDetailsComponent } from '../news-details/news-details.component';

@Component({
  selector: 'app-news-add',
  templateUrl: './news-add.component.html',
  styleUrls: ['./news-add.component.scss']
})
export class NewsAddComponent implements OnInit {

  constructor(
    private newsService: NewsService,
    private dateService: DateService,
    public dialogRef: MatDialogRef<NewsDetailsComponent>,
    private dialog: MatDialog,
    private deleteItemService: DeleteItemService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    
  }





}
