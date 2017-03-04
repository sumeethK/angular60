import {Component, OnInit} from "@angular/core";
import {User, Address} from "./interface/user.interface";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid";
import {PostsService} from "../../services/posts.service";


@Component({
  moduleId: module.id,
  selector: 'usergrid',
  directives: [AgGridNg2],
  templateUrl: './views/user.grid.html',
  providers: [PostsService]
})
export class UserGridComponent implements OnInit {
  private users: User[];
  public showGrid: boolean;
  public rowData: any[];
  private columnDefs: any[];
  private gridOptions: GridOptions;
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
        cellRenderer: addressRender,
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

  private onCellClicked($event) {
    console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellValueChanged($event) {
    console.log('onCellValueChanged: ' + $event.oldValue + ' to ' + $event.newValue);
  }

  private onCellDoubleClicked($event) {
    console.log('onCellDoubleClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellContextMenu($event) {
    console.log('onCellContextMenu: ' + $event.rowIndex + ' ' + $event.colDef.field);
  }

  private onCellFocused($event) {
    console.log('onCellFocused: (' + $event.rowIndex + ',' + $event.column.colId + ')');
  }

  private onRowSelected($event) {
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

  private onVirtualRowRemoved($event) {
    // because this event gets fired LOTS of times, we don't print it to the
    // console. if you want to see it, just uncomment out this line
    // console.log('onVirtualRowRemoved: ' + $event.rowIndex);
  }

  private onRowClicked($event) {
    console.log('onRowClicked: ' + $event.node.data.name);
  }

  public onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  // here we use one generic event to handle all the column type events.
  // the method just prints the event name
  private onColumnEvent($event) {
    console.log('onColumnEvent: ' + $event);
  }

//Editing
  private onRowEditingStarted(event) {
    console.log('never called - not doing row editing');
  }

  private onRowEditingStopped(event) {
    console.log('never called - not doing row editing');
  }

  private onCellEditingStarted(event) {
    console.log('cellEditingStarted');
  }

  private onCellEditingStopped(event) {
    console.log('cellEditingStopped');
  }


}


function createRandomPhoneNumber() {
  var result = '+';
  for (var i = 0; i < 12; i++) {
    result += Math.round(Math.random() * 10);
    if (i === 2 || i === 5 || i === 8) {
      result += ' ';
    }
  }
  return result;
}

function addressRender(address) {
  return "Street : " + address.data.address.street + "\n" +
  "City : " + address.data.address.city + "\n" +
  "Suite : " + address.data.address.suite + "\n",
  "Zipcode : " + address.data.address.zipcode + "\n",
  "Lat : " + address.data.address.geo.lat + "\n";
}

function percentCellRenderer(params) {
  var value = params.value;

  var eDivPercentBar = document.createElement('div');
  eDivPercentBar.className = 'div-percent-bar';
  eDivPercentBar.style.width = value + '%';
  if (value < 20) {
    eDivPercentBar.style.backgroundColor = 'red';
  } else if (value < 60) {
    eDivPercentBar.style.backgroundColor = '#ff9900';
  } else {
    eDivPercentBar.style.backgroundColor = '#00A000';
  }

  var eValue = document.createElement('div');
  eValue.className = 'div-percent-value';
  eValue.innerHTML = value + '%';

  var eOuterDiv = document.createElement('div');
  eOuterDiv.className = 'div-outer-div';
  eOuterDiv.appendChild(eValue);
  eOuterDiv.appendChild(eDivPercentBar);

  return eOuterDiv;
}

//Utility function used to pad the date formatting.
function pad(num, totalStringSize) {
  let asString = num + "";
  while (asString.length < totalStringSize) asString = "0" + asString;
  return asString;
}


