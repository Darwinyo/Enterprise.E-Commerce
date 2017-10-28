import { login } from './../../../shared/mock-data/login';
import { CovalentLoadingModule } from '@covalent/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserLoginViewModel } from './../../viewmodels/user-login/user-login.viewmodel';
import { hostTestUrl } from './../../../shared/consts/host-url.const';
import { FormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginNavComponent } from './login-nav.component';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';

describe('[AUTH] [COMPONENT] LOGIN-NAV-COMPONENT', () => {
  let component: LoginNavComponent;
  let fixture: ComponentFixture<LoginNavComponent>;
  let emailtxtbox: HTMLInputElement;
  let passtxtbox: HTMLInputElement;
  let remembermechkbox: HTMLInputElement;
  let submitbtn: HTMLButtonElement;
  let userLoginViewModel: UserLoginViewModel;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,
        BrowserAnimationsModule,
        CovalentLoadingModule,
        MatCheckboxModule,
        MatButtonModule,
        MatInputModule],
      declarations: [LoginNavComponent]
    });
  }));

  beforeEach(async (() => {
    fixture = TestBed.createComponent(LoginNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));
  beforeEach(async (() => {
    emailtxtbox = fixture.debugElement.query(By.css('#inputEmail')).nativeElement;
    passtxtbox = fixture.debugElement.query(By.css('#inputPassword')).nativeElement;
    remembermechkbox = fixture.debugElement.query(By.css('#rememberme_chkbox label')).nativeElement;
    submitbtn = fixture.debugElement.query(By.css('#login_btn')).nativeElement;
    userLoginViewModel = login;
  }));
  afterEach(() => {
    component = null;
    fixture = null;
    emailtxtbox = null;
    passtxtbox = null;
    remembermechkbox = null;
    submitbtn = null;
    userLoginViewModel = null;
  });
  it('should be type text inputPassword when hidden pass is true', () => {
    component.hiddenpass = true;
    fixture.detectChanges();
    expect(passtxtbox.type).toBe('text');
  });
  it('should be type password inputPassword when hidden pass is false', () => {
    component.hiddenpass = false;
    fixture.detectChanges();
    expect(passtxtbox.type).toBe('password');
  });
  it('should be emit event with correct data when loginbtn clicked', async (() => {
    spyOn(component.loginEvent, 'emit');

    fixture.whenStable().then(() => {
      emailtxtbox.value = userLoginViewModel.userLogin;
      passtxtbox.value = userLoginViewModel.password;
      remembermechkbox.checked = userLoginViewModel.rememberme;
      emailtxtbox.dispatchEvent(new Event('input'));
      passtxtbox.dispatchEvent(new Event('input'));
      remembermechkbox.click();
      submitbtn.click();
      expect(component.loginEvent.emit).toHaveBeenCalledWith(userLoginViewModel);
    });
  }));
});
