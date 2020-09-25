import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {CharacterModel} from '../models/character.model';


@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  private _swCharacterData = new BehaviorSubject<CharacterModel[]>([]);
  constructor(private http: HttpClient) { }

  get returnSWCharacterData() {
    return this._swCharacterData.asObservable();
  }

  async getPeopleData() {
   await this.http.get('https://swapi.dev/api/people/').subscribe((data: CharacterModel[]) => {
      // console.log(data);
      this._swCharacterData.next(data);
    });
  }


}
