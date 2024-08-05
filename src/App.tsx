import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import "./App.css";
import "ag-grid-enterprise";
import { ColDef, ICellRendererParams } from "ag-grid-community"; // Import ColDef and ICellRendererParams

function App() {
  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data) => setRowData(data));
  }, []);

  const SimpleComponent = (p: ICellRendererParams & { buttonText: string }) => {
    const onAt = () => {
      console.log(p.value);
    };

    return (
      <>
        <button onClick={onAt}>{p.buttonText}</button>
        <div>{p.value}</div>
      </>
    );
  };

  const [rowData, setRowData] = useState<any[]>([]);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    {
      field: "athlete",
      cellRenderer: SimpleComponent,
      cellRendererParams: { buttonText: "Click Me" },
    },
    {
      field: "age",
      cellRenderer: (p: ICellRendererParams) => (
        <>
          <b>Age is : {p.value}</b>
        </>
      ),
      filterParams: {
        debounceMs: 2000,
      },
    },
    { field: "country", pinned: "left" },
    { field: "year", editable: true, checkboxSelection: true },
    { field: "date" },
    { field: "sport", lockPinned: true },
    {
      headerName: "Medals",
      children: [
        { field: "gold" },
        { field: "silver" },
        { field: "bronze", columnGroupShow: "closed" },
      ],
    },
    { field: "total" },
  ]);

  const groupDisplayType = "groupRows";

  const defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    enableRowGroup: true,

    filterParams: {
      buttons: ["apply", "clear"],
    },
    width: 150,
  };

  return (
    <div>
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowGroupPanelShow="always"
          animateRows={true}
          defaultColDef={defaultColDef}
          groupDisplayType={groupDisplayType}
          noRowsOverlayComponent={"Loading..."}
        />
      </div>
    </div>
  );
}

export default App;
