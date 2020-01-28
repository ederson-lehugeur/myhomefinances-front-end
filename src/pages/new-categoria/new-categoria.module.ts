import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewCategoriaPage } from './new-categoria';

@NgModule({
  declarations: [
    NewCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCategoriaPage),
  ],
})
export class NewCategoriaPageModule {}
