import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() message: string;

  private pokemons:any[] = [
    {id: 1, name: 'Balbusar', pv: 75},
    {id: 2, name: 'Carapuce', pv: 31},
    {id: 2, name: 'Salamesh', pv: 18},
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
}
