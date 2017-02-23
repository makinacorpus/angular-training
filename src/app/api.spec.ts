/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { defer } from 'rxjs/observable/defer';

import { APIService } from './api';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('APIService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let apiService: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        APIService,
        HttpClient
      ],
      imports: [
        HttpClientModule
      ]
    });
  });

  beforeEach(() => {
    // Mock HttpClient requests
    // https://angular.io/guide/testing#testing-http-services
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new APIService(<any> httpClientSpy);
  });

  it('should balbusaur as first pokemon', () => {
    const expectedHeroes: any = {
      results: [{ id: 1, name: 'A' }, { id: 2, name: 'B' }]
    };

    httpClientSpy.get.and.returnValue(asyncData(expectedHeroes));

    apiService.listAll().subscribe((res: any[]) => {
      expect(res[0].name).toBe('A');
    });
    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');

  });

})
