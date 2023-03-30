import React from "react";
import { SimpleTableView } from "./SimpleTableView";

export function SimpleTable(props) {
  const [tableData, setTableData] = React.useState([]);
  const [tableDataHeaders, setTableDataHeaders] = React.useState([]);

  React.useEffect(() => {
    async function getTableData() {
      const data = await props.class.getAll(localStorage.getItem("apiToken"));
      if (!data.success) {
        console.log("error at get all elements");
      } else {
        const firstItem = data.elements[0];
        const headers = Object.keys(firstItem).slice(1, -1);
        setTableData(data.elements);
        setTableDataHeaders(headers);
        // for(const elem in headers){
        // }
      }
    }
    getTableData();
  }, []);

  return <SimpleTableView dataHeaders={tableDataHeaders} data={tableData} />;
}
