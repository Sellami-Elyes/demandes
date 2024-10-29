import { Component, inject, signal } from '@angular/core';
import { MaterialModule } from '../../../material';
import { CommonModule } from '@angular/common';
import { AuthorizationItemComponent } from './authorization-item/authorization-item.component';
import { DemandsService } from './services/demands.service';
import { Demand } from './services/demand';
import { MatDialog } from '@angular/material/dialog';
import { DemandDialogComponent } from './demand-dialog/demand-dialog.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    AuthorizationItemComponent,
    DemandDialogComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  allDemands = signal<Demand[]>([]);

  readonly dialog = inject(MatDialog);
  constructor(private demandService: DemandsService) {}

  ngOnInit() {
    this.allDemands.set(this.demandService.loadDemands());
  }

  addNewDemand() {
    const dialogRef = this.dialog.open(DemandDialogComponent,{
      width: '30%',
      height: '50%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.allDemands.set(this.demandService.loadDemands());
      }
    });
  }

  reloadAlldemands() {
    this.allDemands.set(this.demandService.loadDemands());
  }
}
