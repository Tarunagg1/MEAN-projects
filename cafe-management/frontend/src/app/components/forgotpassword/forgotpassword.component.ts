import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnakebarservicesService } from 'src/app/services/snakebarservices.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstant } from 'src/app/shared/global-constant';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {
  forgotPasswordFrom: any = FormGroup;
  responseMsg: any;

  constructor(private formBuilder:FormBuilder, private userService: UserService,
    private dialogRef:MatDialogRef<ForgotpasswordComponent>,
    private snakeBarService: SnakebarservicesService
    ) { }

  ngOnInit(): void {
    this.forgotPasswordFrom = this.formBuilder.group({
      email:[null,[Validators.required,Validators.email]]
    })
  }

  handelSubmit() {
    let formData = this.forgotPasswordFrom.value;
    let data = {
      email: formData.email
    };
    this.userService.forgotPassword(data).subscribe(
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
