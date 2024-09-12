import { ComponentFixture, TestBed } from '@angular/core/testing';
import { paysuccessPage } from './paysuccess.page';

describe('paysuccessPage', () => {
  let component: paysuccessPage;
  let fixture: ComponentFixture<paysuccessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(paysuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
