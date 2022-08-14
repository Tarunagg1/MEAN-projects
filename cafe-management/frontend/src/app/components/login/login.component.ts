import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: any = FormGroup;
  responseMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snakeBarService: SnakebarservicesService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  handelLogin() {
    let formData = this.loginForm.value;
    let data = {
      email: formData.email,
      password: formData.password,
    };
    this.userService.signIn(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.responseMsg = response?.message;
        this.snakeBarService.openSnakeBar(this.responseMsg, '');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/cafe/dashboard']);
      },
      (error: any) => {
        if (error?.error?.message) {
          this.responseMsg = error?.error?.message;
        } else {
          this.responseMsg = GlobalConstant.genericError;
        }
        this.snakeBarService.openSnakeBar(this.responseMsg, 'error');
      }
    );
  }
}
