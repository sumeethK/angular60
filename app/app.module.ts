import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppComponent} from "./app.component";
import {UserComponent} from "./components/user.component";
import {AboutComponent} from "./components/about.component";
import {AgGridModule} from "ag-grid-ng2/main";
import {routing} from "./app.routing";
import {UserGridComponent} from "./user_app/component/user.grid.component";
import {QuizGridComponent} from "./quiz_app/component/quiz.component";
// import {GridOptions} from "ag-grid";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing, AgGridModule.withComponents([])
  ],
  declarations: [AppComponent, UserComponent, AboutComponent, UserGridComponent, QuizGridComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
