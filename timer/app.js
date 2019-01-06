var Timer;
(function (Timer) {
    "use strict";
    var TimeLimit;
    (function (TimeLimit) {
        TimeLimit[TimeLimit["ONE_HOUR"] = 3600] = "ONE_HOUR";
        TimeLimit[TimeLimit["THIRTY_THREE_AND_THIRD"] = 2013] = "THIRTY_THREE_AND_THIRD";
        TimeLimit[TimeLimit["THIRTY_MINUTES"] = 1800] = "THIRTY_MINUTES";
        TimeLimit[TimeLimit["FIFTEEN_MINUTES"] = 900] = "FIFTEEN_MINUTES";
        TimeLimit[TimeLimit["TEN_MINUTES"] = 600] = "TEN_MINUTES";
        TimeLimit[TimeLimit["FIVE_MINUTES"] = 300] = "FIVE_MINUTES";
        TimeLimit[TimeLimit["THREE_MINUTES"] = 180] = "THREE_MINUTES";
        TimeLimit[TimeLimit["TWO_MINUTES"] = 120] = "TWO_MINUTES";
        TimeLimit[TimeLimit["ONE_MINUTE"] = 60] = "ONE_MINUTE";
    })(TimeLimit = Timer.TimeLimit || (Timer.TimeLimit = {}));
    var App = /** @class */ (function () {
        function App() {
            var _this = this;
            this.limit = TimeLimit.ONE_HOUR;
            this.isPaused = true;
            this.ONE_SECOND_IN_MS = 1000;
            this.chime = new Timer.Chime();
            this._stop();
            this._click("play").subscribe(function () { return _this._play(); });
            this._click("pause").subscribe(function () { return _this._pause(); });
            this._click("stop").subscribe(function () { return _this._stop(); });
            this._click("hour").subscribe(function () { return _this._limit(TimeLimit.ONE_HOUR); });
            this._click("min33").subscribe(function () { return _this._limit(TimeLimit.THIRTY_THREE_AND_THIRD); });
            this._click("min30").subscribe(function () { return _this._limit(TimeLimit.THIRTY_MINUTES); });
            this._click("min15").subscribe(function () { return _this._limit(TimeLimit.FIFTEEN_MINUTES); });
            this._click("min10").subscribe(function () { return _this._limit(TimeLimit.TEN_MINUTES); });
            this._click("min5").subscribe(function () { return _this._limit(TimeLimit.FIVE_MINUTES); });
            this._click("min3").subscribe(function () { return _this._limit(TimeLimit.THREE_MINUTES); });
            this._click("min2").subscribe(function () { return _this._limit(TimeLimit.TWO_MINUTES); });
            this._click("min1").subscribe(function () { return _this._limit(TimeLimit.ONE_MINUTE); });
            Rx.Observable
                .interval(this.ONE_SECOND_IN_MS)
                .subscribe(function () {
                _this._tick();
            });
        }
        App.prototype._chime = function () {
            if (this.isPaused === false && this.countDown <= 0) {
                this.chime.start();
                this._pause();
            }
        };
        App.prototype._redraw = function () {
            var minTag = document.getElementById("minutes");
            var secTag = document.getElementById("seconds");
            var minute = 60;
            var minutes = Math.floor(this.countDown / minute);
            var seconds = Math.floor(this.countDown % minute);
            minTag.innerHTML = this._format(minutes);
            secTag.innerHTML = this._format(seconds);
        };
        App.prototype._format = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        };
        App.prototype._tick = function () {
            if (this.isPaused === false) {
                this.countDown--;
                this._redraw();
                this._chime();
            }
        };
        App.prototype._play = function () {
            this.isPaused = false;
        };
        App.prototype._pause = function () {
            this.isPaused = true;
        };
        App.prototype._stop = function () {
            this._pause();
            this.chime.stop();
            this.countDown = this.limit;
            this._redraw();
        };
        App.prototype._click = function (id) {
            var tag = document.getElementById(id);
            return Rx.Observable.fromEvent(tag, "click");
        };
        App.prototype._limit = function (limit) {
            this.limit = limit;
            this._stop();
        };
        return App;
    }());
    Timer.App = App;
})(Timer || (Timer = {}));
//# sourceMappingURL=app.js.map