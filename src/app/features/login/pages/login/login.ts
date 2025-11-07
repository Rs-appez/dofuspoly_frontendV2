import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, LoginResponse } from '@core/services/auth';
import { StorageService } from '@core/services/storage.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(Auth);
  private _storageService = inject(StorageService);
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  loginForm!: FormGroup;
  redirectUrl: string | null = null;

  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
    this.redirectUrl =
      this._activatedRoute.snapshot.queryParamMap.get('returnUrl');
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this._authService.login(username, password).subscribe({
      next: (response: LoginResponse) => {
        this._storageService.setJwt(response.access, response.refresh);
        this._storageService.setUsername(username);
        if (this.redirectUrl) {
          this._router.navigate([this.redirectUrl]);
          return;
        }
        this._router.navigate(['/']);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
