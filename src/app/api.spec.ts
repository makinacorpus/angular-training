/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { defer } from 'rxjs/observable/defer'

import { APIService } from './api';

/** Create async observable that emits-once and completes
 *  after a JS engine turn */
export function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('APIService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let apiService : APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        APIService,
        HttpClient
      ],
      imports: [HttpClientModule]
    });

    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    apiService = new APIService(<any> httpClientSpy);
  });

  it('should balbusaur as first pokemon', inject([APIService], (api: APIService) => {
    const expectedResponse = { body: '{"count":811,"previous":null,"results":[{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/1\/","name":"bulbasaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/2\/","name":"ivysaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/3\/","name":"venusaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/4\/","name":"charmander"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/5\/","name":"charmeleon"}]}' }
    httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

    apiService.listAll().subscribe((res: any[]) => {
      expect(res[0].name).toBe('bulbasaur');
    });

  }));


  describe('errors tests', () => {
    let httpClientSpy: { get: jasmine.Spy };
    let apiService : APIService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          APIService,
          HttpClient
        ],
        imports: [HttpClientModule]
      });

      httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
      apiService = new APIService(<any> httpClientSpy);
    });

    it('should balbusaur as first pokemon', inject([APIService], (api: APIService) => {
      const expectedResponse = { body: '{"count":811,"previous":null,"results":[{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/1\/","name":"bulbasaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/2\/","name":"ivysaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/3\/","name":"venusaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/4\/","name":"charmander"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/5\/","name":"charmeleon"}]}' }
      httpClientSpy.get.and.returnValue(asyncData(expectedResponse));

      apiService.listAll().subscribe((res: any[]) => {
        expect(res[0].name).toBe('bulbasaur');
      });

    }));

  });

});
