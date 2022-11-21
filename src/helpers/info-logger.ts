export interface InfoLogger {
  traceId: string;
  typeElement: string;
  method: string;
  message: string;
  request: string;
  datetime: Date;
}
