import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/app/modules/auth/services/auth.service";
import {catchError, Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
  registerForm!: FormGroup
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]{1,}')]],
      confirmPassword: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]{1,}')]]
    }, {updateOn: 'blur'})
  }

  onSubmit() {
    if (this.password?.value === this.confirmPassword?.value) {
      this.authService.createUser(this.name?.value, this.password?.value).pipe(
        catchError(err => {
          if (err.status === 400) this.name?.setErrors({uniq: true})
          throw ''
        }),
        takeUntil(this.destroy$)
      ).subscribe(res => {
        this.authService.setUserInfo(res)
        this.router.navigate(['/home'])
      })

    } else {
      this.password?.setErrors({identical: true})
      this.confirmPassword?.setErrors({identical: true})
    }
  }

  get name () {return this.registerForm.get('name')}
  get password() {return this.registerForm.get('password')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}

  ngOnDestroy(): void {
    this.destroy$.next(true)
    this.destroy$.unsubscribe()
  }

}
