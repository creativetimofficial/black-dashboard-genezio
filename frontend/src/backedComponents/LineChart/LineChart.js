import React from "react";
import { LineChartView } from "./LineChartView";
import { chartExample2 } from "variables/charts";



export function LineChart(props){
    const [chartData, setChartData] = React.useState(undefined);
    const [numberOfItems, setNumberOfItems] = React.useState(undefined);
    const [chartRef, setChartRef] = React.useState(null);

    React.useEffect(() => {
        async function getChartData() {
          const canvas = chartRef;
          const data = await props.class.getChartData(localStorage.getItem("apiToken"));
          if (!data.success) {
            console.log("error at get chart data");
            setChartData("Problem");
          } else { 
             
            let ctx = canvas.ctx;
    
            let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);
    
            gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
            gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
            gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors
    
            var labels = data.labels;
            var chartData = data.data;
            setNumberOfItems(data.numberOfItems)
            setChartData({
              labels: labels,
              datasets: [
                {
                  label: props.className,
                  fill: true,
                  backgroundColor: gradientStroke,
                  borderColor: "#1f8ef1",
                  borderWidth: 2,
                  borderDash: [],
                  borderDashOffset: 0.0,
                  pointBackgroundColor: "#1f8ef1",
                  pointBorderColor: "rgba(255,255,255,0)",
                  pointHoverBackgroundColor: "#1f8ef1",
                  pointBorderWidth: 20,
                  pointHoverRadius: 4,
                  pointHoverBorderWidth: 15,
                  pointRadius: 4,
                  data: chartData,
                },
              ],
            });
          }
        }
        if (!chartData && chartRef) {
          getChartData();
        }
      }, [chartData, chartRef]); 

    return(
        <LineChartView
            data = {chartData}
            options = {chartExample2.options}
            passedRef = {newRef => setChartRef(newRef)}
            dataName = {props.dataName}
            totalData = {numberOfItems}
        />
    )
}

