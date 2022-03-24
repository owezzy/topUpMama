import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UiService {
  constructor(
    private snackBar: MatSnackBar,
  ) {}

  toastConfig = ({
    configurations = {
      duration: 5000,
      verticalPosition: 'top',
    },
  }: {
    configurations?: MatSnackBarConfig;
  } = {}): MatSnackBarConfig => configurations;

  showToast(message: string, action = 'Close', config?: MatSnackBarConfig) {
    this.snackBar.open(
      message,
      action,
      config || {
        politeness: 'polite',
        duration: 3000,
        verticalPosition: 'top',
      }
    );
  }

}
