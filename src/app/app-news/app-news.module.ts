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
import {MatGridListModule} from '@angular/material/grid-list'; 

import { NewsCardComponent } from './components/news-card/news-card.component';
import { NewsCardListComponent } from './components/news-card-list/news-card-list.component';
import { NewsContainerComponent } from './components/news-container/news-container.component';
import { NewsRootComponent } from './news-root.component';
import { NewsDetailsComponent } from './components/news-details/news-details.component';
import { NewsAddComponent } from './components/news-add/news-add.component';


@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
   
    FlexLayoutModule,
    ChartsModule,
    NgxEchartsModule,
    NgxDatatableModule,
    SharedPipesModule,
    PerfectScrollbarModule,
    RouterModule.forChild(AppNewsRoutes)
  ],
  declarations: [NewsRootComponent,NewsContainerComponent,NewsCardListComponent,NewsCardComponent, NewsDetailsComponent, NewsAddComponent],
  exports: [NewsRootComponent,NewsContainerComponent,NewsCardListComponent,NewsCardComponent, NewsDetailsComponent, NewsAddComponent]
})
export class AppNewsModule { }
