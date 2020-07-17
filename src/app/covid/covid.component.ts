  import { Component, OnInit, ViewChild, TemplateRef, ElementRef, HostListener, ChangeDetectionStrategy } from '@angular/core';
  import { Observable } from 'rxjs';
import { Columns, Config, DefaultConfig, API, APIDefinition } from 'ngx-easy-table';
  import {Chart, ChartConfiguration, ChartData, ChartOptions} from 'chart.js';
  import { STATES_HASH } from '../core/data/states';
  import { APIData } from './covid.interface';
  import { ChartComponent } from '../shared/chart/chart.component';
  import { CovidUpdateService } from './covid-update.service';

@Component({
  selector: 'app-covid',
  templateUrl: './covid.component.html',
  styleUrls: ['./covid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CovidComponent implements OnInit {
  @ViewChild('table') table: APIDefinition;

  chart: Chart;
  showChart = true;
  states = STATES_HASH.sort();
  defaultChartOptions: ChartOptions;
  defaultChartData: ChartData;
  chartData: any;
  data: APIData = {};
  data$: Observable<APIData>;
  selectedState: string;
  apiData: APIData[];;
  configuration: Config;
  columns: Columns[];
  currentDate: Date = new Date();
  
  constructor(private covidUpdates: CovidUpdateService) { }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig, draggable: true };
    this.configuration.isLoading = true;
    this.columns = [
      { key: 'USAState', title: 'State' },
      { key: 'TotalCases', title: 'Total Cases' },
      { key: 'NewCases', title: 'New Cases' },
      { key: 'TotalDeaths', title: 'Total Deaths' },
      { key: 'NewDeaths', title: 'New Deaths' },
      { key: 'ActiveCases', title: 'Active Cases' },
      { key: 'TotalTests', title: 'Total Tests' },
      /* { key: 'Tot_Cases_1M_Pop', title: 'Cases Pop. 1 million' },
      { key: 'Deaths_1M_Pop', title: 'Deaths Pop. 1 million' },
      { key: 'NewDeaths', title: 'Tests Pop. 1 million' }, */
    ];
    this.covidUpdates.getData('CasesInAllUSStates')
      .subscribe((data: APIData[]) => {
        setTimeout(() => {
          this.apiData = data;
          this.configuration.isLoading = false;
        }, 1500);
      });
        // Set Chart Defaults
        //   this.defaultChartData = {
        //     labels: ['Cases', 'Tests', 'Deaths'],
        //     datasets: [
        //       {
        //         label: `${this.data.USAState} Data`,
        //         data: [],
        //         backgroundColor: [
        //           'rgba(255, 99, 132, 0.2)',
        //           'rgba(255, 255, 150, 0.2)',
        //           'rgba(54, 162, 235, 0.2)',
        //         ],
        //         // borderColor: [
        //         //   'rgba(255, 99, 132, 1)',
        //         //   'rgba(255, 255, 150, 1)',
        //         //   'rgba(54, 162, 235, 1)',
        //         // ],
        //         borderWidth: 1
        //       }
        //     ],
        //   };
        //   this.defaultChartOptions = {
        //     responsive: true,
        //     title: {
        //       display: true,
        //       text: ``,
        //     },
        //     scales: {
        //       yAxes: [{
        //         ticks: {
        //           beginAtZero: true
        //         }
        //       }]
        //     }
        //   };
        //   this.selectState('Ohio', data);
        //   setTimeout(() => {
        //   this.chart = this.getChart();
        // }, 0)

  }

  selectState(name: string, data?: APIData[]) {
    if (data && data.length) {
      this.data = this.getStateData(name, data);
    } else {
      this.data = this.getStateData(name);
    }
    const { TotalCases, TotalTests, TotalDeaths } = this.data;
    const label = `COVID-19 Data for ${this.data.USAState}`;
    const datasets = [];
    datasets.push({ data: [TotalCases, TotalTests, TotalDeaths]})
    setTimeout(() => {
      // this.getChart(null, {datasets});
      this.updateChartData(this.chart, [TotalCases, TotalTests, TotalDeaths]);
    })
    console.log('state', this.data);
  }

  getStateData(state: string, data?: APIData[]) {
    return data ?
      data.filter((q, idx) => q.USAState === state)[0] :
      this.apiData.filter((q, idx) => q.USAState === state)[0];
  }

  updateChartData(chart: Chart, data: any[], label?: string) {
    if (!chart || !data) return;
    this.removeData(chart);
    if (label) { 
      chart.data.labels.push(label);
    } if (data) {
      data.map(set => {
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(set);
        });
      })
    }
    this.chart.options.title.text = `COVID-19 Data for ${this.data.USAState}`;
    chart.update();
  }

  removeData(chart: Chart) {
    if (chart) {
      chart.data.labels.pop();
      chart.data.datasets.forEach((dataset) => {
        dataset.data.pop();
      });
      chart.update();
    } else {
      return;
    }
  }

  initChart(type = 'polarArea', data = this.defaultChartData, options = this.defaultChartOptions) {
    return new Chart('chartWrapper', {
      data,
      type,
      options
    })
  }
}
