import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent {

  details = {
    email: '',
    password: ''
  };

  form!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),

    });
  }

  // initForm() {
  //   this.form = new FormGroup({

  //     email: new FormControl('', [Validators.required, Validators.email]),
  //     password: new FormControl('', [Validators.required, Validators.minLength(6)]),

  //   });
  // }

  onSubmit() {

    if (this.form.valid) {

      const email = this.form.value.email;
      const password = this.form.value.password;
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      const user = users.find((u: any) => u.email === email);

      if (!user) {
        alert('Email not found. Please Sign Up.');
        return;
      }

      if (user.password !== password) {
        alert('Password is incorrect.');
        return;
      }

      localStorage.setItem(
        'loggedInUser',
        JSON.stringify(user)
      );

      alert('Login Successful');
      this.router.navigate(['/menuNew']);
    }
  }

  signup() {

    if (this.form.valid) {

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(this.form.value);

      localStorage.setItem('users', JSON.stringify(users));

      alert('Signup Successful');
    }
  }


}
