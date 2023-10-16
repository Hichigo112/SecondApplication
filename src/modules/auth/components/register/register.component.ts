import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "src/modules/auth/services/auth.service";
import {catchError, tap} from "rxjs";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup
  constructor(private fb: FormBuilder, private authService: AuthService) {
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
      const test = this.authService.createUser(this.name?.value, this.password?.value)
      test.pipe(
        catchError(err => {
          if (err.status === 400) this.name?.setErrors({uniq: true})
          throw ''
        })
      ).subscribe(res => this.authService.setUserInfo(res))
    } else {
      this.password?.setErrors({identical: true})
      this.confirmPassword?.setErrors({identical: true})
    }
  }

  get name () {return this.registerForm.get('name')}
  get password() {return this.registerForm.get('password')}
  get confirmPassword() {return this.registerForm.get('confirmPassword')}

}
