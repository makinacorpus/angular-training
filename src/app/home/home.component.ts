import { Component, OnInit, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private pokemons:any[] = [];
  private isLoading:boolean = true;

  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('http://pokeapi.co/api/v2/pokemon/')
    .subscribe(res => {
      this.isLoading = false;
      this.pokemons = res.json().results.map(item => {
        return {
          id: item.url.split('/').reverse()[1],
          name: item.name
        }
      });
    });
  }
}
