import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PeopleService} from '../../../services/people.service';
import {CharacterModel} from '../../../models/character.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.page.html',
  styleUrls: ['./people-details.page.scss'],
})
export class PeopleDetailsPage implements OnInit {

  peopleDetails: CharacterModel[];
  showData: boolean = false;
  birthYear: string;
  characterDetailForm; FormGroup;
  constructor(private route: ActivatedRoute, private swDetailService: PeopleService) { }

  ngOnInit() {
    this.swDetailService.getPeopleData();
    this.swDetailService.returnSWCharacterData.subscribe((data: CharacterModel[]) => {
      this.peopleDetails = data.results;
    });
    this.createCharacterDetailForm();
    this.showData = true;
  }
  
  
  createCharacterDetailForm() {
    this.characterDetailForm = new FormGroup({
      name: new FormControl(this.peopleDetails.name, {
        updateOn: 'blur',
      }),
      gender: new FormControl(this.peopleDetails.results.gender,{
        updateOn: 'blur',
      }),
      eyeColor: new FormControl(this.peopleDetails.results.eye_color, {
        updateOn: 'blur'
      }),
      hairColor: new FormControl(this.peopleDetails.results.hair_color, {
        updateOn: 'blur'
      }),
      height: new FormControl(this.peopleDetails.results.height, {
        updateOn: 'blur'
      }),
      skinColor: new FormControl(this.peopleDetails.results.skin_color, {
        updateOn: 'blur'
      }),
      mass: new FormControl(this.peopleDetails.results.mass, {
        updateOn: 'blur'
      }),
    });
  }
}
