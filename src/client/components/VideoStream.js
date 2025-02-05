"use strict";
exports.__esModule = true;
var react_1 = require("react");
var VideoStream = function (_a) {
    var stream = _a.stream;
    var videoRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        if (videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (<div className="video-stream">
            <video ref={videoRef} autoPlay playsInline/>
        </div>);
};
exports["default"] = VideoStream;
