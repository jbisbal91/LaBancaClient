import { Routes } from "@angular/router";
import { NewsContainerComponent } from "./components/news-container/news-container.component";


export const AppNewsRoutes: Routes = [
  {
    path: "noticias",
    component: NewsContainerComponent
  }
];
