import { RegistroDTO } from './../../models/registro.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { RegistroService } from '../../services/domain/registro.service';

@IonicPage()
@Component({
  selector: 'page-view-registro',
  templateUrl: 'view-registro.html',
})
export class ViewRegistroPage {

  registro: RegistroDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public registroService: RegistroService) {

    this.registro = this.navParams.get('registro');
  }

  deleteRegistro(registroId: string) {
    this.registroService.delete(registroId)
      .subscribe(() => {
        this.navCtrl.pop();
      }, error => {
        console.log(error);
      })
  }

  showConfirmDeleteItem(registroId: string) {
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir o registro?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteRegistro(registroId);
          }
        }
      ]
    });
    confirm.present();
  }

}
