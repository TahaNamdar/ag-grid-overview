import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import "./App.css";
import "ag-grid-enterprise";
import { AG_GRID_LOCALE_FA } from "@/loc/persianTable";
import { ColDef, ICellRendererParams, ColGroupDef } from "ag-grid-community"; // Import ColDef and ICellRendererParams
import Compo from "./compo/compo";

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
        {/* <button onClick={onAt}>{p.buttonText}</button> */}
        <div>{p.value}</div>
      </>
    );
  };

  const [goal, setGoal] = useState(350);

  function onClick(adjustment: number) {
    setGoal(Math.max(200, Math.min(400, goal + adjustment)));
  }

  const [rowData, setRowData] = useState<any[]>([]);

  const [colDefs, setColDefs] = useState<(ColDef | ColGroupDef)[]>([
    {
      field: "status",
      lockPinned: true,
      pinned: "left",
      filter: false,
      resizable: false,
      sortable: false,
      enableRowGroup: false,
      width: 100,
      cellRenderer: (params: ICellRendererParams) => (
        <input
          type="checkbox"
          checked={params.data.status}
          onChange={() => handleStatusChange()}
        />
      ),
    },
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
    { field: "country" },
    { field: "year", editable: true },
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

  const onCellValueChanged = (params: any) => {
    if (params.column.colId === "year") {
      const updatedRowData = rowData.map((row) => {
        if (row.athlete === params.data.athlete) {
          return { ...row, year: params.newValue };
        }
        return row;
      });
      setRowData(updatedRowData);
    }
  };

  const handleStatusChange = () => {};

  return (
    <div>
      <Compo />
      <div className="ag-theme-quartz" style={{ height: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          rowGroupPanelShow="always"
          animateRows={true}
          defaultColDef={defaultColDef}
          groupDisplayType={groupDisplayType}
          noRowsOverlayComponent={"Loading..."}
          sideBar={true}
          onCellValueChanged={onCellValueChanged}
          localeText={AG_GRID_LOCALE_FA}
          enableRtl={true}
        />
      </div>
    </div>
  );
}

export default App;
