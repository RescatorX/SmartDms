import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { } from 'ng2-charts';

import { StatChartEntity } from '../../../entities';

import * as $ from 'jquery';

@Component({
  selector: 'stat-chart',
  templateUrl: 'stat-chart.component.html',
  styleUrls: ['./stat-chart.component.scss']
})

export class StatChartComponent {

  @Input() public title: string = "";
  @Input() public chartWidth: number = 1000;
  @Input() public chartHeight: number = 200;
  @Input() public data: StatChartEntity[] = [];

  public chartColors: Array<any>;
  public chartOptions: any = { responsive: true, legend: { position: 'left' } };
  public chartLegend: boolean = true;
  public chartType: string = 'doughnut';

  public chartData: Array<any> = [];
  public chartLabels: Array<any> = [];

  public brandPrimary: string = '#20a8d8';

  constructor(public datePipe: DatePipe) { }

  ngOnInit() {
    //console.log("Init chart of: " + this.title);

    $("div.chart-div").css("width", this.chartWidth + "px").css("height", this.chartHeight + "px");

    var labels: string[] = [];
    var values: number[] = [];
    var colors: string[] = [];

    this.data.forEach(d => {
      labels.push(d.type);
      values.push(d.value);
      colors.push(d.color);
    });

    this.chartLabels = labels;
    this.chartData = [];
    this.chartData.push({ data: values, label: this.title });
    this.chartColors = [];
    this.chartColors.push({ backgroundColor: colors });
    /*
            this.chartColors = [
                {
                    backgroundColor: [
                      'rgba(110, 114, 20, 1)',
                      'rgba(118, 183, 172, 1)',
                      'rgba(0, 148, 97, 1)',
                      'rgba(129, 78, 40, 1)',
                      'rgba(129, 199, 111, 1)'
                  ]
                }
            ];
    */
  }

  chartClicked(event) {
    console.log("Clicked: " + JSON.stringify(event));

    if (event.active && (event.active.length > 0)) {
      const chart = event.active[0]._chart;
      const activePoints = chart.getElementAtEvent(event.event);
      if (activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value)
      }
    }
  }

  chartHovered(event) {
    console.log("Hovered: " + JSON.stringify(event));
  }
}
