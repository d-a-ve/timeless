export type DistributiveOmit<T, TOmitted extends keyof T> = T extends unknown
  ? Omit<T, TOmitted>
  : never;

export type DistributivePick<T, TPicked extends keyof T> = T extends unknown
  ? Pick<T, TPicked>
  : never;
