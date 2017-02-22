import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class APIService {

  constructor(private http: Http) {}

  listAll(): Observable<any[]> {
    return this.http.get('http://pokeapi.co/api/v2/pokemon/')
    .map(res => {
      return res.json().results;
    });
  }

  get(id:string): Observable<any> {
    return this.http.get('http://pokeapi.co/api/v2/pokemon/' + id)
    .map(res => {
      let pokemon = res.json();
      if(pokemon.detail) {
        return {error: pokemon.detail};
      } else {
        pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
        return pokemon;
      }
    });
  }
}