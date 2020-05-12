import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolderPageRoutingModule } from './folder-routing.module';

import { FolderPage } from './folder.page';
import {CrudComponent} from './crud/crud.component';
import {InfoComponent} from './info/info.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    FolderPageRoutingModule,
  ],
  declarations: [
      FolderPage,
      CrudComponent,
      InfoComponent
  ]
})
export class FolderPageModule {}
