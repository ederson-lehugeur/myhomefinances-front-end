import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  categorias: CategoriaDTO[];
  page: number = 0;
  size: number = 24;
  sort: string = "nome";
  direction: string = "ASC";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) { }

  ionViewWillEnter() {
    this.resetPage();
    this.clearCategorias();
    this.loadCategorias();
  }

  /*newCategoria() {
    this.navCtrl.push('NewCategoriaPage');
  }*/

  /*deleteCategoria(categoriaId: string) {
    this.categoriaService.delete(categoriaId)
      .subscribe(() => this.ionViewWillEnter(),
        error => console.log(error));
  }*/

  /*editCategoria(categoria: CategoriaDTO) {
    this.navCtrl.push('EditCategoriaPage', categoria);
  }*/

  viewCategoria(categoria: CategoriaDTO) {
    this.navCtrl.push('ViewCategoriaPage', { categoria: categoria });
  }

  clearCategorias() {
    this.categorias = [];
  }

  resetPage() {
    this.page = 0;
  }

  loadCategorias() {
    const loader = this.presentLoading();
    this.categoriaService.findAllPageable(this.page, this.size, this.sort, this.direction)
      .subscribe(response => {
        this.categorias = this.categorias.concat(response['content']);
        loader.dismiss();
      },
        error => {
          console.log(error);
          loader.dismiss();
        });
  }

  /*showConfirmDeleteCategoria(categoriaId: string) {
    const confirm = this.alertCtrl.create({
      title: 'Atenção',
      message: 'Tem certeza que deseja excluir a categoria?',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Cancelar'
        },
        {
          text: 'Ok',
          handler: () => {
            this.deleteCategoria(categoriaId);
          }
        }
      ]
    });
    confirm.present();
  }*/

  presentLoading(): Loading {
    const loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();

    return loader;
  }

  doRefresh(refresher) {
    this.resetPage();
    this.clearCategorias();
    this.loadCategorias();
    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadCategorias();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 500);
  }

}
