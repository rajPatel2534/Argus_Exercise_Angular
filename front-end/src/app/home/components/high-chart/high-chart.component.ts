import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.css']
})
export class HighChartComponent implements OnInit {
  chart : any;
  options: any = {
    chart: {
      type: 'column',
      backgroundColor: {
        linearGradient: [0, 0, 500, 500],
        stops: [
            [0, 'rgb(255, 255, 255)'],
            [1, 'rgb(240, 240, 255)']
            ]
    },
    borderWidth: 1,
    plotBackgroundColor: 'rgba(255, 255, 255, .9)',
    plotShadow: true,
    plotBorderWidth: 1,
    borderColor : '#832e5b'

  },
  title: {
      text: 'Projects Report'
  },
  xAxis: {
      categories: ['January','February','March','April']
  },
  yAxis: {
      title: {
          text: 'Projects'
      }
  },
  series: [{
      name: 'No. Of Projects ',
      data: [100,120,110,220],
      color : '#832e5b'
    }]
  }

  constructor() { }

  ngOnInit() {

  this.chart =   Highcharts.chart('chart-container', this.options);
    setInterval(() => {
      this.chart.series[0].setData([Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100),Math.floor(Math.random()*100)]);
    }, 3000);
  }

}
