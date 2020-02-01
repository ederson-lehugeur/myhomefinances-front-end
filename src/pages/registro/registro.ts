import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { SaldoService } from '../../services/domain/saldo.service';
import { SaldoDTO } from '../../models/saldo.dto';
import { RegistroService } from '../../services/domain/registro.service';
import { RegistroDTO } from '../../models/registro.dto';

@IonicPage()
@Component({
  selector: 'page-registro',
  templateUrl: 'registro.html',
})
export class RegistroPage {

  saldo: SaldoDTO;
  registros: RegistroDTO[] = [];
  page: number = 0;
  itemsPerPage: number = 24;
  orderBy: string = "dataHora";
  direction: string = "DESC";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public registroService: RegistroService,
    public saldoService: SaldoService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  ionViewDidLoad() {
  }

  ionViewWillEnter() {
    this.resetPage();
    this.clearRegistros();
    this.loadSaldo();
    this.loadRegistros();
  }

  newRegistro() {
    this.navCtrl.push('NewRegistroPage');
  }

  clearRegistros() {
    this.registros = [];
  }

  resetPage() {
    this.page = 0;
  }

  loadSaldo() {
    this.saldoService.findLastSaldo()
      .subscribe(response => {
        this.saldo = response;
      },
        error => {
          return console.log(error);
        });
  }

  loadRegistros() {
    const loader = this.presentLoading();
    this.registroService.findAllPageable(this.page, this.itemsPerPage, this.orderBy, this.direction)
      .subscribe(response => {
        this.registros = this.registros.concat(response['content']);
        loader.dismiss();
      },
        error => {
          console.log(error);
          loader.dismiss();
        });
  }

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  doRefresh(refresher) {
    this.resetPage();
    this.clearRegistros();
    this.loadRegistros();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

}
