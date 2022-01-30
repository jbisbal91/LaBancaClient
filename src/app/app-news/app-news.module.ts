import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from "@angular/flex-layout";
import { ChartsModule } from "ng2-charts";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { SharedPipesModule } from "app/shared/pipes/shared-pipes.module";
import { AppNewsRoutes } from './app-news.routing';
import {MatCardModule} from '@angular/material/card';
import { SharedMaterialModule } from 'app/shared/shared-material.module';
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";

import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsCardListComponent } from './components/news-card-list/news-card-list.component';
import { NewsContainerComponent } from './components/news-container/news-container.component';


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    MatCardModule,
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    PerfectScrollbarModule,
    RouterModule.forChild(AppNewsRoutes)
  ],
  declarations: [NewsContainerComponent,NewsCardListComponent,NewsCardComponent],
  exports: [NewsContainerComponent,NewsCardListComponent,NewsCardComponent]
})
export class AppNewsModule { }