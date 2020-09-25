import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ActivationEnd, Router} from '@angular/router';

import {filter, map} from 'rxjs/operators';
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
showData: boolean = false;
routerLinkActive: boolean = false;
birthYear: string;
  constructor(private peopleService: PeopleService, private route: ActivatedRoute, private router: Router) {
      this.router.events
      .pipe(filter(e => e instanceof ActivationEnd && Object.keys(e.snapshot.params).length > 0),
          map(e => (e instanceof ActivationEnd ? e.snapshot.params : {}))).subscribe(params => {
          console.log(params);
          this.birthYear = params.birth_year;
  });
  }


  async ngOnInit() {
    await this.peopleService.getPeopleData();
    await  this.peopleService.returnSWCharacterData.subscribe((data) => {
      console.log(data);
      console.log(data.results);
      this.people = data.results
    });
    // this.showData = true;
  }

}

