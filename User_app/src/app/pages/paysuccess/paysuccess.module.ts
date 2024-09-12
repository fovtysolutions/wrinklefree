import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { paysuccessPageRoutingModule } from './paysuccess-routing.module';

import { paysuccessPage } from './paysuccess.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    paysuccessPageRoutingModule
  ],
  declarations: [paysuccessPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class paysuccessPageModule {}
