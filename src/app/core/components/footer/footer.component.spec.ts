/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FooterComponent } from './footer.component';

describe('[CORE] [COMPONENT] FOOTER-COMPONENT', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent]
    });
  }));

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  afterEach(() => {
    component = null;
    fixture = null;
  });
  it('should create instance component', async(() => {
    expect(component).toBeTruthy();
  }));
});
