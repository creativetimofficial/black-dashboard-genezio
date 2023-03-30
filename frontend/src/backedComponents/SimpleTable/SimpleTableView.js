import React from "react";
import {  
    Card,
    CardHeader,
    CardBody,
    CardTitle, 
    Table
} from "reactstrap";


export function SimpleTableView(props) {
    return(
        <Card>
            <CardHeader>
                <CardTitle tag="h4">Simple Table</CardTitle>
            </CardHeader>
            <CardBody>
                <Table className="tablesorter" responsive>
                    <thead className="text-primary">
                    <tr>
                        { props.dataHeaders.map((item) => (
                                <th>{item}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {props.data.map((item) => (
                        <tr>
                            {props.dataHeaders.map((headerItem) => (
                                <td>{item[headerItem]}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
    )
}
    