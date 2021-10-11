import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { CookieService } from 'ngx-cookie-service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';

import {
  HttpClientModule,
  HttpClientJsonpModule,
  HTTP_INTERCEPTORS,
  HttpClientXsrfModule,
} from '@angular/common/http';
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
import { GameCardComponent } from './shared/animations/game-card/game-card.component';
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
import { EmailToUsComponent } from './components/email-to-us/email-to-us.component';
import { TechnicalSupportComponent } from './components/technical-support/technical-support.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { AddRoleToUserComponent } from './components/add-role-to-user/add-role-to-user.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';
import { DataListComponent } from './shared/data-list/data-list.component';
import { CookiePopupComponent } from './components/cookie-popup/cookie-popup.component';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { FooterComponent } from './components/footer/footer.component';
import { PipelinesComponent } from './components/pipelines/pipelines.component';
import { httpInterceptorProviders } from './interceptors';
import { XsrftokenInterceptor } from './interceptors/xsrftoken.interceptor';
import { UniqueUserDirective } from './shared/unique-user.directive';
import { UniquePasswordDirective } from './shared/unique-password.directive';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ErrorComponent } from './components/error/error.component';
import { PipelineAuthorizedComponent } from './components/pipeline-authorized/pipeline-authorized.component';
import { PipelineAllComponent } from './components/pipeline-all/pipeline-all.component';
import { SuccessComponent } from './components/success/success.component';
import { ReportThisMonthComponent } from './components/report-this-month/report-this-month.component';
import { ReportThisYearComponent } from './components/report-this-year/report-this-year.component';
import { OrderQueryComponent } from './components/order-query/order-query.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { AddProductDetailsComponent } from './components/add-product-details/add-product-details.component';
import { ContactCustomerComponent } from './components/contact-customer/contact-customer.component';
import { AnimateCardComponent } from './shared/animations/animate-card/animate-card.component';
import { AnimateCardListComponent } from './shared/animations/animate-card-list/animate-card-list.component';
import { SlideShowsComponent } from './components/slide-shows/slide-shows.component';

@NgModule({
  declarations: [
    AddClientComponent,
    AppComponent,
    AboutComponent,
    AddProductComponent,
    AddRoleToUserComponent,
    CalendarComponent,
    ConfirmComponent,
    CookiePopupComponent,
    ChangePasswordComponent,
    CartComponent,
    CartItemComponent,
    ChipsMultiSelectComponent,
    DashboardComponent,
    DataListComponent,
    EmailToUsComponent,
    ErrorComponent,
    ForgetPasswordComponent,
    FooterComponent,
    FindStoreComponent,
    GameCardComponent,
    HomeComponent,
    InfiniteListComponent,
    LoginComponent,
    LoglistComponent,
    LogfilterComponent,
    MenuListItemComponent,
    OrderQueryComponent,
    PipelineAuthorizedComponent,
    PipelineAllComponent,
    PageNotFoundComponent,
    ProductItemComponent,
    PrintInvoiceComponent,
    ProductListComponent,
    PipelinesComponent,
    RoutineComponent,
    ResetPasswordComponent,
    ReportThisMonthComponent,
    ReportThisYearComponent,
    SuccessComponent,
    SearchBoxComponent,
    ScrollToTopComponent,
    TodoComponent,
    SchedulerComponent,
    SignUpComponent,
    TechnicalSupportComponent,
    UniqueUserDirective,
    UniquePasswordDirective,
    WishListComponent,
    AddProductDetailsComponent,
    ContactCustomerComponent,
    AnimateCardComponent,
    AnimateCardListComponent,
    SlideShowsComponent,
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
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-XSRF-TOKEN',
    }),
    MaterialModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'),
    }),
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
  ],
  providers: [CookieService, httpInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
