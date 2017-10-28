import { ConfirmModel } from './shared/models/dialogs/confirm.model';
import { AlertModel } from './shared/models/dialogs/alert.model';
import { ReplaySubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { TdDialogService, IAlertConfig, IConfirmConfig } from '@covalent/core';
import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import * as fromCore from './core/reducers/core-state.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string;
  error$: Observable<AlertModel | null>;
  alert$: Observable<AlertModel | null>;
  confirm$: Observable<ConfirmModel | null>;
  unsubscribe$: ReplaySubject<boolean>;
  constructor(
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef,
    private coreStore: Store<fromCore.State>) {
    this.error$ = this.coreStore.select(fromCore.getError);
    this.alert$ = this.coreStore.select(fromCore.getAlert);
    this.confirm$ = this.coreStore.select(fromCore.getConfirm);
    this.unsubscribe$ = new ReplaySubject(1);
    this.title = 'Enterprise App';
  }
  ngOnInit(): void {
    this.error$
      .filter((alertModel) => alertModel !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((alertModel: AlertModel) => {
        this.onAlert(alertModel);
      });
    this.alert$
      .filter((alertModel: AlertModel) => alertModel !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((alertModel: AlertModel) => {
        this.onAlert(alertModel);
      });
    this.confirm$
      .filter((confirmModel: ConfirmModel) => confirmModel !== null)
      .takeUntil(this.unsubscribe$)
      .subscribe((confirmModel: ConfirmModel) => {
        this.onConfirm(confirmModel);
      });
  }
  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
  onAlert(alertModel: AlertModel) {
    this._dialogService.openAlert(<IAlertConfig>{
      closeButton: alertModel.closeButton,
      message: alertModel.message,
      title: alertModel.title,
      viewContainerRef: this._viewContainerRef
    });
  }
  onConfirm(confirmModel: ConfirmModel) {
    this._dialogService.openConfirm(<IConfirmConfig>{
      cancelButton: confirmModel.cancelButton,
      acceptButton: confirmModel.acceptButton,
      message: confirmModel.message,
      title: confirmModel.title,
      viewContainerRef: this._viewContainerRef
    });
  }
}
