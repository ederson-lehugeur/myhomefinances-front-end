import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-edit-categoria',
  templateUrl: 'edit-categoria.html',
})
export class EditCategoriaPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public categoriaService: CategoriaService,
    public alertCtrl: AlertController) {

    this.formGroup = this.formBuilder.group({
      id: ['', [Validators.required]],
      nome: ['', [Validators.required, Validators.maxLength(120)]],
      complemento: ['', [Validators.maxLength(120)]]
    });
  }

  ionViewDidLoad() {
    this.loadFormGroup();
  }

  loadFormGroup() {
    this.formGroup.setValue({
      id: this.navParams.get('id'),
      nome: this.navParams.get('nome'),
      complemento: this.navParams.get('complemento')
    });
  }

  updateCategoria() {
    this.categoriaService.update(this.formGroup.value)
      .subscribe(() => this.showUpdateOk(),
        error => console.log(error));
  }

  showUpdateOk() {
    const alert = this.alertCtrl.create({
      title: 'Sucesso',
      message: 'Categoria atualizada com sucesso!',
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
