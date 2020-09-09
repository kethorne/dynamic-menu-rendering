import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {SpeciesModel} from '../models/species.model';
import {CharacterModel} from '../models/character.model';


@Injectable({
  providedIn: 'root'
})

export class SpeciesService {
  private _swSpeciesData = new BehaviorSubject<SpeciesModel[]>([]);
  
  constructor(private http: HttpClient) {}
  
  get returnSWSpeciesData() {
    return this._swSpeciesData.asObservable();
  }
  
  getSpeciesData() {
    this.http.get('https://swapi.dev/api/species/').subscribe((data: SpeciesModel[]) => {
      this._swSpeciesData.next(data);
    });
  }
}
