import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TodoComponent } from './components/todo/todo.component';
import { GameCardComponent } from './shared/animations/game-card/game-card.component';
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
import { UserResolver } from './services/user.resolver';
import { AddRoleToUserComponent } from './components/add-role-to-user/add-role-to-user.component';
import { AdminServiceGuard } from './services/admin-service.guard';
import { ManagerServiceGuard } from './services/manager-service.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard],
  },

  { path: 'home', component: HomeComponent }, // public no-login
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AdminServiceGuard],
  }, // administrator role
  {
    path: 'authorize',
    component: AddRoleToUserComponent,
    canActivate: [AdminServiceGuard],
    resolve: { users: UserResolver },
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canLoad: [AdminServiceGuard],
  }, // // user profile
  {
    path: 'list-logs',
    component: LoglistComponent,
    canActivate: [AdminServiceGuard],
  }, // administrator role
  {
    path: 'assign-task',
    component: SchedulerComponent,
    canActivate: [ManagerServiceGuard],
  }, // manager role
  {
    path: 'monthly-analyze',
    component: ReportThisMonthComponent,
    canActivate: [ManagerServiceGuard],
  }, // manager role
  {
    path: 'yearly-analyze',
    component: ReportThisYearComponent,
    canActivate: [ManagerServiceGuard],
  }, // manager role
  { path: 'todo', component: TodoComponent }, // salesperson role
  { path: 'product-list', component: ProductListComponent }, // salesperson role
  {
    path: 'pipeline',
    component: PipelinesComponent,
    canActivate: [AuthGuard],
  }, // manager, salesperson
  { path: 'add-client', component: AddClientComponent }, // salesperson role

  {
    path: 'personal',
    children: [
      { path: 'contact-customer', component: ContactCustomerComponent },
      { path: 'order-review', component: OrderQueryComponent },
    ],
  }, // salesperson role

  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'cart/print/:orderHeaderId',
    component: PrintInvoiceComponent,
    canActivate: [AuthGuard],
  },
  { path: 'routine', component: RoutineComponent, canActivate: [AuthGuard] },
  {
    path: 'email-to-us',
    component: EmailToUsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'find-store',
    component: FindStoreComponent,
    canActivate: [AuthGuard],
  },
  { path: 'game-card', component: GameCardComponent }, // technique features
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
