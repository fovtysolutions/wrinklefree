// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhoneIconComponent } from './phone-icon/phone-icon.component';

@NgModule({
  declarations: [PhoneIconComponent],
  imports: [
    CommonModule
  ],
  exports: [PhoneIconComponent]  // Exporting the PhoneIconComponent
})
export class SharedModule { }