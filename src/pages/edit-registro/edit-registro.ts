import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Loading, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ItemDTO } from '../../models/item.dto';
import { TipoRegistroDTO } from '../../models/tipo-registro.dto';
import { RegistroService } from '../../services/domain/registro.service';
import { ItemService } from '../../services/domain/item.service';
import { TipoRegistroService } from '../../services/domain/tipo-registro.service';
import { DateService } from '../../services/date.service';
import { RegistroDTO } from '../../models/registro.dto';

@IonicPage()
@Component({
  selector: 'page-edit-registro',
  templateUrl: 'edit-registro.html',
})
export class EditRegistroPage {

  formGroup: FormGroup;

  itens: ItemDTO[];
  tiposDeRegistros: TipoRegistroDTO[];
  registro: RegistroDTO;

  callback: Function;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public registroService: RegistroService,
    public itemService: ItemService,
    public tipoRegistroService: TipoRegistroService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public dateService: DateService) {

    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      valor: ['', [Validators.required, Validators.pattern('^[0-9]{1,8}(\.[0-9]{1,2})?$')]],
      dataHora: ['', [Validators.required]],
      itemId: ['', [Validators.required]],
      tipoRegistroId: ['', [Validators.required]]
    });
  }

  ionViewDidLoad() {
    const alert = this.presentLoading();

    Promise.all([this.loadItems(), this.loadTiposDeRegistros(),
    this.loadFormGroup()/*, this.loadFunctionCallback()*/])
      .then(() => alert.dismiss())
      .catch(error => {
        console.log(error.message);
        alert.dismiss();
      });
  }

  /*loadFunctionCallback() {
    this.callback = this.navParams.get("callback");
  }*/

  loadFormGroup() {
    this.registro = this.navParams.get('registro');

    this.formGroup.setValue({
      id: this.registro.id,
      valor: this.registro.valor,
      dataHora: this.registro.dataHora,
      itemId: this.registro.itemId,
      tipoRegistroId: this.registro.tipoRegistroId
    });
  }

  updateRegistro() {
    const dataFormatada = this.dateService.formatDate(new Date(this.formGroup.value.dataHora));
    this.formGroup.value.dataHora = dataFormatada;

    this.registroService.update(this.formGroup.value)
      .subscribe(() => this.showUpdateOk(),
        error => console.log(error));
  }

  loadItems() {
    return new Promise<void>((resolve, reject) => {
      this.itemService.findAll()
        .subscribe(response => {
          this.itens = response['content'];
          resolve();
        },
          error => {
            reject(error);
          });
    });
  }

  loadTiposDeRegistros() {
    return new Promise<void>((resolve, reject) => {
      this.tipoRegistroService.findAll()
        .subscribe(response => {
          this.tiposDeRegistros = response;
          resolve();
        },
          error => {
            reject(error);
          });
    });
  }

  showUpdateOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Registro atualizado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            /*const registro: RegistroDTO = {
              id: this.formGroup.get('id').value,
              valor: this.formGroup.get('valor').value,
              dataHora: this.formGroup.get('dataHora').value,
              tipoRegistroId: this.formGroup.get('tipoRegistroId').value,
              nomeTipoRegistro: this.registro.nomeTipoRegistro,
              ehRegistroDeSaida: this.registro.ehRegistroDeSaida,
              itemId: this.formGroup.get('itemId').value,
              nomeItem: this.registro.nomeItem,
              complemento: this.registro.complemento,
              usuarioId: this.registro.usuarioId
            }*/

            /*this.callback().then(() => {
              this.navCtrl.pop();
            });*/

            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  /*ionViewDidLeave() {
    this.callback();
  }*/

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

}