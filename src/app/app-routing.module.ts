import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './core/containers';

const routes: Routes = [
  { path: '', redirectTo: '/zoo', pathMatch: 'full' },
  {
    path: 'zoo',
    loadChildren: () =>
      import('./zoo/zoo.module').then((m) => m.ZooModule)
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
