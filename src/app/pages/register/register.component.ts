import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth.service';
import { ConfirmPasswordValidator } from './confirm-password.validator';
import { RegisterRequest } from 'src/app/models/register-request.model';
import { NotifierService } from 'angular-notifier';
import { streatch } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  animations: [streatch],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm!: FormGroup;
  hasError: boolean = false;
  isLoading$!: Observable<boolean>;
  isLoding: boolean = false;
  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.registrationForm.controls;
  }

  initForm() {
    this.registrationForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(3), Validators.maxLength(320)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
        cPassword: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      },
      {
        validator: ConfirmPasswordValidator.MatchPassword,
      }
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  register(): void {
    if (this.registrationForm.invalid) {
      console.log(this.registrationForm.errors);
      this.hasError = true;
      return;
    }

    const registerRequest: RegisterRequest = {
      username: this.registrationForm.get('username')?.value,
      password: this.registrationForm.get('password')?.value,
      email: this.registrationForm.get('email')?.value,
    };

    this.authService.register(registerRequest).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Registration failed', error);
        this._notifierService.notify('error', 'Registration failed');
    }
     /* (error) => {
        alert('Registration failed');
      }*/
    );
  }
}








