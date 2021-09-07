import { createProductProfitData } from './utils/create-mock-data.utils';

addEventListener('message', ({ data }) => {
  let result;
  createProductProfitData(data).subscribe(
    (graphData) => (result = graphData),
    (err) => console.log('error is ', err),
    () => {
      console.log('create data process is completed');
    }
  );
  postMessage(result);
});
