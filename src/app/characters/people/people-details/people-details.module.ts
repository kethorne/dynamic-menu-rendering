import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PeopleDetailsPageRoutingModule } from './people-details-routing.module';

import { PeopleDetailsPage } from './people-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PeopleDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PeopleDetailsPage]
})
export class PeopleDetailsPageModule {}
