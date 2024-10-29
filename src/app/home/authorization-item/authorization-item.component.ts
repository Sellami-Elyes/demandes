import { CommonModule } from '@angular/common';
import { Component, inject, Input, output } from '@angular/core';
import { MaterialModule } from '../../../../material';
import { Demand, StatusState } from '../services/demand';
import { DemandsService } from '../services/demands.service';
import { MatDialog } from '@angular/material/dialog';
import { DemandDialogComponent } from '../demand-dialog/demand-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-authorization-item',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './authorization-item.component.html',
  styleUrl: './authorization-item.component.scss',
})
export class AuthorizationItemComponent {
  @Input() demand: Demand | undefined;
  reload = output<boolean>();
  StatusState = StatusState;

  constructor(private demandService: DemandsService) {}
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);
  ngOnInit() {}
  
  updateDemandStatus(status: StatusState) {
    if (this.demand) {
      this.demand.status = status;
      this.demandService.updateDemand({ ...this.demand, status });
    }
  }

  deleteDemand() {
    if (this.demand) {
      this.demandService.deleteDemand(this.demand);
      this.reload.emit(true);
      this.openSnackBar('Demande supprimée avec succès', 'Ok');
    }
  }

  updateDemand() {
    const dialogRef = this.dialog.open(DemandDialogComponent,{
      data: this.demand,
      width: '30%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reload.emit(true);
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2500,
    });
  }
}
