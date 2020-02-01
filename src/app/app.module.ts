import { DateService } from '../services/date.service';
import { AuthService } from './../services/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { StorageService } from '../services/storage.service';
import { UsuarioService } from '../services/domain/usuario.service';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ItemService } from '../services/domain/item.service';
import { SaldoService } from '../services/domain/saldo.service';
import { RegistroService } from '../services/domain/registro.service';
import { TipoRegistroService } from '../services/domain/tipo-registro.service';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    CategoriaService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    UsuarioService,
    ItemService,
    SaldoService,
    RegistroService,
    TipoRegistroService,
    DateService
  ]
})
export class AppModule { }
