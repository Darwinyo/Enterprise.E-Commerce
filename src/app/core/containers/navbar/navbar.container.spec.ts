import { UserService } from './../../../auth/services/user/user.service';
import { MockBackend } from '@angular/http/testing';
import { BaseRequestOptions, Http } from '@angular/http';
import { ProductReviewService } from './../../../product/services/product-review/product-review.service';
import { RouterStub } from './../../../shared/stubs/router.stub';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginNavComponent } from './../../../auth/components/login-nav/login-nav.component';
import { NavSearchbarComponent } from './../../components/nav-searchbar/nav-searchbar.component';
import { CartComponent } from './../../components/cart/cart.component';
import { AuthModule } from './../../../auth/auth.module';
import { cold } from 'jasmine-marbles';
import { Observable } from 'rxjs/Observable';
import { Store, StoreModule, combineReducers } from '@ngrx/store';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import * as fromCore from './../../reducers/core-state.reducer';
import * as fromRoot from './../../../reducers/app-state.reducer';
import * as fromAuth from './../../../auth/reducers/auth-state.reducer';
import * as LoginNavComponentActions from './../../../auth/actions/login-nav-component.actions';
import { NavbarContainer } from './navbar.container';
import { MatIconModule, MatCheckboxModule, MatInputModule, MatButtonModule, MatFormFieldModule } from '@angular/material';

xdescribe('[CORE] [CONTAINER] NAVBARCONTAINER', () => {
    let component: NavbarContainer;
    let fixture: ComponentFixture<NavbarContainer>;
    let coreStore: Store<fromCore.State>;
    let actions: Observable<any>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoginNavComponent,
                CartComponent,
                NavSearchbarComponent,
                NavbarContainer],
            imports: [
                FormsModule,
                StoreModule.forRoot({
                    ...fromRoot.routerReducers,
                    auth: combineReducers(fromAuth.authStateReducer),
                    core: combineReducers(fromCore.coreStateReducer)
                }),
                MatIconModule,
                MatCheckboxModule,
                MatInputModule,
                MatButtonModule,
                MatFormFieldModule,
            ],
            providers: [
                { provide: Router, useClass: RouterStub },
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                ProductReviewService,
                UserService,
            ]
        });
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(NavbarContainer);
        component = fixture.componentInstance;
        coreStore = TestBed.get(Store);
        spyOn(coreStore, 'dispatch').and.callThrough();
        fixture.detectChanges();
    }));
    it('should dispatch TogglePassword Action when onTogglePassword Triggered', async(() => {
        fixture.whenStable().then(
            () => {
                actions = cold('a|', { a: component.onTogglePassword() });
                expect(coreStore.dispatch).toHaveBeenCalledWith(new LoginNavComponentActions.TogglePassword());
            }
        );
    }));
});
