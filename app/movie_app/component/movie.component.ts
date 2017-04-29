import {Component, NgModule, OnInit} from "@angular/core";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid";
import {MovieService} from "../../services/movie.service";
declare let $: any;
@NgModule({
  declarations: [AgGridNg2]
})
@Component({
  moduleId: module.id,
  selector: 'movie-grid',
  templateUrl: './views/movie.grid.html',
  providers: [MovieService]
})
export class MovieGridComponent implements OnInit {
  private moviesList: Movie[];
  private moviesData: any;
  private totalMovies: number;
  public showGrid: boolean;
  public rowData: any[];
  private selectedOptions: any[];
  private answerCode: any[];
  private columnDefs: any[];
  private currentPage: number;
  private pageLimit: number;
  private pageOffset: number;
  private gridOptions: GridOptions;
  public rowCount: string;

  ngOnInit() {
  }

  constructor(private movieService: MovieService) {

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.currentPage = 0;
    this.pageLimit = 100;
    this.pageOffset = (this.currentPage * this.pageLimit);
    this.createRowData();
    // this.updataDataSource();
    this.createColumnDefs();
    this.showGrid = true;
    this.selectedOptions = [];
    this.gridOptions.defaultColDef = {
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }


  }


  private createRowData() {
    this.rowData = [];
    this.movieService.getMoviesWithLimitAndOffset(this.pageLimit, this.pageOffset).subscribe(moviesList => {
      this.moviesData = moviesList;
      this.moviesList = this.moviesData["moviesList"];
      this.rowData = this.moviesList;
      this.totalMovies = this.moviesData["total_movies"];
      this.updateGrid();
    });
  }

  private updateGrid() {
    var dataSource = {
      startRow: 0,
      endRow: 10,
      paginationFirstPage: 20,
      paginationPageSize: 10,
      overflowSize: 10,
      getRows: (params: any) => {
        params.successCallback(this.rowData, this.totalMovies);
        console.log("dataSource :" + dataSource);
      }
    };
    this.gridOptions.api.setDatasource(dataSource);
    console.log("Rowdata :" + dataSource);
  }


  private paginate(limit: number, offset: number) {
    this.rowData = [];
    this.movieService.getMoviesWithLimitAndOffset(limit, offset).subscribe(moviesList => {
      this.moviesData = moviesList;
      this.moviesList = this.moviesData["moviesList"];
      this.rowData = this.moviesList;
      this.updateGrid();
    });
  }


  private calculateOffset(currentPage: number, limit: number) {
    return currentPage * limit;
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true,
        colIndex: 1
      },
      {
        headerName: "Id",
        field: "id",
        width: 120,
        filter: 'text',
        colIndex: 2
      },
      {
        headerName: "Name",
        field: "name",
        width: 220,
        filter: 'text',
        colIndex: 3
      },
      {
        headerName: "Category",
        field: "category",
        width: 120,
        filter: 'text',
        colIndex: 4
      },
      {
        headerName: "Download Date",
        field: "modifiedDate",
        width: 120,
        filter: 'text',
        colIndex: 5
      },
      {
        headerName: "Location",
        field: "absolutePath",
        width: 420,
        filter: 'text',
        colIndex: 6
      },
    ];
  }


  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      var offset = this.gridOptions.api.getFirstRenderedRow();
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
      console.log("Row updated :" + this.rowCount);
    }
  }

  private onModelUpdated($event: any) {
    console.log('onModelUpdated' + $event);
    this.calculateRowCount();
  }

  private onReady() {
    console.log('onReady');
    this.calculateRowCount();
  }

  private onCellClicked($event: any) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
    if ($event.column.colId.length > 0 && $event.column.colId.includes("options.")) {
      this.onOptionSelected($event);
    }
  }

  private onOptionSelected($event: any) {
    var option = $event.column.colId.split(".")[1].toUpperCase();
    this.selectedOptions[$event.rowIndex] = option;
    this.rowData[$event.rowIndex]["optionSelected"] = option;
    // this.gridOptions.api.setRowData(this.rowData);
    this.gridOptions.api.refreshView();
    console.log("Option selected:" + option);
    console.log(this.selectedOptions);
  }

  private onCellValueChanged($event: any) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event: any) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event: any) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event: any) {
    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.column.colId + ')');
    if ($event.column.colId.length > 0 && $event.column.colId.includes("options.")) {
      this.onOptionSelected($event);
    }
  }

  private onRowSelected($event: any) {
    // taking out, as when we 'select all', it prints to much to the console!!
    // console.log('onRowSelected: ' + $event.node.data.name);
  }

  private onSelectionChanged() {
    console.log('selectionChanged');
  }

  private onBeforeFilterChanged() {
    console.log('beforeFilterChanged');
  }

  private onAfterFilterChanged() {
    console.log('afterFilterChanged');
  }

  private onFilterModified() {
    console.log('onFilterModified');
  }

  private onBeforeSortChanged() {
    console.log('onBeforeSortChanged');
  }

  private onAfterSortChanged() {
    console.log('onAfterSortChanged');
  }

  private onVirtualRowRemoved($event: any) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked($event: any) {
    console.log('onRowClicked: ' + $event.rowIndex);
  }

  public onQuickFilterChanged($event: any) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event: any) {
    console.log('onColumnEvent: ' + $event);
  }

//Editing
  private onRowEditingStarted($event: any) {
    console.log('never called - not doing row editing');
  }

  private onRowEditingStopped($event: any) {
    console.log('never called - not doing row editing');
  }

  private onCellEditingStarted($event: any) {
    console.log('cellEditingStarted');
  }

  /*********************** Pagination call  *******/
  private onPaginationGoToNextPage($event: any) {
    console.log('onPaginationGoToNextPage');
  }

  private onPaginationGoToPreviousPage($event: any) {
    console.log('onPaginationGoToPreviousPage');
  }

  private onPaginationGoToLastPage($event: any) {
    console.log('onPaginationGoToLastPage');
  }

  private onPaginationGetCurrentPage($event: any) {
    console.log('onPaginationGetCurrentPage');
  }

  private onPaginationGetRowCount($event: any) {
    console.log('onPaginationGetRowCount');
  }

  private onCellEditingStopped($event: any) {
    console.log('cellEditingStopped');
  }
}


