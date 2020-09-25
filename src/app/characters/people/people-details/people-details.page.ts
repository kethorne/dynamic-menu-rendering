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
    peopleDetails: CharacterModel[] = [];
    showData: boolean = false;
    birthYear: string;
    characterDetailForm;
    FormGroup;

    constructor(private route: ActivatedRoute, private swDetailService: PeopleService) {
    }

    async ngOnInit() {
        this.showData = false;
        await this.route.paramMap.subscribe(paramMap => {
            if (paramMap.get('birth_year')) {
                this.birthYear = paramMap.get('birth_year');
            }
        });

        await this.swDetailService.getPeopleData();
        await this.swDetailService.returnSWCharacterData.subscribe((data: CharacterModel[]) => {
            console.log(data);
            console.log(data.results);
            this.peopleDetails = data.results;
            this.showData = true;
        });
    }
}



