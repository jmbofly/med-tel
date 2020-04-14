import { Component, OnInit, Input } from '@angular/core';
import { Chart, ChartOptions, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() element: string = 'chartWrapper';
  @Input() type: ChartType;
  @Input() data: ChartData;
  @Input() options: ChartOptions;
  chart: Chart;

  constructor() { }

  ngOnInit(): void {
    const elName = this.element, type = this.type, data = this.data, options = this.options; 
    setTimeout(() => {
      this.buildChart(elName, type, data, options);
      console.log('chart', this.chart);
    }, 0);
  }

  buildChart(elName: string, type: ChartType = 'polarArea', data: ChartData, options?: ChartOptions) {
    this.chart = new Chart(elName, {
      type,
      data,
      options
    })
  }

}
