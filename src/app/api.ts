import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class APIService {

  private cache:any = {};
  private obs: Observable<any>;

  constructor(private http: Http) {
     this.obs = new Observable(observer => {
       observer.next(this.cache);
     });
  }

  listAll(): Observable<any[]> {
    if(!this.cache.all) {
      return this.http.get('http://pokeapi.co/api/v2/pokemon/')
      .map(res => {
        this.cache.all = res.json().results;
        return this.cache.all;
      });
    } else {
      return this.obs.map(cache => cache.all);
    }
  }

  get(id:string): Observable<any> {
    if(!this.cache[id]) {
      return this.http.get('http://pokeapi.co/api/v2/pokemon/' + id)
      .map(res => {
        let pokemon = res.json();
        if(pokemon.detail) {
          return {error: pokemon.detail};
        } else {
          pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
          this.cache[id] = pokemon;
          return pokemon;
        }
      });
    } else {
      return this.obs.map(cache => cache[id]);
    }
  }
}