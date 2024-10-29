// demand.ts
export interface Demand {
  id: string;
  title: string;
  user: string;
  contract: number;
  status: StatusState;
}

export enum StatusState {
  PENDING = 'En attente',
  ACCEPTED = 'Accepté',
  REJECTED = 'Refusé',
}