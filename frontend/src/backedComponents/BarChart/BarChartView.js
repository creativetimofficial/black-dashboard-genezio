import React from "react";
import {  
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
} from "reactstrap";

import { Bar } from "react-chartjs-2";

export function BarChartView(props){
    return(
    <Card className="card-chart">
        <CardHeader>
            <h5 className="card-category">{props.dataName}</h5>
            <CardTitle tag="h3">
                <i className="tim-icons icon-delivery-fast text-primary" /> {props.totalData}
            </CardTitle>
        </CardHeader>
        <CardBody>
            <div className="chart-area">
                <Bar
                data={props.data}
                options={props.options}
                ref = {props.passedRef} 
                />
            </div>
        </CardBody>
    </Card>
    );
}