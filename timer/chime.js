var Timer;
(function (Timer) {
    "use strict";
    var Chime = /** @class */ (function () {
        function Chime() {
            this.chime = new Audio();
            this.chime.src = "/timer/chime.mp3";
            this.chime.loop = true;
            this.chime.autoplay = false;
            this.chime.load();
        }
        Chime.prototype.start = function () {
            this.stop();
            if (this.chime.paused) {
                this.chime.play();
            }
        };
        Chime.prototype.stop = function () {
            if (!this.chime.paused) {
                this.chime.pause();
                this.chime.currentTime = 0;
            }
        };
        return Chime;
    }());
    Timer.Chime = Chime;
})(Timer || (Timer = {}));
//# sourceMappingURL=chime.js.map