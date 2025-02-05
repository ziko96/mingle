"use strict";
exports.__esModule = true;
exports.redis = void 0;
var ioredis_1 = require("ioredis");
var logger_1 = require("../utils/logger");
exports.redis = new ioredis_1.Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableReadyCheck: true
});
exports.redis.on('error', function (error) {
    logger_1.logger.error('Redis error:', error);
});
