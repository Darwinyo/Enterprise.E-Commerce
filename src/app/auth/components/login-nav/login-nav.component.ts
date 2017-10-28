import { Observable } from 'rxjs/Rx';
import { UserLoginViewModel } from './../../../auth/viewmodels/user-login/user-login.viewmodel';
import { Component, OnInit, Output, EventEmitter, Input, ViewContainerRef } from '@angular/core';
import { TdDialogService, IAlertConfig } from '@covalent/core';

@Component({
  selector: 'app-auth-login-nav',
  templateUrl: './login-nav.component.html',
  styleUrls: ['./login-nav.component.scss']
})
export class LoginNavComponent implements OnInit {
  userLoginViewModel: UserLoginViewModel;
  @Input() hiddenpass: boolean;
  @Input() pending: boolean;
  @Output() togglePasswordEvent: EventEmitter<null>;
  @Output() loginEvent: EventEmitter<UserLoginViewModel>;
  constructor() {
    this.loginEvent = new EventEmitter<UserLoginViewModel>();
    this.togglePasswordEvent = new EventEmitter<null>();
    this.userLoginViewModel = <UserLoginViewModel>{};
  }
  ngOnInit() {

  }
  onNavLoginForm_Submit() {
    this.loginEvent.emit(this.userLoginViewModel);
  }
  onTogglePassword_Click() {
    this.togglePasswordEvent.emit();
  }
  passwordType(): string {
    return !this.hiddenpass ? 'password' : 'text';
  }
}
