import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-news-card-list',
  templateUrl: './news-card-list.component.html',
  styleUrls: ['./news-card-list.component.scss']
})
export class NewsCardListComponent implements OnInit {
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

  constructor() { 
    this.getScreenSize();
  }

  ngOnInit(): void {
  }

}
