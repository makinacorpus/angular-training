import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

@Injectable()
export class APIService {

  private cache:any = {};
  private obs: Observable<any>;

  constructor(private http: HttpClient) {
  }

  listAll(): Observable<any[]> {
    if(!this.cache.all) {
      return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/')
      .pipe(
        map(res => {
          this.cache.all = res.results;
          return this.cache.all;
        })
      )
    } else {
      return of(this.cache.all);
    }
  }

  get(id:string): Observable<any> {
    if(!this.cache[id]) {
      return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + id)
      .pipe(
        map(pokemon => {
          if(pokemon.detail) {
            return {error: pokemon.detail};
          } else {
            pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
            this.cache[id] = pokemon;
            return pokemon;
          }
        })
      )
    } else {
      return of(this.cache[id])
    }
  }
}
