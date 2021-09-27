import { createYearlyMockData } from 'src/app/utils/make-mock-data';
/// <reference lib="webworker" />

// addEventListener('message', ({ data }) => {
//   const response = createYearlyMockData(data);
//   postMessage(response);
// });

addEventListener('message', ({ data }) => {
  // const response = 'xxx' + data;
  const response = createYearlyMockData(data);
  postMessage(response);
});
