import { BackEndValidatorDirective } from './directives/validators/backend-validator.directive';
//#region Vendor

//#region Teradata Covalent
import { CovalentLayoutModule, CovalentStepsModule, CovalentLoadingModule } from '@covalent/core';
// (optional) Additional Covalent Modules imports
import { CovalentHttpModule } from '@covalent/http';
import { CovalentHighlightModule } from '@covalent/highlight';
import { CovalentMarkdownModule } from '@covalent/markdown';
import { CovalentDynamicFormsModule } from '@covalent/dynamic-forms';
//#endregion

//#region Angular Material
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatCardModule,
  MatToolbarModule,
  MatIconModule,
  MatMenuModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressBarModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
//#endregion

//#region FlexLayout
import { FlexLayoutModule } from '@angular/flex-layout';
//#endregion

//#region Ngrx Suites
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
//#endregion

//#region Angular
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
//#endregion

//#endregion

//#region Custom

//#region Effects
import { RegistrationPageEffects } from './effects/registration-page.effects';
import { LoginNavComponentEffects } from './effects/login-nav.effects';
import { AuthEffects } from './effects/auth.effects';
import { LoginPageEffects } from './effects/login-page.effects';
//#endregion

//#region Services
import { UserService } from './services/user/user.service';
import { AuthGuardService } from './services/auth/auth-guard.service';
//#endregion

//#region Reducers
import { authStateReducer } from './reducers/auth-state.reducer';
//#endregion

//#region Routes
import { AuthRouteModule } from './routes/auth-route.module';
//#endregion

//#region Containers

//#endregion

//#region Pages
import { RegistrationPage } from './pages/registration/registration.page';
import { LoginPage } from './pages/login/login.page';
//#endregion

//#region Components
import { LoginNavComponent } from './components/login-nav/login-nav.component';
//#endregion

//#endregion

@NgModule({
  declarations: [
    RegistrationPage,
    LoginPage,
    LoginNavComponent,
    BackEndValidatorDirective
  ],
  imports: [
    //#region Angular
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //#endregion
    AuthRouteModule,
    //#region Teradata Covalent
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentLoadingModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule.forRoot(),
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    //#endregion

    //#region Angular Material
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    //#endregion

    //#region FlexLayout
    FlexLayoutModule,
    //#endregion

    //#region Ngrx Suites
    StoreModule.forFeature('auth', authStateReducer),
    EffectsModule.forFeature([AuthEffects, LoginPageEffects, RegistrationPageEffects, LoginNavComponentEffects])
    //#endregion
  ],
  providers: [
    UserService,
    AuthGuardService
  ],
  exports: [
    BrowserAnimationsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    //#region Teradata Covalent
    CovalentLayoutModule,
    CovalentStepsModule,
    CovalentLoadingModule,
    // (optional) Additional Covalent Modules imports
    CovalentHttpModule,
    CovalentHighlightModule,
    CovalentMarkdownModule,
    CovalentDynamicFormsModule,
    //#endregion
    FlexLayoutModule,
    //#region Angular Material
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    //#endregion
    LoginNavComponent
  ]
})
export class AuthModule { }
