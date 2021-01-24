import { RegistroDTO } from './../../models/registro.dto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { RegistroService } from '../../services/domain/registro.service';

@IonicPage()
@Component({
  selector: 'page-view-registro',
  templateUrl: 'view-registro.html',
})
export class ViewRegistroPage {

  registro: RegistroDTO;
  registroAtualizado: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public registroService: RegistroService,
    public loadingCtrl: LoadingController) {

    this.registro = this.navParams.get('registro');
  }

  loadRegistro() {
    const loader = this.presentLoading();
    this.registroService.findById(this.registro.id)
      .subscribe(response => {
        this.registro = response
        loader.dismiss();
      },
        error => {
          console.log(error);
          loader.dismiss();
        });
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

  editRegistro(registro: RegistroDTO) {
    this.navCtrl.push('EditRegistroPage', {
      registro: registro,
      reloadRegistroAposAtualizacao: this.reloadRegistroAposAtualizacao
    });
  }

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  reloadRegistroAposAtualizacao = () => {
    this.loadRegistro();
  };

}
