import { AfterViewInit, OnInit, Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { EChartsOption } from 'echarts';
import { ReportsService } from 'src/app/services/reports.service';
import { zip } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
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

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

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

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dataService: ReportsService) {}

  ngOnInit(): void {
    zip(
      this.dataService.getSpecificMonthProductSalesData(2021, 8),
      this.dataService.getSpecificMonthCustomerSalesData(2021, 8),
      this.dataService.getSpecificMonthSalespersonSalesData(2021, 8),
      this.dataService.getSpecificMonthInitSalesData(2021, 8)
    ).subscribe((data) => {
      this.productData = data[0];
      this.customerData = data[1];
      this.salespersonData = data[2];
      this.initSalesData = data[3];

      this.setProductData();
      this.setCustomerData();
      this.setSalespersonData();
    });
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

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  downloadData() {
    // TODO
  }
}
