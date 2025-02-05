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
exports.SignalingService = void 0;
var VideoService_1 = require("./VideoService");
var logger_1 = require("../utils/logger");
var SignalingService = /** @class */ (function () {
    function SignalingService() {
        this.videoService = new VideoService_1.VideoService();
    }
    SignalingService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.videoService.initialize()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SignalingService.prototype.handleConnection = function (socket) {
        var _this = this;
        socket.on('getRouterRtpCapabilities', function (callback) {
            callback(_this.videoService.getRtpCapabilities());
        });
        socket.on('createTransport', function (callback) { return __awaiter(_this, void 0, void 0, function () {
            var transport, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.videoService.createTransport(socket.id)];
                    case 1:
                        transport = _a.sent();
                        callback({
                            id: transport.id,
                            iceParameters: transport.iceParameters,
                            iceCandidates: transport.iceCandidates,
                            dtlsParameters: transport.dtlsParameters
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        callback({ error: error_1.message });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        socket.on('connectTransport', function (_a, callback) {
            var dtlsParameters = _a.dtlsParameters;
            return __awaiter(_this, void 0, void 0, function () {
                var error_2;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.videoService.connectTransport(socket.id, dtlsParameters)];
                        case 1:
                            _b.sent();
                            callback({ success: true });
                            return [3 /*break*/, 3];
                        case 2:
                            error_2 = _b.sent();
                            callback({ error: error_2.message });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        socket.on('produce', function (_a, callback) {
            var kind = _a.kind, rtpParameters = _a.rtpParameters;
            return __awaiter(_this, void 0, void 0, function () {
                var producer, error_3;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.videoService.produce(socket.id, kind, rtpParameters)];
                        case 1:
                            producer = _b.sent();
                            callback({ id: producer.id });
                            return [3 /*break*/, 3];
                        case 2:
                            error_3 = _b.sent();
                            callback({ error: error_3.message });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        socket.on('consume', function (_a, callback) {
            var producerId = _a.producerId, rtpCapabilities = _a.rtpCapabilities;
            return __awaiter(_this, void 0, void 0, function () {
                var consumer, error_4;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.videoService.consume(socket.id, producerId, rtpCapabilities)];
                        case 1:
                            consumer = _b.sent();
                            callback({
                                id: consumer.id,
                                producerId: consumer.producerId,
                                kind: consumer.kind,
                                rtpParameters: consumer.rtpParameters
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            error_4 = _b.sent();
                            callback({ error: error_4.message });
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        });
        socket.on('join-room', function (roomId) { return __awaiter(_this, void 0, void 0, function () {
            var error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.handleJoinRoom(socket, roomId)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        logger_1.logger.error('Join room error:', error_5);
                        socket.emit('error', { message: 'Failed to join room' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        socket.on('disconnect', function () {
            _this.handleDisconnect(socket);
        });
    };
    SignalingService.prototype.handleJoinRoom = function (socket, roomId) {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.videoService.createTransport(socket.id)];
                    case 1:
                        transport = _a.sent();
                        socket.join(roomId);
                        socket.emit('transport-created', {
                            id: transport.id,
                            iceParameters: transport.iceParameters,
                            iceCandidates: transport.iceCandidates,
                            dtlsParameters: transport.dtlsParameters
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    SignalingService.prototype.handleDisconnect = function (socket) {
        this.videoService.cleanup(socket.id);
    };
    return SignalingService;
}());
exports.SignalingService = SignalingService;
