import type { TrafficBufferChart } from './traffic-buffer-chart';

export type TrafficBuffer = {
  trucksLaden: number;
  trucksLadenAndon: boolean;
  trucksUnladen: number;
  trucksUnladenAndon: boolean;
  chart: TrafficBufferChart[];
};
