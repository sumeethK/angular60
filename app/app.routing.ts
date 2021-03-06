import {ModuleWithProviders} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {UserComponent} from "./components/user.component";
import {AboutComponent} from "./components/about.component";
import {UserGridComponent} from "./components/user.grid.component";

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
  }

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
