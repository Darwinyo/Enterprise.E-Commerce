import { searchResponse } from './../../../shared/mock-data/search-response';
/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchService } from './search.service';
import { createSearchStub } from '../../stubs/services/search.stub.spec';

describe('[CORE] [SERVICE] SEARCH-SERVICE', () => {
  let searchService: SearchService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchService]
    });
  });
  beforeEach(() => {
    searchService = createSearchStub(searchResponse);
  });

  it('should return Objects when service called', () => {
    searchService.search('test').subscribe((res) => {
      expect(res).toEqual(searchResponse);
    });
  });
  it('should throw error when service error', () => {
    const err = new Error('Backend Error');
    searchService = createSearchStub(err);
    searchService.search('test').subscribe((res) => null,
      (error) => { expect(error).toEqual(err); });
  });
});
