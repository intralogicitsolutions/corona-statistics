import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GraphService } from 'src/app/service/graph.service';
declare var Sunburst: any;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  // @ViewChild('sbChart', { static: true }) sbChartEl: ElementRef;
  data: any;
  constructor(private graphService: GraphService) { }

  ngOnInit(): void {


    this.getGraphStatistics();
  }
  getGraphStatistics() {
    const body = ['IN', 'NP', 'BD', 'PK', 'BT', 'LK', 'MV']
    this.graphService.getGraphStatisticsData(body).subscribe((res) => {
      console.log(res)
      if (res.length > 0) {
        this.drawGraph(res);
      }
    })
  }
  drawGraph(res) {
    console.log(res)
    const graphSubDataArray = [];
    const continentJson = {}
    continentJson['continent'] = res[0]['continent']
    // graphSubDataArray.push(continentJson)
    res.map((graphEle) => {
      const graphSubDataJson = {};
      const childGraphArray = [];
      const activeJson = {};
      const totalCaseJson = {};
      const recoveredJson = {};
      const deathJson = {};
      graphSubDataJson['name'] = graphEle.country;
      graphSubDataJson['color'] = this.getRandomColor();
      activeJson['name'] = 'Active';
      activeJson['size'] = graphEle.active;
      activeJson['color'] = this.getRandomColor();
      childGraphArray.push(activeJson);
      totalCaseJson['name'] = 'Total Case';
      totalCaseJson['size'] = graphEle.cases;
      totalCaseJson['color'] = this.getRandomColor();
      childGraphArray.push(totalCaseJson);
      recoveredJson['name'] = 'Recovered';
      recoveredJson['size'] = graphEle.recovered;
      recoveredJson['color'] = this.getRandomColor();
      childGraphArray.push(recoveredJson);
      deathJson['name'] = 'Deaths';
      deathJson['size'] = graphEle.deaths;
      deathJson['color'] = this.getRandomColor();
      childGraphArray.push(deathJson);
      graphSubDataJson['children'] = childGraphArray;
      graphSubDataArray.push(graphSubDataJson);

      // this.data = {
      //   name: res[0]['continent'],
      //   color: this.getRandomColor(),
      //   children: [
      //     {
      //       name: "a",
      //       color: "yellow",
      //       size: 1
      //     },
      //     {
      //       name: "b",
      //       color: "red",
      //       children: [
      //         {
      //           name: "ba",
      //           color: "orange",
      //           size: 1
      //         },
      //         {
      //           name: "bb",
      //           color: "blue",
      //           children: [
      //             {
      //               name: "bba",
      //               color: "green",
      //               size: 1
      //             },
      //             {
      //               name: "bbb",
      //               color: "pink",
      //               size: 1
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }
    })
    this.drawGraphWithData(graphSubDataArray, continentJson);
  }
  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  drawGraphWithData(graphSubDataArray, continentJson) {
    console.log(graphSubDataArray)
    this.data = {
      name: continentJson.continent,
      color: "magenta",
      children: graphSubDataArray
    };
    console.log(this.data)
    Sunburst()
      .data(this.data)
      .size("size")
      .tooltipContent((d, node) => `Count: <i>${node.value}</i>`)
      .color("color")(document.getElementById("chart"));
  }
}
