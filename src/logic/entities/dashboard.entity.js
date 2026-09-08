export class DashnoardEntity {
  constructor(total, pending, processing, done, rejected, departmentStats, performanceStats) {
    this.total = total;
    this.pending = pending;
    this.processing = processing;
    this.done = done;
    this.rejected = rejected;

    this.departmentStats = departmentStats;       
    this.performanceStats = performanceStats;     
  }
}
