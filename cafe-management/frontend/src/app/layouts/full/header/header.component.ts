import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ChangePasswordComponent } from 'src/app/components/change-password/change-password.component';
import { ConfirmationComponent } from 'src/app/material-component/confirmation/confirmation.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent {
  role: any;
  constructor(private router: Router, private dialog: MatDialog) {}

  logout() {
    const dilogConfig = new MatDialogConfig();
    dilogConfig.data = {
      message: 'Logout',
    };
    const dialogref = this.dialog.open(ConfirmationComponent, dilogConfig);
    const sub = dialogref.componentInstance.onEmitStatusChange.subscribe(
      (user) => {
        dialogref.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '555px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
