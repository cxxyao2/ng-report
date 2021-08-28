import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TodoComponent } from './todo/todo.component';
import { ToolbarDemoComponent } from './toolbar-demo/toolbar-demo.component';
import { SearchBoxComponent } from './toolbar/search-box/search-box.component';
import { SearchResultsComponent } from './toolbar/search-results/search-results.component';
import { SearchCardComponent } from './toolbar/search-card/search-card.component';
import { GameCardComponent } from './animations/game-card/game-card.component';
import { MenuListItemComponent } from './toolbar/menu-list-item/menu-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    DashboardComponent,
    TodoComponent,
    ToolbarDemoComponent,
    SearchBoxComponent,
    SearchResultsComponent,
    SearchCardComponent,
    GameCardComponent,
    MenuListItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
