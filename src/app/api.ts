import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class APIService {

  private cache:any[];

  constructor(private http: HttpClient) {}

  listAll(): Observable<any[]> {
    if(!this.cache) {
      return this.http.get<any>('http://pokeapi.co/api/v2/pokemon/')
      .map(res => {
        this.cache = res.results;
        return this.cache;
      });
    } else {
      return new Observable(observer => {
        observer.next(this.cache);
      });
    }
  }

  get(id:string): Observable<any> {
    return this.http.get<any>('http://pokeapi.co/api/v2/pokemon/' + id)
    .map(pokemon => {
      if(pokemon.detail) {
        return {error: pokemon.detail};
      } else {
        pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
        return pokemon;
      }
    });
  }
}
