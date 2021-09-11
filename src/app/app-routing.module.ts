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
import { FindStoreComponent } from './components/find-store/find-store.component';
import { EmailToUsComponent } from './components/email-to-us/email-to-us.component';
import { TechnicalSupportComponent } from './components/technical-support/technical-support.component';
import { ReportByProductsComponent } from './components/report-by-products/report-by-products.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { ReportByEmployeeComponent } from './components/report-by-employee/report-by-employee.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddRoleToUserComponent } from './components/add-role-to-user/add-role-to-user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent },
  { path: 'home', component: HomeComponent }, // public no-login
  { path: 'dash', component: DashboardComponent }, // user profile
  { path: 'add-product', component: AddProductComponent }, // administrator role
  { path: 'authorize', component: AddRoleToUserComponent }, // administrator role
  { path: 'list-logs', component: LoglistComponent }, // administrator role
  { path: 'schedule', component: SchedulerComponent }, // manager role
  { path: 'by-product', component: ReportByProductsComponent }, // manager role
  { path: 'by-employee', component: ReportByEmployeeComponent }, // manager role
  {
    path: 'todo',
    children: [
      { path: 'client', component: AddClientComponent },
      { path: 'note', component: TodoComponent },
    ],
  }, // salesperson role

  { path: 'place-order', component: ProductListComponent }, // salesperson role

  { path: 'cart', component: CartComponent },
  { path: 'cart/print', component: PrintInvoiceComponent },
  { path: 'routine', component: RoutineComponent },
  {
    path: 'email-to-us',
    component: EmailToUsComponent,
    data: { animation: 'EmailPage' },
  },
  {
    path: 'find-store',
    component: FindStoreComponent,
    data: { animation: 'FindStorePage' },
  },
  {
    path: 'technical-support',
    component: TechnicalSupportComponent,
    data: { animation: 'TechnicalPage' },
  },

  { path: 'about-me', component: AboutComponent }, // very important . the profile of developer
  { path: 'game-card', component: GameCardComponent }, // technique features
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
