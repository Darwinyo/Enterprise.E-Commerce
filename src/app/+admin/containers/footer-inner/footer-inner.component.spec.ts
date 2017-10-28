/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterInnerComponent } from './footer-inner.component';

xdescribe('FooterInnerComponent', () => {
  let component: FooterInnerComponent;
  let fixture: ComponentFixture<FooterInnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterInnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
