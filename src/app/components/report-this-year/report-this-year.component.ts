import {
  AfterViewInit,
  OnInit,
  Component,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';

import * as fileConvert from 'src/app/utils/file-convert.util';
import { createYearlyMockData, MockOrder } from 'src/app/utils/make-mock-data';
import { CreateGraphDataService } from 'src/app/services/create-graph-data.service';

export interface PeriodicElement {
  position: number;
  orderDate: Date;
  productName: string;
  customerName: string;
  amount: number;
  salespersonName: string;
}

export interface PieItem {
  value: number;
  name: string;
}

// line graph, bar graph
export interface GraphData {
  xAxisData: string[];
  seriesData: number[];
}
@Component({
  selector: 'app-report-this-year',
  templateUrl: './report-this-year.component.html',
  styleUrls: ['./report-this-year.component.scss'],
})
export class ReportThisYearComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  destroy$: Subject<void> = new Subject<void>();
  productData?: Array<any>;
  customerData?: any;
  salespersonData?: any;
  initSalesData?: Array<any>;
  elementData: PeriodicElement[] = [];
  errorMessage = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  queryDate = new Date();
  pieData: PieItem[] = []; // product
  barData: GraphData = { xAxisData: [], seriesData: [] };
  lineData: GraphData = { xAxisData: [], seriesData: [] };
  pieOptions: any;

  initOpts = {
    renderer: 'svg',
    width: 300,
    height: 300,
  };
  lineOptions?: EChartsOption;

  barOptions?: EChartsOption;

  displayedColumns: string[] = [
    'position',
    'date',
    'product',
    'customer',
    'amount',
    'sales',
  ];
  dataSource?: MatTableDataSource<PeriodicElement>;
  dataCreateOption = '';

  constructor(private dataService: CreateGraphDataService) {}

  ngOnInit(): void {}

  private clearAllData() {
    this.productData = undefined;
    this.customerData = undefined;
    this.salespersonData = undefined;
    this.initSalesData = undefined;
    this.elementData = [];
    this.errorMessage = '';

    this.pieData = []; // product
    this.barData = { xAxisData: [], seriesData: [] };
    this.lineData = { xAxisData: [], seriesData: [] };
    this.pieOptions = undefined;

    this.lineOptions = undefined;
    this.barOptions = undefined;
    this.dataSource = undefined;
  }

  private getDataFromFunction(counter: number) {
    this.clearAllData();
    console.log('fucntion begin', new Date());
    const year = this.queryDate.getFullYear();
    const month = this.queryDate.getMonth();
    const data = createYearlyMockData(counter);
    this.productData = data.productsData;
    this.customerData = data.customersData;
    this.salespersonData = data.salesData;
    this.initSalesData = data.initOrders;
    this.setProductData();
    this.setCustomerData();
    this.setSalespersonData();
    this.setInitSaleData();
    console.log('fucntion end', new Date());
  }

  private getDataFromWorker(counter: number) {
    this.clearAllData();
    console.log('workder start', new Date());
    const year = this.queryDate.getFullYear();
    const month = this.queryDate.getMonth();
    this.dataService
      .createProductData(counter)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('data is ', data);
        this.productData = data.productsData;
        this.customerData = data.customersData;
        this.salespersonData = data.salesData;
        this.initSalesData = data.initOrders;
        this.setProductData();
        this.setCustomerData();
        this.setSalespersonData();
        this.setInitSaleData();
      });
    console.log('worker end', new Date());
    // this.dataService.createProductData(10000).subscribe(
    //   (data: any) => {
    //     this.productData = data.productsData;
    //     this.customerData = data.customersData;
    //     this.salespersonData = data.salesData;
    //     this.initSalesData = data.initOrders;
    //     this.setProductData();
    //     this.setCustomerData();
    //     this.setSalespersonData();
    //     this.setInitSaleData();
    //   },
    //   (err) => {
    //     this.errorMessage = err;
    //     setTimeout(() => {
    //       this.errorMessage = '';
    //     }, 3000);
    //   }
    // );
  }

  private setInitSaleData() {
    if (this.initSalesData && this.initSalesData.length > 0) {
      this.elementData = [...this.initSalesData];
      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  private setProductData() {
    if (this.productData && this.productData.length > 0) {
      this.pieData = [...this.productData];
      this.setPieData();
    }
  }

  private setPieData() {
    // pie
    this.pieOptions = {
      tooltip: {
        trigger: 'item',
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data: this.pieData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };
  }

  private setCustomerData() {
    // bar
    if (this.customerData && this.customerData.names.length > 0) {
      const data = { ...this.customerData };
      this.barData = { xAxisData: data.names, seriesData: data.amounts };
      this.setBarData();
    }
  }

  private setBarData() {
    this.barOptions = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: this.barData?.xAxisData,
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Counters',
          type: 'bar',
          barWidth: '60%',
          data: this.barData?.seriesData,
        },
      ],
    };
  }

  private setSalespersonData() {
    // line
    if (this.salespersonData && this.salespersonData.names.length > 0) {
      const data = { ...this.salespersonData };

      this.lineData = { xAxisData: data.names, seriesData: data.amounts };
      this.setLineData();
    }
  }

  setLineData() {
    this.lineOptions = {
      xAxis: {
        type: 'category',
        data: this.lineData?.xAxisData,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: this.lineData?.seriesData,
          type: 'line',
        },
      ],
    };
  }

  ngAfterViewInit() {}

  downloadData() {
    // PeriodicElement
    const initData = [...this.elementData];
    if (!(initData && initData.length >= 1)) {
      return;
    }
    const output = [];
    const fields = Object.keys(initData[0]);
    output.push(fields);
    initData.forEach((row) => {
      let rowData = [];
      for (const [key, value] of Object.entries(row)) {
        rowData.push(value);
      }
      output.push(rowData);
    });

    const csvFileData = fileConvert.makeCSV(output);
    const fileName = 'initSalesData';
    fileConvert.saveBlobtoLocalFile(csvFileData, fileName + '.csv', 'text/csv');
  }

  createData() {
    const counter1 = 999;
    const counter2 = 888;
    if (this.dataCreateOption === 'worker') {
      this.getDataFromWorker(counter1);
    }

    if (this.dataCreateOption === 'func') {
      this.getDataFromFunction(counter2);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
