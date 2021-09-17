import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  templateUrl: './pipelines.component.html',
  styleUrls: ['./pipelines.component.scss'],
})
export class PipelinesComponent implements OnInit {
  messages = [
    {
      from: "DLL School, Located at 1218 Street, Quebec, QC",
      subject: 'golden',
      status: 'authorized',
    },
    {
      from: "Our burgers are made with high quality, fresh beef ground daily on site and you'll taste the difference – but that's not all. Fries, poutine gravy, sauces, ..",
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
