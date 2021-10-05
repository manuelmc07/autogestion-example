// Angular
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
// Services
import { AuthService } from '../auth.service';
import { ToastService } from '../../../utils/toast.service';
// 3rd libraries
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  // Reactive form
  registerForm: FormGroup | any ;

  // Subscribers
  private unsubscribeAll: Subject<any> | any;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private loader: NgxUiLoaderService,
    private router: Router,
    private toastService: ToastService,
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirm: ['', [Validators.required, confirmPasswordValidator]],
    });

    this.registerForm
      .get('password')
      .valueChanges.pipe(takeUntil(this.unsubscribeAll))
      .subscribe(() => {
        this.registerForm.get('passwordConfirm').updateValueAndValidity();
      });
  }

  singUp(): void {
    this.loader.start();
    this.authService.signUp(
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
    ).then(data => {
      this.toastService.showToast(`Welcome ${this.registerForm.controls.email.value}, now, you can login :)`);
      this.router.navigate(['/auth/login']);
      this.loader.stop();
    })
  }
}

/**
 * Confirm password validator
 *
 * @param {AbstractControl} control
 * @returns {ValidationErrors | null}
 */
export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const passwordConfirm = control.parent.get('passwordConfirm');

  if (!password || !passwordConfirm) {
    return null;
  }

  if (passwordConfirm.value === '') {
    return null;
  }

  if (password.value === passwordConfirm.value) {
    return null;
  }

  return { passwordsNotMatching: true };
};

