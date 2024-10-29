import { Component, inject } from '@angular/core';
import { MaterialModule } from '../../../../material';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemandsService } from '../services/demands.service';
import { StatusState } from '../services/demand';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-demand-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule],
  templateUrl: './demand-dialog.component.html',
  styleUrl: './demand-dialog.component.scss',
})
export class DemandDialogComponent {
  data = inject(MAT_DIALOG_DATA);

  readonly title = new FormControl(this.data?.title || '', [
    Validators.required,
  ]);
  readonly user = new FormControl(this.data?.user || '', [Validators.required]);
  readonly contract = new FormControl(this.data?.contract || null, [
    Validators.required,
  ]);
  private _snackBar = inject(MatSnackBar);

  constructor(
    private demandService: DemandsService,
    public dialogRef: MatDialogRef<DemandDialogComponent>
  ) {}

  addDemand() {
    this.demandService.addDemand({
      id: Math.random().toString(36).substring(2),
      title: this.title.value!,
      user: this.user.value!,
      contract: this.contract.value!,
      status: StatusState.PENDING,
    });

    this.openSnackBar('Demande ajoutée avec succès', 'Ok');
    this.dialogRef.close(true);
  }

  updateDemand() {
    this.demandService.updateDemand({
      id: this.data.id,
      title: this.title.value!,
      user: this.user.value!,
      contract: this.contract.value!,
      status: StatusState.PENDING,
    });

    this.openSnackBar('Demande modifiée avec succès', 'Ok');
    this.dialogRef.close(true);
  }

  enableAddButton() {
    return this.title.valid && this.user.valid && this.contract.valid;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
