import { ComponentType } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmComponent } from '../shared/confirm/confirm.component';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}
@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  confirmDialog(data: ConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(ConfirmComponent, { data, width: '400px', disableClose: true })
      .afterClosed();
  }

  async openLazyDialog(dialogName: string): Promise<MatDialogRef<any>> {
    const chunk = await import(
      `../lazy-components/${dialogName}/${dialogName}.component`
    );
    const dialogComponent = Object.values(chunk)[0] as ComponentType<unknown>;
    return this.dialog.open(dialogComponent);

    // in component template
    //  <button
    //     mat-raised-button
    //     (click)="dialogService.openLazyDialog('take-notes')"
    //   >
    //     Open Lazy Loading Dialog
    //   </button>
  }
}
