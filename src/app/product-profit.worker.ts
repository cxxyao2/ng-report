/// <reference lib="webworker" />
import { Observable, of, BehaviorSubject } from 'rxjs';
export function createReportData(counter = 1000): Observable<number> {
  let my = 0;
  for (let i = 0; i < counter; i++) {
    my += i;
  }
  return of(my);
}

addEventListener('message', ({ data }) => {
  let result = 0;
  createReportData(data).subscribe((return1) => {
    result = return1;
  });
  const response = `custom worker response to ${result}`;
  postMessage(response);
});
