# NgCenter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4. In Sep 6 2021, @angular/core is upgraded to version ~12.2. @angular/material, @angular/flex-layout, @angular/google-maps all are upgraded.

deployed on [minierm](https://ng-report.vercel.app)

## Technical Features

- secure google map key by HTTP referrer
- prevent XSRF attack by cookie + token in http headers
- authentication : register & login + authorization
- deploy web worker for analyzing mass data . No block the main thread.
- modularity && reusability
  - reusable confirm dialog
  - reusable router/card animations
- lazy loading (1,Angular 2, Webpack ): dialog component, some tab content(when activated), feature module (lazyloading + canLoad guard)
- interceptors
- guards, resolves,pipes,directives,validators
- light/dark themes
- i18n
- download file formats: CSV and PDF
- forget password/reset password emails, order notification email
- reusable animations
- dynamic views by content projection
- multiple level menus
- DI( Dependency Injection): different Service scope, e.g. app, component, component view etc.
- fxLayout, responsive images, responsive layout
- Material Design
  - table:row/expanded row/array-based datasource/observable datasource/infinite scroll table... )
  - dialog /lazy loading dialog/ reusable confirm dialog
  - tabs
  - spinner
  - select
  - expansion panel
  - datepicker
  - divider
  - stepper
  - reactive form , template-driven form, form input autocomplete, checkbox, image...
  - custom FormControl (chips group)
  - multi-slot content projection
  - drag && drop
  - ...
- SSR: server-side rendering
- Unified error and success message prompt
- Prevent memeory leak: Unsubscribe in ngOnDestroy + TakeUntil/Take
- Coding check: ng lint

## back-end : mongodb mongoose express node.js

## other importants third party packages

- ngx-echarts v7.x: show graphs and charts
- jwt-decode
- ngx-cookie-service
- pdfmake
  (These package names are self-explanatory. No extra explanation.)

## Main Functions

- Master Data Maintenance

- Contact Planning

- Pipeline Management

- Order management

- Report center: graphs and charts based on initial sales data

- Technical Support

- Home page: Announces featuring animations
- Authentication && Authorization

## layout

- breakpoint: 800px (exceptions: login, singup formss with big images)
- Modern Layout: Grid & Flex Box
- Mobile Friendly and full responsive
- 2 Modes: Dark Mode & Light Mode
- Back to top button
- Spinner during http actions
- Error popup window

## Test list

> npm i jasmine-marbles

- Template-driven forms
- Reactive forms
- Validators, asyncValidators
- Pipes
- Services
- Http interceptors
