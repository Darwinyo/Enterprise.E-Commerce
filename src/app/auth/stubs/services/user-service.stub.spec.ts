import { UserRegistrationResponseModel } from './../../models/responses/user-registration-response/user-registration-response.model';
import { UserLoginResponseModel } from './../../models/responses/user-login-response/user-login-response.model';
import { UserService } from './../../services/user/user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

export function createUserServiceStub(checkUserResponse: boolean | Error,
    checkEmailResponse: boolean | Error,
    checkPhoneResponse: boolean | Error,
    userLoginResponse: UserLoginResponseModel | Error,
    userRegistrationResponse: UserRegistrationResponseModel | Error) {

    const service: UserService = jasmine.createSpyObj('UserService', [
        'checkUserLogin',
        'checkEmail',
        'checkPhone',
        'userLogin',
        'userRegistration']);

    const checkUserServiceResponse = checkUserResponse instanceof Error ?
        Observable.throw(checkUserResponse) : Observable.of(checkUserResponse);

    const checkEmailServiceResponse = checkEmailResponse instanceof Error ?
        Observable.throw(checkEmailResponse) : Observable.of(checkEmailResponse);

    const checkPhoneServiceResponse = checkPhoneResponse instanceof Error ?
        Observable.throw(checkPhoneResponse) : Observable.of(checkPhoneResponse);

    const userLoginServiceResponse = userLoginResponse instanceof Error ?
        Observable.throw(userLoginResponse) : Observable.of(userLoginResponse);

    const userRegistrationServiceResponse = userRegistrationResponse instanceof Error ?
        Observable.throw(userRegistrationResponse) : Observable.of(userRegistrationResponse);

    (service.checkUserLogin as jasmine.Spy).and.returnValue(checkUserServiceResponse);
    (service.checkEmail as jasmine.Spy).and.returnValue(checkEmailServiceResponse);
    (service.checkPhone as jasmine.Spy).and.returnValue(checkPhoneServiceResponse);
    (service.userLogin as jasmine.Spy).and.returnValue(userLoginServiceResponse);
    (service.userRegistration as jasmine.Spy).and.returnValue(userRegistrationServiceResponse);
    return service;
}
