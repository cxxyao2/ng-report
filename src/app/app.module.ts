import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MaterialModule } from './material.module';

import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoComponent } from './components/todo/todo.component';
import { SearchBoxComponent } from './components/toolbar/search-box/search-box.component';
import { SearchResultsComponent } from './components/toolbar/search-results/search-results.component';
import { SearchCardComponent } from './components/toolbar/search-card/search-card.component';
import { GameCardComponent } from './animations/game-card/game-card.component';
import { MenuListItemComponent } from './components/toolbar/menu-list-item/menu-list-item.component';
import { CartComponent } from './components/./shopping-cart/cart/cart.component';
import { ProductItemComponent } from './components/./shopping-cart/product-item/product-item.component';
import { ProductListComponent } from './components/./shopping-cart/product-list/product-list.component';
import { ShippingCartComponent } from './components/./shopping-cart/shipping-cart.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { WishListComponent } from './components/shopping-cart/wish-list/wish-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    DashboardComponent,
    TodoComponent,
    SearchBoxComponent,
    SearchResultsComponent,
    SearchCardComponent,
    GameCardComponent,
    MenuListItemComponent,
    CartComponent,
    ProductItemComponent,
    ProductListComponent,
    ShippingCartComponent,
    CartItemComponent,
    WishListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
