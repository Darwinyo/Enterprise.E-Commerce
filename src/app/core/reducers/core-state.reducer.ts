import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './../../auth/reducers/auth-state.reducer';
import * as fromNavbarContainer from './../reducers/navbar-container.reducer';
import * as fromChat from './../reducers/chat.reducer';
import * as fromCore from './../reducers/core.reducer';

export interface CoreState {
    navbarContainerState: fromNavbarContainer.State;
    chatState: fromChat.State;
    coreState: fromCore.State;
}
export interface State extends fromAuth.State {
    coreState: CoreState;
}

export const coreStateReducer = {
    navbarContainerState: fromNavbarContainer.navbarContainerReducer,
    chatState: fromChat.chatReducer,
    coreState: fromCore.coreReducer
};
export const selectCoreState = createFeatureSelector<CoreState>('core');

export const selectNavbarContainerState = createSelector(
    selectCoreState,
    (state: CoreState) => state.navbarContainerState
);
export const getNavbarContainerLoginMenu = createSelector(
    selectNavbarContainerState,
    fromNavbarContainer.getNavbarContainerLoginMenu
);
export const getNavbarContainerLogged = createSelector(
    selectNavbarContainerState,
    fromNavbarContainer.getNavbarContainerLogged
);
export const getNavbarContainerPending = createSelector(
    selectNavbarContainerState,
    fromNavbarContainer.getNavbarContainerPending
);
export const getNavbarContainerError = createSelector(
    selectNavbarContainerState,
    fromNavbarContainer.getNavbarContainerError
);
export const selectChatState = createSelector(
    selectCoreState,
    (state: CoreState) => state.chatState
);

export const getShowChat = createSelector(
    selectChatState,
    fromChat.getShowChat
);
export const getChatToggled = createSelector(
    selectChatState,
    fromChat.getChatToggled
);
export const getChats = createSelector(
    selectChatState,
    fromChat.getChats
);
export const getChatLoading = createSelector(
    selectChatState,
    fromChat.getChatLoading
);
export const getChatError = createSelector(
    selectChatState,
    fromChat.getError
);
export const getConnectionId = createSelector(
    selectChatState,
    fromChat.getConnectionId
);
export const getGroupId = createSelector(
    selectChatState,
    fromChat.getGroupId
);
export const getConnectingChat = createSelector(
    selectChatState,
    fromChat.getConnectingChat
);
export const getConnectedChat = createSelector(
    selectChatState,
    fromChat.getConnectedChat
);

//#region popup state
export const selectPopUpState = createSelector(
    selectCoreState,
    (state: CoreState) => state.coreState
);

export const getAlert = createSelector(
    selectPopUpState,
    fromCore.getAlert
);
export const getError = createSelector(
    selectPopUpState,
    fromCore.getError
);
export const getConfirm = createSelector(
    selectPopUpState,
    fromCore.getConfirm
);
//#endregion
