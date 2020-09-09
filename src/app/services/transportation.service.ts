import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {StarshipModel} from '../models/starship.model';


@Injectable({
  providedIn: 'root'
})
export class TransportationService {
  private _swTransportData = new BehaviorSubject<StarshipModel[]>([]);
  constructor(private http: HttpClient) { }
  
  get returnSWCharacterData() {
    return this._swTransportData.asObservable();
  }
  
  getStarshipData() {
    this.http.get('https://swapi.dev/api/starships/').subscribe((data: StarshipModel[]) => {
      // console.log(data);
      this._swTransportData.next(data);
    });
  }
  
  
}
