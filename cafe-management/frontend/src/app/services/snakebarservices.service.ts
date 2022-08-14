import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnakebarservicesService {
  constructor(private snakeBar: MatSnackBar) {}

  openSnakeBar(message: string, action: string) {
    if (action == 'error') {
      this.snakeBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['black-snakebar'],
      });
    } else {
      this.snakeBar.open(message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2000,
        panelClass: ['green-snakebar'],
      });
    }
  }
}
