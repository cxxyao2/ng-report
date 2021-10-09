import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
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
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddRoleToUserComponent } from './components/add-role-to-user/add-role-to-user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { AuthGuard } from './shared/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ReportThisMonthComponent } from './components/report-this-month/report-this-month.component';
import { ReportThisYearComponent } from './components/report-this-year/report-this-year.component';
import { OrderQueryComponent } from './components/order-query/order-query.component';
import { ContactCustomerComponent } from './components/contact-customer/contact-customer.component';

const routes: Routes = [
  { path: 'calendar', component: CalendarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },
  { path: 'calendar', component: CalendarComponent },
  { path: 'home', component: HomeComponent }, // public no-login
  { path: 'dashboard', component: DashboardComponent }, // user profile
  { path: 'add-product', component: AddProductComponent }, // administrator role
  { path: 'authorize', component: AddRoleToUserComponent }, // administrator role
  { path: 'list-logs', component: LoglistComponent }, // administrator role
  { path: 'assign-task', component: SchedulerComponent }, // manager role
  { path: 'monthly-analyze', component: ReportThisMonthComponent }, // manager role
  { path: 'yearly-analyze', component: ReportThisYearComponent }, // manager role
  { path: 'todo', component: TodoComponent }, // salesperson role
  { path: 'product-list', component: ProductListComponent }, // salesperson role
  { path: 'pipeline', component: PipelinesComponent }, // manager, salesperson
  { path: 'add-client', component: AddClientComponent }, // salesperson role

  {
    path: 'personal',
    children: [
      { path: 'contact-customer', component: ContactCustomerComponent },
      { path: 'order-review', component: OrderQueryComponent },
    ],
  }, // salesperson role

  { path: 'cart', component: CartComponent },
  { path: 'cart/print/:orderHeaderId', component: PrintInvoiceComponent },
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
    canActivate: [AuthGuard],
  },
  {
    path: 'technical-support',
    component: TechnicalSupportComponent,
    data: { animation: 'TechnicalPage' },
  },

  { path: 'about-me', component: AboutComponent }, // very important . the profile of developer
  { path: 'game-card', component: GameCardComponent }, // technique features
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
