import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-new-categoria',
  templateUrl: 'new-categoria.html',
})
export class NewCategoriaPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      complemento: ['', [Validators.maxLength(120)]]
    });
  }

  createCategoria() {
    this.categoriaService.insert(this.formGroup.value)
      .subscribe(() => {
        this.showInsertOk();
      },
        error => console.log(error));
  }

  showInsertOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Categoria cadastrada com sucesso!',
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

}
