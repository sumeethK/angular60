import {ModuleWithProviders} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UserComponent} from "./components/user.component";
import {AboutComponent} from "./components/about.component";
import {UserGridComponent} from "./user_app/component/user.grid.component";
import {QuizGridComponent} from "./quiz_app/component/quiz.component";
import {MovieGridComponent} from "./movie_app/component/movie.component";
import {TodoComponent} from "./todo_app/component/todo.component";
const appRoutes: Routes = [
  {
    path: '',
    component: UserComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'usergrid',
    component: UserGridComponent
  },
  {
    path: 'quizgrid',
    component: QuizGridComponent
  },
  {
    path: 'moviesGrid',
    component: MovieGridComponent
  },
  {
    path: 'todo',
    component: TodoComponent
  }
  //, {
  //   path: 'media',
  //   component: SingleMediaPlayer
  // }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
