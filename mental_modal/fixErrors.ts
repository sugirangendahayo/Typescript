
class Logger {
  logs = [];

  addLog(message: string) {
    this.logs.push({ timestamp: Date.now(), message });
  }

  static clearLogs() {
    this.logs = [];
  }
}
