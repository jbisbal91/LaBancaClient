import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsRootComponent } from './news-root.component';

describe('NewsRootComponent', () => {
  let component: NewsRootComponent;
  let fixture: ComponentFixture<NewsRootComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsRootComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
