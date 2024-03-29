import { Component, OnInit, Inject } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  onEmitStatusChange = new EventEmitter();
  details: any = {};

  constructor(
    // public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) {}

  ngOnInit(): void {
    if(this.dialogData){
      this.details = this.dialogData;
    }
  }

  handelChnageAction(): void {
    this.onEmitStatusChange.emit();
  }
}
