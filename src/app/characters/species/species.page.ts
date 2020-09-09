import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IonContent} from '@ionic/angular';
import {SpeciesService} from '../../services/species.service';
import {SpeciesModel} from '../../models/species.model';


@Component({
  selector: 'app-species',
  templateUrl: './species.page.html',
  styleUrls: ['./species.page.scss'],
})
export class SpeciesPage implements OnInit {

species: SpeciesModel[];
  @ViewChild('content', { static: false}) content: IonContent;


  constructor(private speciesService: SpeciesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
this.speciesService.getSpeciesData();
this.speciesService.returnSWSpeciesData.subscribe((data) => {
  // console.log(data);
  console.log(data.results);
  this.species = data.results;
});
}

}
