# NgCenter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.4. In Sep 6 2021, @angular/core is upgraded to version ~12.2. @angular/material, @angular/flex-layout, @angular/google-maps all are upgraded.

- secure google map key by HTTP referrer
- prevent XSRF attack by cookie + token in http headers
- register & login with recaptcha
- deploy web worker for analyzing mass data and image. no block the main thread.
- attention to modularity && reusability
- lazy loading (1,Angular 2, Webpack ): dialog component, tab page component, administrator module
- interceptors
- guards, resolves
- light/dark themes
- i18n
- download file formats: CSV and PDF
- forget password/reset password emails, order notification email
- guard, resolve
- reusable animations
- DI( Dependency Injection): Services have different visible(usable) levels, e.g. app, component, component view etc.

## back-end : mongodb mongoose express node.js

## other importants third party packages

- ngx-echarts v7.x: show graphs and charts
- jwt-decode
- ngx-cookie-service
- pdfmake
  (These package names are self-explanatory. No extra explanation.)

## Main Functions

### Master Data Maintenance

### Contact Planning & Schedule

### Client Management

### Place order

### Analyse sales data and salesperson performance

### Offer Technical Support

## layout

- breakpoint: 800px (exceptions: login, singup formss with big images)
- Modern Layout: Grid & Flex Box
- Mobile Friendly and full responsive
- 2 Modes: Dark Mode & Light Mode
- Back to top button
- Spinner during http actions
- Error popup window

## Test Object list

- Template-driven forms
- Reactive forms
- Validators, asyncValidators
- Pipes
- Services
- Http interceptors
