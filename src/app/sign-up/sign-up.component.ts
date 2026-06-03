import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  standalone: false
})
export class SignUpComponent {

  details = {
    name: '',
    email: '',
    newPassword: '',
    confirmPassword: ''
  };

  form!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  signup() {

    if (this.form.valid) {

      if (this.form.value.newPassword !== this.form.value.confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const emailExists = users.find((u: any) => u.email === this.form.value.email);

      if (emailExists) {
        alert('Email already registered');
        return;
      }

      const newUser = {
        id: users.length + 1,
        userName: this.form.value.name,
        email: this.form.value.email,
        password: this.form.value.newPassword
      };

      users.push(newUser);

      localStorage.setItem('users', JSON.stringify(users));

      alert('Signup Successful');
      this.router.navigate(['/reactiveForm']);
    }
  }

}
