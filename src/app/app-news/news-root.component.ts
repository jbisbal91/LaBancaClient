import { Component, ElementRef, OnInit, ViewChild,HostListener } from '@angular/core';

@Component({
  selector: 'app-news-root',
  templateUrl: './news-root.component.html',
  styleUrls: ['./news-root.component.scss']
})
export class NewsRootComponent implements OnInit {
  isScrolled = false;
  @ViewChild('scroll') scroll: ElementRef;
  @HostListener("wheel", ["$event"])
  public onScroll(event: WheelEvent) {
    if(this.scroll.nativeElement.scrollTop >= 100){
      this.isScrolled = true;
     }else{
      this.isScrolled = false;
     }
  }

  constructor() { }

  ngOnInit(): void {
  }


  scrollTop(){
    this.scroll.nativeElement.scrollTop = 0;
    this.isScrolled = false;
    }

}
