import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private pokemon:any;
  private error:string;
  private isLoading:boolean = true;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.http.get<any>('https://pokeapi.co/api/v2/pokemon/' + params['id'])
      .subscribe(res => {
        this.isLoading = false;
        let pokemon = res;
        if(pokemon.detail) {
          this.error = pokemon.detail;
        } else {
          pokemon.type = pokemon.types.filter(type => type.slot==1)[0].type.name;
          this.pokemon = pokemon;
        }
      });
    });
  }

}
