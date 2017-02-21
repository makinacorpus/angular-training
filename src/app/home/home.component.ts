import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() message: string;

  private pokemons:any[] = [
    {id: 1, name: 'Balbusar', pv: 75, size: 150, type: 'grass'},
    {id: 2, name: 'Carapuce', pv: 31, size: 45, type: 'electric'},
    {id: 2, name: 'Salamesh', pv: 18, size: 75, type: 'fire'},
  ];

  constructor() { }

  ngOnInit() {
  }

  changeMessage() {
    this.message = 'This is a new message';
  }

  isStronger(pokemon:any) {
    let max_pv = Math.max(...this.pokemons.map(pok => pok.pv));
    return (pokemon.pv == max_pv)
  }

  getClasses(pokemon:any) {
    return {
      grass: pokemon.type == 'grass',
      electric: pokemon.type == 'electric',
      fire: pokemon.type == 'fire',
      small: pokemon.size < 50,
      medium: pokemon.size < 100 && pokemon.size >= 50,
      big: pokemon.size >= 100
    }
  }
}
