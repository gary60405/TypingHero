import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  StageComponent,
  ScoreBoardComponent
} from './containers';


export const routes: Routes = [
  {
    path: '',
    component: StageComponent
  },
  {
    path: 'scoreBoard',
    component: ScoreBoardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZooRoutingModule {}
