// Angular
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Firebase
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Environments
import { environment } from '../environments/environment';
// Components
import { AppComponent } from './app.component';
// 3rd libraries
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION,
} from 'ngx-ui-loader';
// Material
import { MatSnackBarModule } from '@angular/material/snack-bar';

// Init firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

// Loader configuration
const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsColor: '#FFFFFF',
  fgsPosition: POSITION.centerCenter,
  fgsSize: 50,
  fgsType: SPINNER.foldingCube,
  pbDirection: PB_DIRECTION.leftToRight,
  pbThickness: 5,
  pbColor: '#FFFFFF',
  logoPosition: 'top-center',
};

// Lazy loading routes
const appRoutes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./main/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./main/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: '**',
    redirectTo: '/auth/login',
  },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatSnackBarModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
