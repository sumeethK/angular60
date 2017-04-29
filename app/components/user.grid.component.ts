import {Component, NgModule, OnInit} from "@angular/core";
import {PostsService} from "../services/posts.service";
import {Address, User} from "./interface/user.interface";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid";

@NgModule({
  declarations: [AgGridNg2]
})
@Component({
  moduleId: module.id,
  selector: 'usergrid',
  templateUrl: './views/user.grid.html',
  providers: [PostsService]
})
export class UserGridComponent implements OnInit {
  gridOptions: GridOptions;
  private users: User[];
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  public rowCount: string;

  ngOnInit() {
  }

  constructor(private postsService: PostsService) {

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
    this.createColumnDefs();
    this.showGrid = true;
    this.gridOptions.defaultColDef = {
      headerComponentParams: {
        menuIcon: 'fa-bars'
      }
    }


  }

  private createRowData() {
    this.rowData = [];
    this.postsService.getUsers().subscribe(users => {
      this.users = users;
      this.rowData = this.users;
      var dataSource = {
        paginationPageSize: 10,
        overflowSize: 100,
        getRows: (params: any) => {
          params.successCallback(this.rowData, -1);
        }
      };
      this.gridOptions.api.setDatasource(dataSource);
      console.log("Rowdata :" + dataSource);
    });
  }

  private createColumnDefs() {
    this.columnDefs = [
      {
        headerName: '#', width: 30, checkboxSelection: true, suppressSorting: true,
        suppressMenu: true, pinned: true,
        colIndex: 1
      },
      {
        headerName: "Name",
        field: "name",
        width: 120,
        filter: 'text',
        colIndex: 2
      },
      {
        headerName: "Username",
        field: "username",
        width: 120,
        filter: 'text',
        colIndex: 3,
        editable: true
      },
      {
        headerName: "Email",
        field: "email",
        width: 120,
        filter: 'text',
        colIndex: 4
      },
      {
        headerName: "Phone",
        field: "phone",
        width: 120,
        filter: 'text',
        colIndex: 5
      },
      {
        headerName: "Website",
        field: "website",
        width: 120,
        filter: 'text',
        colIndex: 6
      },
      {
        headerName: "Address",
        field: "address",
        width: 120,
        filter: 'text',
        colIndex: 7
      }
    ];
  }


  private calculateRowCount() {
    if (this.gridOptions.api && this.rowData) {
      var model = this.gridOptions.api.getModel();
      var totalRows = this.rowData.length;
      var processedRows = model.getRowCount();
      this.rowCount = processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString();
      console.log("Row updated :" + this.rowCount);
    }
  }

  private onModelUpdated() {
    console.log('onModelUpdated');
    this.calculateRowCount();
  }

  private onReady() {
    console.log('onReady');
    this.calculateRowCount();
  }

  private onCellClicked($event: any) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
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
    console.log('onRowClicked: ' + $event.node.data.name);
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

  private onCellEditingStopped($event: any) {
    console.log('cellEditingStopped');
  }


}



//Utility function used to pad the date formatting.
function pad(num: any, totalStringSize: any) {
  let asString = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}


