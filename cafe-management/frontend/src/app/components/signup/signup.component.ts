import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';
// import {} from '../'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  signupForm: any = FormGroup;
  responseMsg: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snakeBarService: SnakebarservicesService,
    private dialogRef: MatDialogRef<SignupComponent>
  ) {}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstant.nameregx)],
      ],
      email: [null, [Validators.required, Validators.email]],
      contactNumber: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstant.contactNumberRejx),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  handelSignUp() {
    let formData = this.signupForm.value;
    let data = {
      name: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      password: formData.password,
    };
    this.userService.signUp(data).subscribe(
      (response: any) => {
        this.dialogRef.close();
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
