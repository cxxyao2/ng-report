import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
  messages = [
    { from: 'a', subject: 'aa', content: 'aa1' },
    { from: 'b', subject: 'bb', content: 'bb1' },
  ];
  constructor() {}

  ngOnInit(): void {}

  trackByPipelineId(index: number, user: any) {
    return user.id;
  }
}
