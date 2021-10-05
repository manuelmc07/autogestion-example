// Angular
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// 3rd libraries
import { NgxUiLoaderService } from 'ngx-ui-loader';
// Services
import { AuthService } from '../auth.service';
import {ToastService} from "../../../utils/toast.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // Reactive form
  loginForm: FormGroup | any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loader: NgxUiLoaderService,
    private router: Router,
    private toastService: ToastService,
  ) { }

  login(): void {
    this.authService.signIn(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value,
    ).then(data => {
      this.router.navigate(['/home/main']);
      this.toastService.showToast('Bienvenido');
    });
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
}
