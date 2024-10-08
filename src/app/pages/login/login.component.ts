import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { TokenDto } from '../../models/token-dto.model';
import { AuthModel } from '../../models/auth.model';
import { User } from '../../models/user';
import { NotifierService } from 'angular-notifier';
import { streatch } from 'src/app/shared/animations/toggle-fade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [streatch],
})
export class LoginComponent implements OnInit {
  defaultAuth: any = {
    username: 'admin12',
    password: 'demo',
  };

  loginForm!: FormGroup;
  hasError!: boolean;
  returnUrl!: string;
  isLoading$: Observable<boolean>;

  private unsubscribe: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private notifierService: NotifierService,
  ) {
    this.isLoading$ = this.authService.isLoading$;
    if(authService.currentUser$)
      authService.logout();
  }

  ngOnInit(): void {      
    this.initForm();
    this.returnUrl =
      this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: [
        this.defaultAuth.username,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(320),
        ]),
      ],
      password: [
        this.defaultAuth.password,
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ]),
      ],
    });
  }

  submit() {
    this.hasError = false;
    const username = this.f['username'].value; 
    const password = this.f['password'].value; 
    const loginSubscr = this.authService
      .login(username, password) 
      .subscribe({
        next: (token: TokenDto | undefined) => {
          if (token) {
            this.authService.setAuthFromLocalStorage(new AuthModel(token.token));
            this.authService.getUserByUsername(username).subscribe(
              (user: User) => {
                this.authService.setUserFromLocalStorage(user);
                this.router.navigateByUrl('home');
              }
            );
          } else {
            this.hasError = true;
            this.notifierService.notify('error', 'Invalid credentials. Please try again.');
          }
        },
        error: (err) => {
          console.log(err);
          this.hasError = true; 
          this.notifierService.notify('error', 'Login failed. Please check your credentials.');
        },
        complete: () => this.authService.isLoadingSubject.next(false)
      });
    this.unsubscribe.push(loginSubscr);
  }
  
  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}




// import { Subscription } from 'rxjs';
// import { Component, OnInit } from '@angular/core';
// import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { NotifierService } from 'angular-notifier';
// import { AuthService } from 'src/app/core/auth.service';
// import { streatch } from 'src/app/shared/animations/toggle-fade';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   animations: [streatch],
// })
// export class LoginComponent implements OnInit {
//   constructor(
//     private _authService: AuthService,
//     private notifierService: NotifierService,
//     private _router: Router
//   ) {}
//   private subscription!: Subscription;
//   loginForm!: FormGroup;
//   email!: FormControl;
//   password!: FormControl;
//   isLoding: boolean = false;

//   ngOnInit(): void {
//     this.initFormControl();
//     this.initFormGroup();
//   }

//   initFormGroup() {
//     this.loginForm = new FormGroup({
//       email: this.email,
//       password: this.password,
//     });
//   }
//   initFormControl() {
//     this.email = new FormControl(localStorage.getItem('email'), [
//       Validators.required,
//       Validators.email,
//     ]);
//     this.password = new FormControl('', [
//       Validators.required,
//       Validators.pattern(/^[A-Z][a-z0-9]{6,20}$/),
//     ]);
//   }

//   signIn(loginForm: FormGroup) {
//     if (loginForm.valid && !this.isLoding) {
//       this.isLoding = true;
//       this._authService.signIn(loginForm.value).subscribe({
//         next: (respons) => {
//           if (respons.user.name === 'admin') {
//             this._router.navigate(['/dashboard']);
//             this.notifierService.notify(
//               'warning',
//               `${respons.message} Log In as admin ☠️ `
//             );
//           } else {
//             setTimeout(() => {
//               this._router.navigate(['/home']);
//             }, 100);
//             this.notifierService.notify(
//               'success',
//               `${respons.message} Log In as user 👨‍💼`
//             );
//           }
//           this.isLoding = false;
//           if (respons.message === 'success') {
//             localStorage.setItem('token', respons.token);
//             localStorage.setItem('username', respons.user.name);
//             loginForm.reset();
//           }
//         },
//       });
//     } else {
//       loginForm.markAllAsTouched();
//     }
//   }
// }
