import { registrationResponse } from './../../../shared/mock-data/registration-response';
import { loginResponse } from './../../../shared/mock-data/login-response';
import { login } from './../../../shared/mock-data/login';
import { registration } from './../../../shared/mock-data/registration';
//#region imports
import { UserRegistrationResponseModel } from './../../models/responses/user-registration-response/user-registration-response.model';
import { UserLoginResponseModel } from './../../models/responses/user-login-response/user-login-response.model';
import { UserLoginViewModel } from './../../viewmodels/user-login/user-login.viewmodel';
import { UserLoginModel } from './../../models/user/user-login/user-login.model';
import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from './user.service';
import { Http, BaseRequestOptions, ResponseOptions, ResponseType, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
//#endregion
describe('[AUTH] [SERVICE] USER-SERVICE :', () => {
    //#region properties
    let userLoginModel: UserLoginModel;
    let userLoginViewModel: UserLoginViewModel;
    let userLoginResponseModel: UserLoginResponseModel;
    let userRegistrationResponseModel: UserRegistrationResponseModel;
    let userService: UserService;
    let mockBackend: MockBackend;
    let mockresponse: ResponseOptions;
    //#endregion
    //#region init items and dispose
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
                        return new Http(backend, defaultOptions);
                    },
                    deps: [MockBackend, BaseRequestOptions]
                },
                UserService
            ]
        });
    }));
    beforeEach(async((inject([UserService, MockBackend], (service: UserService, backend: MockBackend) => {
        userService = service;
        mockBackend = backend;
    }))));
    beforeEach(() => {
        userLoginModel = registration;
        userLoginViewModel = login;
        userLoginResponseModel = loginResponse;
        userRegistrationResponseModel = registrationResponse;
    });
    afterEach(async(() => {
        userLoginModel = null;
        userLoginViewModel = null;
        userLoginResponseModel = null;
        userRegistrationResponseModel = null;
        userService = null;
        mockBackend = null;
        mockresponse = null;
    }));
    //#endregion
    it('should login successfully', (done) => {
        userLoginResponseModel.isLogged = true;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userLoginResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userLogin(userLoginViewModel).subscribe((response) => {
            expect(response.isLogged).toBeTruthy();
        });
        done();
    });
    it('should login failure', (done) => {
        userLoginResponseModel.isLogged = false;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userLoginResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userLogin(userLoginViewModel).subscribe((response) => {
            expect(response.isLogged).toBeFalsy();
        });
        done();
    });
    it('should return correct response login', (done) => {
        userLoginResponseModel.isLogged = false;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userLoginResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userLogin(userLoginViewModel).subscribe((response) => {
            expect(response).toEqual(userLoginResponseModel);
        });
        done();
    });
    it('should register successfully', (done) => {
        userRegistrationResponseModel.result = true;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userRegistrationResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userRegistration(userLoginModel).subscribe((response) => {
            expect(response.result).toBeTruthy();
        });
        done();
    });
    it('should register failure', (done) => {
        userRegistrationResponseModel.result = false;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userRegistrationResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userRegistration(userLoginModel).subscribe((response) => {
            expect(response.result).toBeFalsy();
        });
        done();
    });
    it('should return correct response register', (done) => {
        userRegistrationResponseModel.result = false;
        mockresponse = new ResponseOptions({
            body: JSON.stringify(userRegistrationResponseModel)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.userRegistration(userLoginModel).subscribe((response) => {
            expect(response).toEqual(userRegistrationResponseModel);
        });
        done();
    });
    it('should return true check user login', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(true)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkUserLogin(userLoginModel.userLogin).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        done();
    });
    it('should return false check user login', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(false)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkUserLogin(userLoginModel.userLogin).subscribe((response) => {
            expect(response).toBeFalsy();
        });
        done();
    });
    it('should return true check email', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(true)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkEmail(userLoginModel.email).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        done();
    });
    it('should return false check email', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(false)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkEmail(userLoginModel.email).subscribe((response) => {
            expect(response).toBeFalsy();
        });
        done();
    });
    it('should return true check phone', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(true)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkPhone(userLoginModel.phoneNumber.toString()).subscribe((response) => {
            expect(response).toBeTruthy();
        });
        done();
    });
    it('should return false check phone', (done) => {
        mockresponse = new ResponseOptions({
            body: JSON.stringify(false)
        });
        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(mockresponse));
        });
        userService.checkPhone(userLoginModel.phoneNumber.toString()).subscribe((response) => {
            expect(response).toBeFalsy();
        });
        done();
    });
});
