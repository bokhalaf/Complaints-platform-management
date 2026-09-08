import { DashnoardEntity } from "logic/entities/dashboard.entity";

export class DashboardModel {
  static fromJson(json) {
    const stats = json.complaints_stats;

    return new DashnoardEntity(
      stats.total ?? 0,
      stats.pending ?? 0,
      stats.processing ?? 0,
      stats.done ?? 0,
      stats.rejected ?? 0,
      json.department_stats ?? [],          
      json.performance_stats ?? []         
    );
  }
}
