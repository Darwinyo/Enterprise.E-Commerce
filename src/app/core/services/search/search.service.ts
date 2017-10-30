import { SearchControllerUrl } from './../../../shared/consts/api-url.const';
import { serverUrl } from './../../../shared/consts/server-url.const';
import { SearchViewModel } from './../../viewmodels/search/search.viewmodel';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchService {
    urlSearchController = serverUrl + SearchControllerUrl;
    constructor(private http: Http) { }
    search(searchTerms: string): Observable<SearchViewModel> {
        return this.http.get(this.urlSearchController).map(
            (res) => res.json()
        );
    }
}
