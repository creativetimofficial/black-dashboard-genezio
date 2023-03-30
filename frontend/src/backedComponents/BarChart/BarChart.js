import React from "react";
import { BarChartView } from "./BarChartView";
import { chartExample3} from "variables/charts";

export function BarChart(props){
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

            gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
            gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
            gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors
    
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
                    hoverBackgroundColor: gradientStroke,
                    borderColor: "#d048b6",
                    borderWidth: 2,
                    borderDash: [],
                    borderDashOffset: 0.0,
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
        <BarChartView
            data = {chartData}
            options = {chartExample3.options}
            passedRef = {newRef => setChartRef(newRef)}
            dataName = {props.dataName}
            totalData = {numberOfItems}
        />
    )
}