import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import "./App.css";
import "ag-grid-enterprise";
import { ColDef, ICellRendererParams, ColGroupDef } from "ag-grid-community"; // Import ColDef and ICellRendererParams

const AG_GRID_LOCALE_FA = {
  selectAll: "(انتخاب همه)",
  selectAllSearchResults: "(انتخاب همه نتایج جستجو)",
  searchOoo: "جستجو...",
  blank: "خالی",
  notBlank: "پُر",
  blanks: "(جای خالی)",
  noMatches: "بدون منطبق",
  filterOoo: "فیلتر...",
  equals: "برابر",
  notEqual: "نه برابر",
  empty: "یکی را انتخاب کن",
  lessThan: "کمتر از",
  greaterThan: "بزرگتر از",
  lessThanOrEqual: "کمتر یا مساوی",
  greaterThanOrEqual: "بزرگتر یا مساوی",
  inRange: "در محدوده",
  inRangeStart: "به",
  inRangeEnd: "از",
  contains: "حاوی",
  notContains: "شامل نشود",
  startsWith: "شروع با",
  endsWith: "مختوم به",
  dateFormatOoo: "yyyy-mm-dd",
  andCondition: "و",
  orCondition: "یا",
  applyFilter: "اعمال",
  resetFilter: "بازنشانی",
  clearFilter: "پاک کردن",
  cancelFilter: "لغو",
  textFilter: "فیلتر متن",
  numberFilter: "فیلتر عدد",
  dateFilter: "فیلتر تاریخ",
  setFilter: "تنظیم فیلتر",
  columns: "ستون ها",
  filters: "فیلترها",
  pivotMode: "حالت محوری",
  groups: "گروه های ردیف",
  rowGroupColumnsEmptyMessage: "برای تنظیم گروه های ردیف اینجا را بکشید",
  values: "ارزش ها",
  valueColumnsEmptyMessage: "برای جمع آوری اینجا را بکشید",
  pivots: "برچسب های ستون",
  pivotColumnsEmptyMessage: "برای تنظیم برچسب های ستون به اینجا بکشید",
  group: "گروه",
  loadingOoo: "در حال بارگیری...",
  noRowsToShow: "هیچ ردیفی برای نمایش وجود ندارد",
  enabled: "فعال",
  pinColumn: "سنجاق کردن ستون",
  pinLeft: "سنجاق کردن به چپ",
  pinRight: "سنجاق کردن به راست",
  noPin: "بدون پین",
  valueAggregation: "تجمیع مقادیر",
  autosizeThiscolumn: "اندازه خودکار این ستون",
  autosizeAllColumns: "اندازه خودکار همه ستون‌ها",
  groupBy: "گروه‌بندی بر اساس",
  ungroupBy: "لغو گروه بندی بر اساس",
  resetColumns: "بازنشانی ستون ها",
  expandAll: "گسترش همه",
  collapseAll: "بستن همه",
  copy: "کپی",
  ctrlC: "Ctrl+C",
  copyWithHeaders: "کپی با سر ستون",
  paste: "چسباندن",
  ctrlV: "Ctrl+V",
  export: "خروجی",
  csvExport: "CSV خروجی",
  excelExport: "خروجی اکسل (.xlsx)",
  excelXmlExport: "خروجی اکسل (.xml)",
  sum: "جمع",
  min: "دقیقه",
  max: "حداکثر",
  none: "هیچ",
  count: "شمار",
  avg: "متوسط",
  filteredRows: "فیلتر شده",
  selectedRows: "انتخاب شده",
  totalRows: "همه ردیف ها",
  totalAndFilteredRows: "ردیف",
  more: "بیشتر",
  to: "به",
  of: "از",
  page: "صفحه",
  nextPage: "صفحه بعدی",
  lastPage: "آخرین صفحه",
  firstPage: "صفحه اول",
  previousPage: "صفحه قبلی",
  pivotChartAndPivotMode: "نمودار محوری و حالت محوری",
  pivotChart: "نمودار محوری",
  chartRange: "محدوده نمودار",
  columnChart: "ستونی",
  groupedColumn: "گروه بندی شده",
  stackedBarColumn: "انباشته شده",
  normalizedColumn: "100% انباشته شده",
  barChart: "میله ای",
  groupedBar: "گروه بندی شده ",
  stackedBar: "انباشته شده",
  normalizedBar: "100% انباشته شده",
  pieChart: "پای",
  pie: "پای",
  doughnut: "دونات",
  line: "خط",
  xyChart: "XY (اسکتر)",
  scatter: "اسکتر",
  bubble: "حباب",
  areaChart: "منطقه",
  area: "منطقه",
  stackedArea: "انباشته شده",
  normalizedArea: "100% انباشته شده",
  histogramChart: "هیستوگرام",
  pivotChartTitle: "نمودار محوری",
  rangeChartTitle: "نمودار محدوده",
  settings: "تنظیمات",
  data: "داده",
  format: "فرمت",
  categories: "دسته ها",
  defaultCategory: "(هیچ)",
  series: "سریال",
  xyValues: "XY مقادیر",
  paired: "حالت جفت",
  axis: "محور",
  navigator: "هدایتگر",
  color: "رنگ",
  thickness: "ضخامت",
  xType: "نوع X",
  automatic: "اتوماتیک",
  category: "دسته",
  number: "شماره",
  time: "زمان",
  xRotation: "X چرخش",
  yRotation: "Y چرخش",
  ticks: "کنه",
  width: "عرض",
  height: "ارتفاع",
  length: "طول",
  padding: "فاصله",
  spacing: "فاصله گذاری",
  chart: "نمودار",
  title: "عنوان",
  titlePlaceholder: "عنوان نمودار - برای ویرایش دوبار کلیک کنید",
  background: "پس زمینه",
  font: "فونت",
  top: "بالا",
  right: "درست",
  bottom: "پایین",
  left: "چپ",
  labels: "برچسب ها",
  size: "اندازه",
  minSize: "حداقل اندازه",
  maxSize: "حداکثر اندازه",
  legend: "افسانه",
  position: "مقام",
  markerSize: "اندازه نشانگر",
  markerStroke: "حرکت نشانگر",
  markerPadding: "پدینگ نشانگر",
  itemSpacing: "فاصله مورد",
  itemPaddingX: "پدینگ ایتم X",
  itemPaddingY: "پدینگ ایتم Y",
  layoutHorizontalSpacing: "فاصله افقی",
  layoutVerticalSpacing: "فاصله عمودی",
  strokeWidth: "عرض ضربه",
  offset: "افست",
  offsets: "افست ها",
  tooltips: "نکات ابزار",
  callout: "فراخوانی",
  markers: "نشانگرها",
  shadow: "سایه",
  blur: "تار",
  xOffset: "X افست",
  yOffset: "Y افست",
  lineWidth: "عرض خط",
  normal: "عادی",
  bold: "پررنگ",
  italic: "مورب",
  boldItalic: "پررنگ مورب",
  predefined: "از پیش تعریف شده",
  fillOpacity: "تاری انباشته",
  strokeOpacity: "تاری خط",
  histogramBinCount: "تعداد جعبه",
  columnGroup: "ستون",
  barGroup: "میله",
  pieGroup: "پای",
  lineGroup: "خط",
  scatterGroup: "XY (اسکتر)",
  areaGroup: "منطقه",
  histogramGroup: "هیستوگرام",
  groupedColumnTooltip: "گروه بندی شده",
  stackedColumnTooltip: "انباشته شده",
  normalizedColumnTooltip: "100% انباشته شده",
  groupedBarTooltip: "گروه بندی شده",
  stackedBarTooltip: "انباشته شده",
  normalizedBarTooltip: "100% انباشته شده",
  pieTooltip: "پای",
  doughnutTooltip: "دونات",
  lineTooltip: "Line",
  groupedAreaTooltip: "Area",
  stackedAreaTooltip: "انباشته شده",
  normalizedAreaTooltip: "100% انباشته شده",
  scatterTooltip: "اسکتر",
  bubbleTooltip: "حباب",
  histogramTooltip: "هیستوگرام",
  noDataToChart: "داده ای برای ترسیم در دسترس نیست.",
  pivotChartRequiresPivotMode:
    "نمودار محوری نیاز به فعال کردن حالت محوری دارد.",
  chartSettingsToolbarTooltip: "منو",
  chartLinkToolbarTooltip: "پیوند با جدول",
  chartUnlinkToolbarTooltip: "لغو پیوند از جدول",
  chartDownloadToolbarTooltip: "دانلود نمودار",
  ariaHidden: "پنهان",
  ariaVisible: "مرئی",
  ariaChecked: "بررسی",
  ariaUnchecked: "چک نشده",
  ariaIndeterminate: "نامعین",
  ariaColumnSelectAll: "تغییر وضعیت انتخاب همه ستون ها",
  ariaInputEditor: "ویرایشگر ورودی",
  ariaDateFilterInput: "ورودی فیلتر تاریخ",
  ariaFilterInput: "ورودی فیلتر",
  ariaFilterColumnsInput: "ورودی ستون های فیلتر",
  ariaFilterValue: "مقدار فیلتر",
  ariaFilterFromValue: "فیلتر از مقدار",
  ariaFilterToValue: "فیلتر به مقدار",
  ariaFilteringOperator: "اپراتور فیلتر کردن",
  ariaColumnToggleVisibility: "نمایش تغییر ستون",
  ariaColumnGroupToggleVisibility: "تغییر نمای گروه ستون",
  ariaRowSelect: "برای انتخاب این ردیف SPACE را فشار دهید",
  ariaRowDeselect: "برای لغو انتخاب این سطر, SPACE را فشار دهید",
  ariaRowToggleSelection: "برای جابجایی انتخاب ردیف, Space را فشار دهید",
  ariaRowSelectAll: "برای جابجایی انتخاب همه ردیف ها, Space را فشار دهید",
  ariaSearch: "جستجو",
  ariaSearchFilterValues: "مقادیر فیلتر جستجو",
};

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
