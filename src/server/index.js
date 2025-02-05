"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var express_1 = require("express");
var helmet_1 = require("helmet");
var compression_1 = require("compression");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var connection_1 = require("../database/connection");
var rate_limit_1 = require("../middleware/rate-limit");
var logger_1 = require("../utils/logger");
var SignalingService_1 = require("../services/SignalingService");
var redis_1 = require("../database/redis");
var app = (0, express_1["default"])();
app.use((0, helmet_1["default"])());
app.use((0, compression_1["default"])());
app.use(express_1["default"].json());
app.use(rate_limit_1.rateLimiter);
var httpServer = (0, http_1.createServer)(app);
var io = new socket_io_1.Server(httpServer, {
    cors: { origin: process.env.CORS_ORIGIN }
});
var signalingService = new SignalingService_1.SignalingService();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var startTime, PORT_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    startTime = performance.now();
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 5, , 6]);
                    return [4 /*yield*/, (0, connection_1.connectDB)()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, redis_1.redis.connect()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, signalingService.initialize()];
                case 4:
                    _a.sent();
                    io.on('connection', function (socket) {
                        logger_1.logger.info("Client connected: ".concat(socket.id));
                        signalingService.handleConnection(socket);
                    });
                    PORT_1 = process.env.PORT || 3000;
                    httpServer.listen(PORT_1, function () {
                        var bootTime = Math.round(performance.now() - startTime);
                        logger_1.logger.info("Server running on port ".concat(PORT_1, " (boot: ").concat(bootTime, "ms)"));
                    });
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    logger_1.logger.error('Bootstrap failed:', error_1);
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
process.on('uncaughtException', function (error) {
    logger_1.logger.error('Uncaught Exception:', error);
    process.exit(1);
});
process.on('unhandledRejection', function (reason, promise) {
    logger_1.logger.error('Unhandled Rejection:', reason);
});
bootstrap();
