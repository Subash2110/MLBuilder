import { Component, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  standalone: false
})
export class ForgotPasswordComponent {

  step: number = 1;

  emailForm: FormGroup;
  otpForm: FormGroup;
  passwordForm: FormGroup;

  otpValidUntil!: number;
  otpExpired: boolean = false;
  timer: any;

  currentTime: number = new Date().getTime();

  ngOnInit() {
    setInterval(() => {
      this.currentTime = new Date().getTime();
    }, 1000);
  }

  otpControls: FormControl[] = [];

  generatedOtp: string = '';

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  constructor(private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpControls = Array.from({ length: 5 }, () => new FormControl('', [Validators.required]));
    this.otpForm = new FormGroup({
      otp0: this.otpControls[0],
      otp1: this.otpControls[1],
      otp2: this.otpControls[2],
      otp3: this.otpControls[3],
      otp4: this.otpControls[4],
    });

    this.passwordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  sendOtp() {
    if (this.emailForm.valid) {
      this.step = 2;
      this.generatedOtp = Math.floor(10000 + Math.random() * 90000).toString();
      setTimeout(() => {
        this.generatedOtp
          .split('')
          .forEach((digit, index) => {
            this.otpControls[index].setValue(digit);
          });
      }, 3000);

      this.otpExpired = false;
      const now = new Date().getTime();
      this.otpValidUntil = now + 60000;
      this.startOtpTimer();
    }
  }

  onOtpInput(event: KeyboardEvent, index: number): void {
    const input = event.target as HTMLInputElement;
    const value = input.value;

    if (value.length === 1 && index < 4) {
      const next = this.otpInputs.toArray()[index + 1];
      next.nativeElement.focus();
    } else if (event.key === 'Backspace' && index > 0 && !value) {
      const prev = this.otpInputs.toArray()[index - 1];
      prev.nativeElement.focus();
    }
  }

  verifyOtp() {
    const otp = this.otpControls.map(control => control.value).join('');
    if (otp.length === 5 && otp === this.generatedOtp) {
      this.step = 3;
    } else {
      alert('Invalid OTP');
    }
    clearInterval(this.timer);

  }

  resetPassword() {

    if (this.passwordForm.valid) {

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex((u: any) => u.email === this.emailForm.value.email);

      if (userIndex !== -1) {
        users[userIndex].password = this.passwordForm.value.password;

        localStorage.setItem('users', JSON.stringify(users));
        alert('Password Reset Successful');

        this.emailForm.reset();
        this.otpForm.reset();
        this.passwordForm.reset();
        this.router.navigate(['/login']);

      } else {
        alert('User not found');
        this.router.navigate(['/signup']);
      }
    }
  }

  passwordMatchValidator(form: FormGroup) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  startOtpTimer() {
    this.timer = setInterval(() => {
      const now = new Date().getTime();

      if (now > this.otpValidUntil) {
        clearInterval(this.timer);
        this.otpExpired = true;

        alert('OTP expired. Please request a new one.');

        this.step = 1;
        this.emailForm.reset();
        this.otpForm.reset();
      }
    }, 1000);
  }

}
