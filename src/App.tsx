import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useState } from "react";
import { ColDef } from "ag-grid-community"; // Import the ColDef type
import "./App.css";

function App() {
  const CustomButtonComponent = () => {
    return <button onClick={() => window.alert("clicked")}>Push Me!</button>;
  };

  const plusButtonComponent = (params: any) => {
    const value = params.value;
    const rowIndex = params.node.rowIndex;

    const increment = () => {
      setRowData((prevRowData) => {
        const updatedRowData = [...prevRowData];
        updatedRowData[rowIndex].qty += 1;
        return updatedRowData;
      });
    };

    return (
      <div>
        <button onClick={increment}>+</button>
        {value}
        {rowData[rowIndex].qty}
      </div>
    );
  };

  const [rowData, setRowData] = useState([
    { make: "Tesla", model: "Model Y", price: 64950, electric: true, qty: 0 },
    { make: "Ford", model: "F-Series", price: 33850, electric: false, qty: 0 },
    { make: "Toyota", model: "Corolla", price: 29600, electric: false, qty: 0 },
  ]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "make", headerName: "Make", cellRenderer: plusButtonComponent },
    { field: "model", headerName: "Model" },
    {
      field: "price",
      headerName: "Price",
      filter: true,
      editable: true,
      valueFormatter: (p) => "$" + p.value.toLocaleString(),
      cellClassRules: {
        "green-cell": (p) => p.value > 60000,
      },
    },
    { field: "electric", headerName: "Electric", type: "boolean" },
    { field: "button", cellRenderer: CustomButtonComponent },
  ]);

  const rowClassRules = {
    "red-row": (params: any) => params.data.make === "Toyota",
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          rowClassRules={rowClassRules}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default App;
