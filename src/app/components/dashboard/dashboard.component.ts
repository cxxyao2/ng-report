import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
export interface gridTitleElement {
  title: string;
  cols: number;
  rows: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  cards: gridTitleElement[] = [];
  /** Based on the screen size, switch from standard to one column per row */
  user!: User;
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authSrv: AuthService,
    private userSrv: UserService
  ) {}

  ngOnInit() {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(
        map(({ matches }) => {
          if (matches) {
            this.cards = [
              { title: 'About me', cols: 2, rows: 1 },
              { title: 'Pipeline', cols: 2, rows: 1 },
              { title: 'Logs', cols: 2, rows: 1 },
              { title: 'Sales', cols: 2, rows: 1 },
            ];
          } else {
            this.cards = [
              { title: 'About me', cols: 2, rows: 1 },
              { title: 'Pipeline', cols: 1, rows: 1 },
              { title: 'Logs', cols: 1, rows: 2 },
              { title: 'Sales', cols: 1, rows: 1 },
            ];
          }
        })
      )
      .subscribe();

    let userId = '';
    userId = this.authSrv.currentUser?._id || '';

    this.userSrv.getUser(userId).subscribe((data) => {
      this.user = data;
    });
  }
}
