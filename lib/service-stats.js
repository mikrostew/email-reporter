// various stats about the process
exports.processStats = function(req, res, next) {
  // TODO: this seems too wordy...
  res.locals.status.uptime = process.uptime();
  res.locals.status.memoryUsage = process.memoryUsage();
  res.locals.status.cpuUsage = process.cpuUsage();
  res.locals.status.resourceUsage = process.resourceUsage();
  next();
}
