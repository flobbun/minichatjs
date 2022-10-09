import { LogsService } from '../services/logs.service.js';

/**
 * @description Middleware to log all requests
 */
export const logger = (req, res, next) => {
  LogsService.log(`Request: ${req.method} ${req.url}`, 'info');
  next();
};