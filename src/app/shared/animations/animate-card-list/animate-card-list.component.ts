import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, timer } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import {
  customSlide,
  customRotate,
  customFade,
} from 'src/app/shared/animations/triggers.animations';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-animate-card-list',
  templateUrl: './animate-card-list.component.html',
  styleUrls: ['./animate-card-list.component.scss'],
  animations: [customSlide, customRotate, customFade],
})
export class AnimateCardListComponent implements OnInit, OnDestroy {
  destroy$: Subject<void> = new Subject<void>();
  antStatus = 'normal';
  noDisplay = false;
  innerWidth = 300;
  innerHeight = 400;
  darkMode = false;

  garage = './assets/garage.jpg';
  gas = './assets/gasoline.jpg';
  imageSrcTop = this.garage;
  imageSrcBottom = this.gas;
  imageSloganTop = 'Service';
  imageSloganBottom = 'Gasoline';
  imageSrc = this.imageSrcTop;
  showTop = true;
  ob1 = timer(0, 2000);
  speed = 1000;
  leaveSpeed = 2000;
  oldTop = '';

  constructor(public themeSrv: ThemeService) {}

  ngOnInit(): void {
    this.ob1
      .pipe(
        tap((data) => {
          const imageIndex = Math.ceil(Math.random() * 4);
          this.imageSrc = `./assets/animate${imageIndex}.jpg`;
          this.showTop = !this.showTop;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
