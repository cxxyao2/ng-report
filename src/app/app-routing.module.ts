import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/shared/home/home.component';
import { AboutComponent } from './components/shared/about/about.component';
import { PageNotFoundComponent } from './components/shared/page-not-found/page-not-found.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { TodoComponent } from './components/todo/todo.component';
import { GameCardComponent } from './animations/game-card/game-card.component';
import { ProductListComponent } from './components/shopping-cart/product-list/product-list.component';
import { CartComponent } from './components/shopping-cart/cart/cart.component';
import { PrintInvoiceComponent } from './components/shopping-cart/print-invoice/print-invoice.component';
import { LoglistComponent } from './components/loglist/loglist.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'loglist', component: LoglistComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'todo', component: TodoComponent },
  { path: 'product-list', component: ProductListComponent },
  { path: 'about-me', component: AboutComponent },
  { path: 'game-card', component: GameCardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/print', component: PrintInvoiceComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
