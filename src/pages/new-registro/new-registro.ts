import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../../services/domain/item.service';
import { ItemDTO } from '../../models/item.dto';
import { TipoRegistroService } from '../../services/domain/tipo-registro.service';
import { TipoRegistroDTO } from '../../models/tipo-registro.dto';
import { RegistroService } from '../../services/domain/registro.service';
import { DateService } from '../../services/date.service';

@IonicPage()
@Component({
  selector: 'page-new-registro',
  templateUrl: 'new-registro.html',
})
export class NewRegistroPage {

  formGroup: FormGroup;

  itens: ItemDTO[];
  tiposDeRegistros: TipoRegistroDTO[];

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

    //const now = new Date(this.dateService.formatDateUTC(new Date()));
    const now = new Date();

    this.formGroup = this.formBuilder.group({
      valor: ['', [Validators.required, Validators.pattern('^[0-9]{1,8}(\.[0-9]{1,2})?$')]],
      dataHora: [now.toISOString(), Validators.required],
      tipoRegistroId: ['2', Validators.required],
      itemId: ['', Validators.required]
    });
  }

  ionViewDidLoad() {
    const alert = this.presentLoading();
    Promise.all([this.loadItems(), this.loadTiposDeRegistros()])
      .then(() => alert.dismiss())
      .catch(error => {
        console.log(error.message);
        alert.dismiss();
      });
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

  createRegistro() {
    const dataFormatada = this.dateService.formatDate(new Date(this.formGroup.value.dataHora));
    this.formGroup.value.dataHora = dataFormatada;

    this.registroService.insert(this.formGroup.value)
      .subscribe(() => {
        this.showInsertOk();
      },
        error => console.log(error));
  }

  showInsertOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Registro cadastrado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  formataNumero(e: any, separador: string = '.', decimais: number = 2) {
    let a: any = e.value.split('');
    let ns: string = '';
    a.forEach((c: any) => { if (!isNaN(c)) ns = ns + c; });
    ns = parseInt(ns).toString();
    if (ns.length < (decimais + 1)) { ns = ('0'.repeat(decimais + 1) + ns); ns = ns.slice((decimais + 1) * -1); }
    let ans = ns.split('');
    let r = '';
    for (let i = 0; i < ans.length; i++) if (i == ans.length - decimais) r = r + separador + ans[i]; else r = r + ans[i];
    e.value = r;
  }

}
