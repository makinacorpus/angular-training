/* tslint:disable:no-unused-variable */
import { inject, TestBed } from '@angular/core/testing';
import { BaseRequestOptions, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http } from '@angular/http';

import { APIService } from './api';

describe('APIService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        APIService,
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ],
    });
  });

  beforeEach(inject([MockBackend], (backend: MockBackend) => {
    const baseResponse = new Response(new ResponseOptions({ body: '{"count":811,"previous":null,"results":[{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/1\/","name":"bulbasaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/2\/","name":"ivysaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/3\/","name":"venusaur"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/4\/","name":"charmander"},{"url":"http:\/\/pokeapi.co\/api\/v2\/pokemon\/5\/","name":"charmeleon"}]}' }));
    backend.connections.subscribe((c: MockConnection) => c.mockRespond(baseResponse));
  }));

  it('should balbusaur as first pokemon', inject([APIService], (api: APIService) => {
    api.listAll().subscribe((res: any[]) => {
      expect(res[0].name).toBe('bulbasaur');
    });
  }));

})