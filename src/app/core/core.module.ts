import { SearchService } from './services/search/search.service';
import { NotificationComponent } from './components/notification/notification.component';
import { MessageMenuComponent } from './components/message-menu/message-menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChatHub } from './signalr/chathub/chat.hub';
import { ChatService } from './services/chat/chat.service';
import { ChatEffects } from './effects/chat.effects';
import { ChatComponent } from './components/chat/chat.component';
import { NavbarEffects } from './effects/navbar.effects';
import { EffectsModule } from '@ngrx/effects';
import { coreStateReducer } from './reducers/core-state.reducer';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
// Modules
import { AuthModule } from './../auth/auth.module';

// // Components
import { NavSearchbarComponent } from './components/nav-searchbar/nav-searchbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { CartComponent } from './components/cart/cart.component';

// // Containers
import { NavbarContainer } from './containers/navbar/navbar.container';
import { ErrorNotFoundComponent } from './pages/error-not-found/error-not-found.component';

// Layouts
import { CoreLayout } from './layouts/core/core.layout';

//#region Containers

//#endregion
// Routes
import { AppRouteModule } from './routes/app-route.module';
import { HttpClientModule } from '@angular/common/http';

// Services


// SignalR

import { MatListModule, MatMenuModule } from '@angular/material';
import { CovalentSearchModule, CovalentNotificationsModule, CovalentMenuModule, CovalentExpansionPanelModule } from '@covalent/core';
@NgModule({
  declarations: [
    CartComponent,
    FooterComponent,
    NavSearchbarComponent,
    UserMenuComponent,
    MessageMenuComponent,
    NotificationComponent,
    ErrorNotFoundComponent,
    NavbarContainer,
    ChatComponent,
    CoreLayout
  ],
  imports: [
    BrowserAnimationsModule,
    MatListModule,
    MatMenuModule,
    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentExpansionPanelModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule,
    AppRouteModule,
    StoreModule.forFeature('core', coreStateReducer),
    EffectsModule.forFeature([NavbarEffects, ChatEffects])
  ],
  exports: [
    CoreLayout,
    FooterComponent,
    ErrorNotFoundComponent,
    NavbarContainer,
    ChatComponent
  ],
  providers: [
    ChatService,
    ChatHub,
    SearchService
  ]
})
export class CoreModule { }
