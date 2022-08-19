import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup;
  responseMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snakeBarService: SnakebarservicesService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  validateSubmitted(): Boolean {
    if (
      this.changePasswordForm.controls['newPassword'].value !==
      this.changePasswordForm.controls['oldPassword'].value
    ) {
      return true;
    }
    return false;
  }

  handelChangePasswordSubmit() {
    let formData = this.changePasswordForm.value;
    // console.log(data);
    // return;
    const data = {
      oldpassword:formData.oldPassword,
      newpassword:formData.newPassword
    }

    this.userService.changePassword(data).subscribe(
      (response: any) => {
        this.responseMsg = response?.message;
        this.snakeBarService.openSnakeBar(this.responseMsg, '');
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
