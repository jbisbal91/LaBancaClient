import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-news-root',
  templateUrl: './news-root.component.html',
  styleUrls: ['./news-root.component.scss']
})
export class NewsRootComponent implements OnInit {
  @ViewChild('scroll') scroll: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  scrollTop(){
    this.scroll.nativeElement.scrollTop = 0;
    }

}
