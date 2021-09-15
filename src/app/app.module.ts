import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxEchartsModule } from 'ngx-echarts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';

import { AboutComponent } from './about/about.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { CartComponent } from './components/./shopping-cart/cart/cart.component';
import { ChipsMultiSelectComponent } from './shared/chips-multi-select/chips-multi-select.component';
import { CartItemComponent } from './components/shopping-cart/cart/cart-item/cart-item.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { InfiniteListComponent } from './components/infinite-list/infinite-list.component';
import { TodoComponent } from './components/todo/todo.component';
import { FindStoreComponent } from './components/find-store/find-store.component';
import { GameCardComponent } from './animations/game-card/game-card.component';
import { LoglistComponent } from './components/loglist/loglist.component';
import { LogfilterComponent } from './components/logfilter/logfilter.component';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { MenuListItemComponent } from './components/toolbar/menu-list-item/menu-list-item.component';
import { PrintInvoiceComponent } from './components/shopping-cart/print-invoice/print-invoice.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductItemComponent } from './components/./shopping-cart/product-item/product-item.component';
import { ProductListComponent } from './components/./shopping-cart/product-list/product-list.component';
import { RoutineComponent } from './components/routine/routine.component';
import { SearchBoxComponent } from './components/toolbar/search-box/search-box.component';
import { ScrollToTopComponent } from './components/scroll-to-top/scroll-to-top.component';
import { WishListComponent } from './components/shopping-cart/wish-list/wish-list.component';
import { ReportByProductsComponent } from './components/report-by-products/report-by-products.component';
import { EmailToUsComponent } from './components/email-to-us/email-to-us.component';
import { TechnicalSupportComponent } from './components/technical-support/technical-support.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddRoleToUserComponent } from './components/add-role-to-user/add-role-to-user.component';
import { ReportByEmployeeComponent } from './components/report-by-employee/report-by-employee.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { DataListComponent } from './shared/data-list/data-list.component';
import { CookiePopupComponent } from './cookie-popup/cookie-popup.component';
import { ClientsComponent } from './components/clients/clients.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
    DashboardComponent,
    TodoComponent,
    SearchBoxComponent,
    GameCardComponent,
    MenuListItemComponent,
    CartComponent,
    ProductItemComponent,
    ProductListComponent,
    CartItemComponent,
    WishListComponent,
    ScrollToTopComponent,
    PrintInvoiceComponent,
    LoglistComponent,
    LogfilterComponent,
    InfiniteListComponent,
    ChipsMultiSelectComponent,
    AddClientComponent,
    RoutineComponent,
    FindStoreComponent,
    ReportByProductsComponent,
    EmailToUsComponent,
    TechnicalSupportComponent,
    SchedulerComponent,
    AddProductComponent,
    AddRoleToUserComponent,
    ReportByEmployeeComponent,
    CalendarComponent,
    ConfirmComponent,
    DataListComponent,
    CookiePopupComponent,
    ClientsComponent,
    LoginComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClipboardModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    HttpClientModule,
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
