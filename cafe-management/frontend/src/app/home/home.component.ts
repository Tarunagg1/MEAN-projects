import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ForgotpasswordComponent } from '../components/forgotpassword/forgotpassword.component';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private dialog:MatDialog) { }

  ngOnInit(): void {
  }

  signUpAction(){
    const dilogConfigration = new MatDialogConfig();
    dilogConfigration.width = "550px";
    this.dialog.open(SignupComponent,dilogConfigration);
  }

  forgootPasswordUpAction(){
    const dilogConfigration = new MatDialogConfig();
    dilogConfigration.width = "550px";
    this.dialog.open(ForgotpasswordComponent,dilogConfigration);
  }

  LoginAction(){
    const dilogConfigration = new MatDialogConfig();
    dilogConfigration.width = "550px";
    this.dialog.open(LoginComponent,dilogConfigration);
  }

}
