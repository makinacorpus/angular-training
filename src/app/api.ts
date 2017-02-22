import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class APIService {

  constructor(private http: HttpClient) {}

  listAll(): Observable<any[]> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/')
    .pipe(
      map(res => {
        return res.results;
      })
    )
  }

  get(id:string): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + id)
    .pipe(
      map(pokemon => {
        if(pokemon.detail) {
          return {error: pokemon.detail};
        } else {
          pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
          return pokemon;
        }
      })
    )
  }
}
