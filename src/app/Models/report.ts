export interface Report {
  idReport: number;
  reason: string;
  description: string;
  reportedUserId: number;
  reporterUserId: number;
  createdAt: string;
  status: string;
}

export interface ReportRequest {
  reportedUserId: number;
  reason: string;
  description: string;
}
