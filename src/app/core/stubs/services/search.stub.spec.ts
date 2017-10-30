import { Observable } from 'rxjs/Rx';
import { SearchService } from './../../services/search/search.service';
import { SearchViewModel } from './../../viewmodels/search/search.viewmodel';
export function createSearchStub(searchResponse: SearchViewModel | Error) {
    const service: SearchService = jasmine.createSpyObj('SearchService', [
        'search'
    ]);

    const searchServiceResponse = searchResponse instanceof Error ?
        Observable.throw(searchResponse) : Observable.of(searchResponse);

    (service.search as jasmine.Spy).and.returnValue(searchServiceResponse);
    return service;
}
