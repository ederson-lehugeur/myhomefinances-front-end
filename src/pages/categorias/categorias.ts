import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  categorias: CategoriaDTO[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController
  ) { }

  ionViewWillEnter() {
    this.loadCategorias();
  }

  newCategoria() {
    this.navCtrl.push('NewCategoriaPage');
  }

  deleteCategoria(categoriaId: string) {
    this.categoriaService.delete(categoriaId)
      .subscribe(() => this.loadCategorias(),
        error => console.log(error));
  }

  editCategoria(categoria: CategoriaDTO) {
    this.navCtrl.push('EditCategoriaPage', categoria);
  }

  loadCategorias() {
    this.categoriaService.findAll()
      .subscribe(response => this.categorias = response,
        error => console.log(error));
  }

  showConfirmDeleteCategoria(categoriaId: string) {
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
  }

}
