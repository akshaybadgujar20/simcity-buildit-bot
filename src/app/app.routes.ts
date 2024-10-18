import {RouterModule, Routes} from '@angular/router';
import {ActionViewComponent} from "./components/action-view/action-view.component";
import {NgModule} from "@angular/core";

export const routes: Routes = [
  { path: 'base_city', component: ActionViewComponent },
  { path: 'barleycorn_point', component: ActionViewComponent },
  { path: 'sunshine_valley', component: ActionViewComponent },
  { path: 'traders_ridge', component: ActionViewComponent },
  { path: 'magnolia_wetlands', component: ActionViewComponent },
  { path: 'hokusai_cliffs', component: ActionViewComponent },
  { path: 'nautilus_plateau', component: ActionViewComponent },
  { path: 'petrol_bay', component: ActionViewComponent },
  { path: 'grand_haven', component: ActionViewComponent },
  { path: 'jugband_hills', component: ActionViewComponent },
  { path: 'cottonwood_forest', component: ActionViewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
