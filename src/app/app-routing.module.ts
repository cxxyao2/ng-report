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
import { InfiniteListComponent } from './components/infinite-list/infinite-list.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { RoutineComponent } from './components/routine/routine.component';
import { componentFactoryName } from '@angular/compiler';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent },
  { path: 'loglist', component: LoglistComponent },
  { path: 'dash', component: DashboardComponent },
  {
    path: 'todo',
    children: [
      { path: 'client', component: AboutComponent },
      { path: 'note', component: TodoComponent },
    ],
  },
  { path: 'product-list', component: ProductListComponent },
  { path: 'about-me', component: AboutComponent },
  { path: 'game-card', component: GameCardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'cart/print', component: PrintInvoiceComponent },
  { path: 'routine', component: RoutineComponent },
  { path: 'add-client', component: AddClientComponent },

  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
