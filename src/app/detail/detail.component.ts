import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { POKEMONS } from '../config';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  private pokemon:any;
  private error:string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let search = POKEMONS.filter(pokemon => pokemon.id == params['id']);
      if(search.length==0) {
        this.error = 'Cannot find this pokemon.';
      } else if(search.length > 1) {
        this.error = 'Several pokemons match this id.';
      } else {
        this.pokemon = search[0];
      }
    });
  }

}
