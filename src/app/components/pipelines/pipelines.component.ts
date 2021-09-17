import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
  messages = [
    {
      from: "DLL School South Branch",
      subject: 'golden',
      status: 'authorized',
    },
    {
      from: "Old Orchard Shop",
      subject: 'silver',
      status: 'unauthorized',
    },
  ];
  constructor() {}

  ngOnInit(): void {}

  trackByPipelineId(index: number, message: any) {
    return message.from;
  }

  addNewMessage() {
    const randomClient = Math.floor(Math.random() * 1000).toString();
    this.messages.push({
      from: randomClient,
      subject: randomClient,
      status: 'unauthorized',
    });
  }
}
