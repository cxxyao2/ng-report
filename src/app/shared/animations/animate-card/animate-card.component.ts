import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-animate-card',
  templateUrl: './animate-card.component.html',
  styleUrls: ['./animate-card.component.scss'],
})
export class AnimateCardComponent implements OnInit {
  @Input() imageSrc?: string;
  @Input() imageSlogan?: string;
  constructor() {}

  ngOnInit(): void {}
}
