export interface MockOrder {
  position: number;
  orderDate: Date;
  productName: string;
  customerName: string;
  salespersonName: string;
  amount: number;
}

/** Constants used to fill up our data base. */
const Products: string[] = [
  'AC fertilizer',
  'AB antifreeze',
  'diesel No1',
  'PD gas',
  'WD30 diesel No2',
  'W-40 Lubricant',
  'Multi Lubricant',
];
const SalesNames: string[] = [
  'Maia',
  'Asher',
  'Olivia',
  'Atticus',
  'Amelia',
  'Jack',
  'Charlotte',
];

const Customers: string[] = [
  'Saint Laurent Hospital',
  'Juif Community',
  'Alibaba Group',
  'Nord Station',
  'Amelia Academy',
];
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ChartData } from '../models/chart-data';

/** Builds and returns a new User. */
function createNewOrder(id: number): MockOrder {
  const salesName =
    SalesNames[Math.round(Math.random() * (SalesNames.length - 1))];
  const product = Products[Math.round(Math.random() * (Products.length - 1))];
  const customer =
    Customers[Math.round(Math.random() * (Customers.length - 1))];
  const month = Math.round(Math.random() * 11);
  const today = new Date();
  const day = Math.round(Math.random() * 27);
  const date = new Date(today.getFullYear(), month, day, 0, 0, 0);
  const amount = Math.round(Math.random() * 2000);

  return {
    position: id,
    orderDate: date,
    productName: product,
    customerName: customer,
    salespersonName: salesName,
    amount,
  };
}

export function createYearlyMockData(counter = 10000) {
  // Create init orders
  const orders = Array.from({ length: counter }, (_, k) =>
    createNewOrder(k + 1)
  );

  // create product sales data array :  [{name:string, value:number}]
  const productSalesArray: Array<ChartData> = [];
  Products.forEach((product) => {
    const filterResult = orders.filter(
      (order) => order.productName === product
    );
    let productAmount = 0;
    filterResult.forEach((order) => {
      productAmount += order.amount;
    });
    productSalesArray.push({ name: product, value: productAmount });
  });

  // create customer sales data :   name:string[], amount:number[]
  const customerAmountArray: number[] = [];
  const customerNameArray: string[] = [];
  Customers.forEach((customerName) => {
    const filterResult = orders.filter(
      (order) => order.customerName === customerName
    );
    let customerAmount = 0;
    filterResult.forEach((order) => {
      customerAmount += order.amount;
    });
    customerNameArray.push(customerName);
    customerAmountArray.push(customerAmount);
  });

  // create salesperson sales data :   name:string[], amount:number[]
  const salesAmountArray: number[] = [];
  const salesNameArray: string[] = [];
  SalesNames.forEach((sname) => {
    const filterResult = orders.filter(
      (order) => order.salespersonName === sname
    );
    let salesAmount = 0;
    filterResult.forEach((order) => {
      salesAmount += order.amount;
    });

    salesNameArray.push(sname);
    salesAmountArray.push(salesAmount);
  });

  return {
    initOrders: orders,
    productsData: productSalesArray,
    customersData: { names: customerNameArray, amounts: customerAmountArray },
    salesData: { names: salesNameArray, amounts: salesAmountArray },
  };
}
