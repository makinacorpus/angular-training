import { Component, OnInit, Input } from '@angular/core';
import { APIService } from '../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private pokemons:any[] = [];
  private isLoading:boolean = true;

  constructor(private api: APIService) { }

  ngOnInit() {
    this.api.listAll()
    .subscribe(res => {
      this.isLoading = false;
      this.pokemons = res.map(item => {
        return {
          id: item.url.split('/').reverse()[1],
          name: item.name
        }
      })
    });
  }
}
