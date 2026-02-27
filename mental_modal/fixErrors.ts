type Logs = {
    timestamp: number;
    message: string
}
class Logger {
  logs: Logs[]  = [];

  addLog(message: string) {
    this.logs.push({ timestamp: Date.now(), message });
  }

  static clearLogs(logger: Logger) {
    logger.logs = [];
  }
}
