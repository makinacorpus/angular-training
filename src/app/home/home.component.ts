import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private pokemons:any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any>('http://pokeapi.co/api/v2/pokemon/')
    .subscribe(res => {
      this.pokemons = res.results.map(item => {
        return {
          id: item.url.split('/').reverse()[1],
          name: item.name
        }
      });
    });
  }
}
