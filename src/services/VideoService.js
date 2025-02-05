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
exports.VideoService = void 0;
var mediasoup = require("mediasoup");
var VideoService = /** @class */ (function () {
    function VideoService() {
        this.transports = new Map();
        this.producers = new Map();
        this.consumers = new Map();
    }
    VideoService.prototype.initialize = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        // Create mediasoup worker
                        _a = this;
                        return [4 /*yield*/, mediasoup.createWorker({
                                logLevel: 'warn',
                                rtcMinPort: 10000,
                                rtcMaxPort: 10100
                            })];
                    case 1:
                        // Create mediasoup worker
                        _a.worker = _c.sent();
                        // Create mediasoup router
                        _b = this;
                        return [4 /*yield*/, this.worker.createRouter({
                                mediaCodecs: [
                                    {
                                        kind: 'video',
                                        mimeType: 'video/VP8',
                                        clockRate: 90000,
                                        parameters: {
                                            'x-google-start-bitrate': 1000
                                        }
                                    },
                                    {
                                        kind: 'video',
                                        mimeType: 'video/H264',
                                        clockRate: 90000,
                                        parameters: {
                                            'packetization-mode': 1,
                                            'profile-level-id': '42e01f',
                                            'level-asymmetry-allowed': 1
                                        }
                                    },
                                    {
                                        kind: 'audio',
                                        mimeType: 'audio/opus',
                                        clockRate: 48000,
                                        channels: 2
                                    }
                                ]
                            })];
                    case 2:
                        // Create mediasoup router
                        _b.router = _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.createTransport = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.router.createWebRtcTransport({
                            listenIps: [{ ip: process.env.MEDIASOUP_LISTEN_IP || '127.0.0.1' }],
                            enableUdp: true,
                            enableTcp: true,
                            preferUdp: true,
                            initialAvailableOutgoingBitrate: 1000000
                        })];
                    case 1:
                        transport = _a.sent();
                        this.transports.set(peerId, transport);
                        return [2 /*return*/, transport];
                }
            });
        });
    };
    VideoService.prototype.connectTransport = function (peerId, dtlsParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = this.transports.get(peerId);
                        if (!transport)
                            throw new Error('Transport not found');
                        return [4 /*yield*/, transport.connect({ dtlsParameters: dtlsParameters })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.produce = function (peerId, kind, rtpParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var transport, producer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = this.transports.get(peerId);
                        if (!transport)
                            throw new Error('Transport not found');
                        return [4 /*yield*/, transport.produce({
                                kind: kind,
                                rtpParameters: rtpParameters
                            })];
                    case 1:
                        producer = _a.sent();
                        this.producers.set(producer.id, producer);
                        producer.on('transportclose', function () {
                            _this.producers["delete"](producer.id);
                        });
                        return [2 /*return*/, producer];
                }
            });
        });
    };
    VideoService.prototype.consume = function (peerId, producerId, rtpCapabilities) {
        return __awaiter(this, void 0, void 0, function () {
            var transport, producer, consumer;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = this.transports.get(peerId);
                        if (!transport)
                            throw new Error('Transport not found');
                        producer = this.producers.get(producerId);
                        if (!producer)
                            throw new Error('Producer not found');
                        if (!this.router.canConsume({ producerId: producerId, rtpCapabilities: rtpCapabilities })) {
                            throw new Error('Cannot consume');
                        }
                        return [4 /*yield*/, transport.consume({
                                producerId: producerId,
                                rtpCapabilities: rtpCapabilities,
                                paused: true // Start paused and resume after handling the 'resume' event
                            })];
                    case 1:
                        consumer = _a.sent();
                        this.consumers.set(consumer.id, consumer);
                        consumer.on('transportclose', function () {
                            _this.consumers["delete"](consumer.id);
                        });
                        consumer.on('producerclose', function () {
                            _this.consumers["delete"](consumer.id);
                        });
                        return [2 /*return*/, consumer];
                }
            });
        });
    };
    VideoService.prototype.closeTransport = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            var transport;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport = this.transports.get(peerId);
                        if (!transport) return [3 /*break*/, 2];
                        return [4 /*yield*/, transport.close()];
                    case 1:
                        _a.sent();
                        this.transports["delete"](peerId);
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    VideoService.prototype.getRtpCapabilities = function () {
        return this.router.rtpCapabilities;
    };
    VideoService.prototype.cleanup = function (peerId) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, _b, producerId, producer, _c, _d, _e, consumerId, consumer;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.closeTransport(peerId)];
                    case 1:
                        _f.sent();
                        // Cleanup producers
                        for (_i = 0, _a = this.producers.entries(); _i < _a.length; _i++) {
                            _b = _a[_i], producerId = _b[0], producer = _b[1];
                            if (producer.appData.peerId === peerId) {
                                producer.close();
                                this.producers["delete"](producerId);
                            }
                        }
                        // Cleanup consumers
                        for (_c = 0, _d = this.consumers.entries(); _c < _d.length; _c++) {
                            _e = _d[_c], consumerId = _e[0], consumer = _e[1];
                            if (consumer.appData.peerId === peerId) {
                                consumer.close();
                                this.consumers["delete"](consumerId);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return VideoService;
}());
exports.VideoService = VideoService;
