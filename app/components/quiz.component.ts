import {Component, OnInit} from "@angular/core";
import {AgGridNg2} from "ag-grid-ng2/main";
import {GridOptions} from "ag-grid";
import {QuizService} from "../services/quiz.service";
declare var $: any;

@Component({
  moduleId: module.id,
  selector: 'quizgrid',
  directives: [AgGridNg2],
  templateUrl: './views/quiz.grid.html',
  providers: [QuizService]
})
export class QuizGridComponent implements OnInit {
  private questions: Question[];
  private quizData: any;
  public showGrid: boolean;
  public rowData: any[];
  private selectedOptions: any[];
  private answerCode: any[];
  private columnDefs: any[];
  public rowCount: string;

  ngOnInit() {
  }

  constructor(private quizService: QuizService) {

    // we pass an empty gridOptions in, so we can grab the api out
    this.gridOptions = <GridOptions>{};
    this.createRowData();
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
    this.quizService.getQuestion().subscribe(questionList => {
      this.quizData = questionList;
      this.questions = this.quizData["questionList"];
      this.rowData = this.questions;
      this.rowData = addDefaultSelectedOption(this.rowData);
      this.answerCode = fetchAnswer(this.rowData);
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
        headerName: "Question Category",
        field: "category.description",
        width: 120,
        filter: 'text',
        colIndex: 2
      },
      {
        headerName: "Question",
        field: "question",
        width: 220,
        filter: 'text',
        colIndex: 3
      },
      {
        headerName: "Option 1",
        field: "options.a",
        width: 120,
        filter: 'text',
        colIndex: 4
      },
      {
        headerName: "Option 2",
        field: "options.b",
        width: 120,
        filter: 'text',
        colIndex: 5
      },
      {
        headerName: "Option 3",
        field: "options.c",
        width: 120,
        filter: 'text',
        colIndex: 6
      },
      {
        headerName: "Option 4",
        field: "options.d",
        width: 120,
        filter: 'text',
        colIndex: 7
      },
      {
        headerName: "Selected Option",
        field: "optionSelected",
        width: 120,
        filter: 'text',
        colIndex: 8,
        cellStyle: this.changeRowColor
        // cellRenderer: selectedOption,
      }
    ];
  }

  private changeRowColor(param) {
    if (param.node.data[4] === 100) {
      return {'background-color': 'yellow'};
    }
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
    if ($event.column.colId.length > 0 && $event.column.colId.includes("options.")) {
      this.onOptionSelected($event);
    }
  }

  private onOptionSelected($event) {
    var option = $event.column.colId.split(".")[1].toUpperCase();
    this.selectedOptions[$event.rowIndex] = option;
    this.rowData[$event.rowIndex]["optionSelected"] = option;
    // this.gridOptions.api.setRowData(this.rowData);
    this.gridOptions.api.refreshView();
    console.log("Option selected:" + option);
    console.log(this.selectedOptions);
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
    if ($event.column.colId.length > 0 && $event.column.colId.includes("options.")) {
      this.onOptionSelected($event);
    }
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
    console.log('onRowClicked: ' + $event.rowIndex);
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

  public validateAnswer() {
    console.log("validation");
    var dataSelectedOptions = this.selectedOptions;
    var countCorrectAnswer = 0;
    if (dataSelectedOptions.length > 0) {
      var localGrid = this.gridOptions;

      var dataAnswerCode = this.answerCode;
      $.each(dataSelectedOptions, function (index, value) {
        if (dataSelectedOptions[index] == dataAnswerCode[index]) {
          countCorrectAnswer++;
        }
      });
    }
    console.log("Total Correct Answers :" + countCorrectAnswer);
  }


}

function skillsCellRenderer(params) {
  var data = params.data;
  var skills = [];
  RefData.IT_SKILLS.forEach(function (skill) {
    if (data && data.skills && data.skills[skill]) {
      skills.push('<img src="images/skills/' + skill + '.png" width="16px" title="' + skill + '" />');
    }
  });
  return skills.join(' ');
}

function countryCellRenderer(params) {
  var flag = "<img border='0' width='15' height='10' style='margin-bottom: 2px' src='images/flags/" + RefData.COUNTRY_CODES[params.value] + ".png'>";
  return flag + " " + params.value;
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

// function selectedOption(param) {
//
//   return "Street : " + address.data.address.street + "\n" +
// }

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
function addDefaultSelectedOption(data) {
  // var option = ["A","B","C","D"]
  $.each(data, function (index, value) {
    // var random= Math.floor((Math.random()*option.length))
    data[index]["optionSelected"] = "None";
    console.log(data[index]["optionSelected"]);
  });
  return data;
}
function fetchAnswer(data) {
  var answerCode = [];
  $.each(data, function (index, value) {
    answerCode[index] = data[index]["answer"]["key"];
  });
  console.log("AnswerCode:" + answerCode);
  return answerCode;
}


