import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { map } from 'rxjs/operators';
import {IonContent} from '@ionic/angular';
import {PeopleService} from '../../services/people.service';
import {CharacterModel} from '../../models/character.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.page.html',
  styleUrls: ['./people.page.scss'],
})
export class PeoplePage implements OnInit {

  @ViewChild('content', { static: false}) content: IonContent;
  people: CharacterModel[];

  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) { }


  ngOnInit() {
    this.peopleService.getPeopleData();
    this.peopleService.returnSWCharacterData.subscribe((data) => {
      // console.log(data);
      console.log(data.results);

      this.people = data.results;
    });
  }

}

