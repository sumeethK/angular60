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
import {MovieGridComponent} from "./movie_app/component/movie.component";
import {TodoComponent} from "./todo_app/component/todo.component";

@NgModule({
  imports: [BrowserModule, FormsModule, HttpModule, routing, AgGridModule.withComponents([])
  ],
  declarations: [AppComponent,
    UserComponent,
    AboutComponent,
    UserGridComponent,
    QuizGridComponent,
    MovieGridComponent,
    TodoComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
