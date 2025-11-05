import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Auth } from '@core/services/auth';
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

  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this._formBuilder.group({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;
    console.log('Login submitted with', { username, password });
    // Here you would typically call an authentication service
    this._authService.login(username, password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
      },
      error: (error) => {
        console.error('Login failed:', error);
      },
    });
  }
}
