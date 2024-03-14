export type LogMessage = {
  timestamp: string;
  level?: string;
  serviceName: string;
  responseTime: number;
  event: string;
  properties?: {
    req?: Request;
    res?: Response;
    err?: CauseErr;
  };
};

export type Request = {
  id?: string;
  method: string;
  url: string;
  ip?: string;
  headers: Record<string, string>;
  params?: Record<string, string>;
  query?: any;
  body?: any;
};

export type Response = {
  status: number;
  message: string;
  data?: any;
};

export type CauseErr = {
  err_name?: string;
  err_message?: string;
  err_trace?: string[];
  cause?: CauseErr;
};

export type LogLevel = 'info' | 'debug' | 'warn' | 'error';
