import { Injectable, signal } from '@angular/core';
import { Demand, StatusState } from './demand';

@Injectable({
  providedIn: 'root',
})
export class DemandsService {
  constructor() {}

  allDemands = signal<Demand[]>([]);

  loadDemands() {
    return this.allDemands();
  }

  addDemand(demand: Demand) {
    this.allDemands.set([...this.allDemands(), demand]);
  }

  deleteDemand(demand: Demand) {
    this.allDemands.set(this.allDemands().filter((d) => d.id !== demand.id));
  }

  updateDemand(demand: Demand) {
    this.allDemands.set(
      this.allDemands().map((d) => (d.id === demand.id ? demand : d))
    );
  }

  
}
