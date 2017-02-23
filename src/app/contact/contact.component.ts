import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  sendMail(data) {
      console.log('-------- SEND EMAIL --------');
      console.log(data.email);
      console.log(data.pokemonName);
      console.log(data.pokemonType);
  }

}
