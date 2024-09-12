import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { paysuccessPage } from './paysuccess.page';

const routes: Routes = [
  {
    path: '',
    component: paysuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class paysuccessPageRoutingModule {}
