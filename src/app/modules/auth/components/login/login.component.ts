import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/modules/auth/services/auth.service";
import {catchError, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy{
  loginForm!: FormGroup
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required],
    }, {updateOn: "blur"})
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.loginUser(this.name?.value, this.password?.value).pipe(
        catchError(err => {
          throw ''
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.authService.setUserInfo(res)
        this.router.navigate(['/home'])
      })
    }
  }

  get name() {
    return this.loginForm.get('name')
  }

  get password() {
    return this.loginForm.get('password')
  }

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }
}
