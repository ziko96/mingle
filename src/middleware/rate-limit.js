"use strict";
exports.__esModule = true;
exports.rateLimiter = void 0;
var express_rate_limit_1 = require("express-rate-limit");
var rate_limit_redis_1 = require("rate-limit-redis");
var redis_1 = require("../database/redis");
exports.rateLimiter = (0, express_rate_limit_1["default"])({
    store: new rate_limit_redis_1["default"]({
        sendCommand: function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return redis_1.redis.call.apply(redis_1.redis, args);
        }
    }),
    windowMs: 15 * 60 * 1000,
    max: 100
});
