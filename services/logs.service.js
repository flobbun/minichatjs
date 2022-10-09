class LogsService {
  log(str, logType) {
    const logMessage = JSON.stringify(str);

    const logTypes = {
      warn: `\x1b[43m${logMessage}\x1b[0m`,
      error: `\x1b[31m${logMessage}\x1b[0m`,
      info: `\x1b[34m${logMessage}\x1b[0m`,
    };
    console[logType](logTypes[logType]);
  }
}

const logsService = new LogsService();

export { logsService as LogsService };