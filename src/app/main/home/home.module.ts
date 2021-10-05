// Angular
import { CommonModule } from '@angular/common';
import { ExtendedModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
// Local components
import { MainComponent } from './main/main.component';
// Firebase guards
import { AngularFireAuthGuard, redirectLoggedInTo, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
// Material
import { MatButtonModule } from '@angular/material/button';

// Firebase guard instances
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['/main/auth']);

// Routes
const routes = [
  {
    path: 'main',
    component: MainComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin },
  },
];

@NgModule({
  imports: [
    CommonModule,
    ExtendedModule,
    FlexModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
  ],
  declarations: [
    MainComponent
  ],
})
export class HomeModule {}
