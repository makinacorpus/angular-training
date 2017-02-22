import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { APIService } from '../api';

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
    private api: APIService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.api.get(params['id'])
      .subscribe(pokemon => {
        this.isLoading = false;
        if(pokemon.error) {
          this.error = pokemon.error;
        } else {
          this.pokemon = pokemon;
        }
      });
    });
  }

}
