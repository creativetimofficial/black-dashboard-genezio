import React from "react";
import {  
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
} from "reactstrap";

import { Line } from "react-chartjs-2";


export function LineChartView(props){
    return(
    <Card className="card-chart">
        <CardHeader>
            <h5 className="card-category">{props.dataName}</h5>
            <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> {props.totalData}
            </CardTitle>
        </CardHeader>
        <CardBody>
            <div className="chart-area">
                <Line
                data={props.data}
                options={props.options}
                ref = {props.passedRef} 
                />
            </div>
        </CardBody>
    </Card>
    );
}