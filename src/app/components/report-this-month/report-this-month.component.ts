import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { ReportsService } from 'src/app/services/reports.service';
import { zip } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';

import * as fileConvert from 'src/app/utils/file-convert.util';

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
  selector: 'app-report-this-month',
  templateUrl: './report-this-month.component.html',
  styleUrls: ['./report-this-month.component.scss'],
})
export class ReportThisMonthComponent implements OnInit, AfterViewInit {
  productData?: Array<any>;
  customerData?: Array<any>;
  salespersonData?: Array<any>;
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
  LineOptions!: EChartsOption;

  barOptions!: EChartsOption;

  displayedColumns: string[] = [
    'position',
    'date',
    'product',
    'customer',
    'amount',
    'sales',
  ];
  dataSource?: MatTableDataSource<PeriodicElement>;

  constructor(private dataService: ReportsService) {}

  ngOnInit(): void {
    const year = this.queryDate.getFullYear();
    const month = this.queryDate.getMonth();
    zip(
      this.dataService.getSpecificMonthProductSalesData(year, month),
      this.dataService.getSpecificMonthCustomerSalesData(year, month),
      this.dataService.getSpecificMonthSalespersonSalesData(year, month),
      this.dataService.getSpecificMonthInitSalesData(year, month)
    ).subscribe(
      (data) => {
        this.productData = data[0];
        this.customerData = data[1];
        this.salespersonData = data[2];
        this.initSalesData = data[3];

        this.setProductData();
        this.setCustomerData();
        this.setSalespersonData();
        this.setInitSaleData();
      },
      (err) => {
        this.errorMessage = err;
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  private setInitSaleData() {
    if (this.initSalesData && this.initSalesData.length > 0) {
      this.initSalesData.forEach((initOrder, index) => {
        this.elementData.push({
          position: index + 1,
          orderDate: initOrder.createDate,
          productName: initOrder.products_info.name,
          customerName: initOrder.customers_info.name,
          amount: initOrder.amount,
          salespersonName: initOrder.salespersons_info.name,
        });
      });

      this.dataSource = new MatTableDataSource(this.elementData);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  private setProductData() {
    if (this.productData && this.productData.length > 0) {
      const data = [...this.productData];
      if (data && data.length > 0) {
        this.pieData = [];

        data.forEach((item: any) => {
          this.pieData.push({
            name: item._id.productName,
            value: item.totalAmount,
          });
        });
        this.setPieData();
      }
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
    if (this.customerData && this.customerData.length > 0) {
      const data = [...this.customerData];
      if (data && data.length > 0) {
        let xData: string[] = [];
        let seriesData: number[] = [];
        data.forEach((item: any) => {
          xData.push(item._id.customerName);
          seriesData.push(item.totalAmount);
        });
        this.barData = { xAxisData: xData, seriesData: seriesData };

        this.setBarData();
      }
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
    if (this.salespersonData && this.salespersonData.length > 0) {
      const data = [...this.salespersonData];
      if (data && data.length > 0) {
        let xData: string[] = [];
        let seriesData: number[] = [];
        data.forEach((item: any) => {
          xData.push(item._id.salespersonName);
          seriesData.push(item.totalAmount);
        });
        this.lineData = { xAxisData: xData, seriesData: seriesData };
        this.setLineData();
      }
    }
  }

  setLineData() {
    this.LineOptions = {
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
}
