import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slide-basic',
  templateUrl: './slide-basic.component.html',
  styleUrls: ['./slide-basic.component.scss']
})
export class SlideBasicComponent implements OnInit {
  @Input('imageSrc') src:string='';
  constructor() { }

  ngOnInit(): void {
  }

}
