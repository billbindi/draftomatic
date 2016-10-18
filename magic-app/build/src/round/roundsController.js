var Magic;
(function (Magic) {
    var App;
    (function (App) {
        var Round;
        (function (Round) {
            var RoundsController = (function () {
                function RoundsController($scope, $stateParams, $http) {
                    var _this = this;
                    this.tournamentId = $stateParams["id"];
                    this.scope = $scope;
                    this.http = $http;
                    this.http.get("api/tournament/status/" + this.tournamentId).then(function (response) {
                        console.log(response);
                        _this.tournament = response.data.tournamentData;
                        _this.tournament.complete = response.data.complete;
                        _this.tournament.currentRound = response.data.currentRound;
                        _this.tournament.finalStandings = response.data.finalStandings;
                        _this.http.get("api/tournament/standings/" + _this.tournamentId + "?round=0").then(function (response) {
                            var evenLength = response.data.length;
                            if (evenLength % 2 != 0) {
                                evenLength = evenLength - 1;
                            }
                            _this.seatings = new Array(response.data.length);
                            var j = 0;
                            for (var i = 0; i < evenLength; i += 2) {
                                _this.seatings[j] = response.data[i].player.name;
                                j++;
                            }
                            for (var i = 1; i < evenLength; i += 2) {
                                _this.seatings[j] = response.data[i].player.name;
                                j++;
                            }
                            if (response.data.length % 2 != 0) {
                                //there is a bye
                                _this.seatings[response.data.length - 1] = response.data[response.data.length - 1].player.name;
                            }
                        });
                    });
                }
                RoundsController.prototype.pairNextRound = function () {
                    var _this = this;
                    var latestRound = this.tournament.rounds[this.tournament.currentRound - 1];
                    latestRound.complete = true;
                    this.http.put("api/tournament/results/" + this.tournamentId, latestRound.matches).then(function (response) {
                        _this.tournament.rounds.push(response.data);
                        _this.tournament.currentRound = response.data.number;
                    });
                };
                RoundsController.prototype.undoLastRound = function () {
                    var _this = this;
                    this.http.delete("api/tournament/round/" + this.tournamentId).then(function (response) {
                        _this.tournament.complete = false;
                        var latestRound = _this.tournament.rounds[_this.tournament.currentRound - 1];
                        if (!latestRound.complete) {
                            _this.tournament.rounds.pop();
                        }
                        _this.tournament.rounds.pop();
                        _this.tournament.rounds.push(response.data);
                        _this.tournament.currentRound = _this.tournament.rounds.length;
                    });
                };
                RoundsController.prototype.getFinalStandings = function () {
                    var _this = this;
                    this.tournament.complete = true;
                    var latestRound = this.tournament.rounds[this.tournament.currentRound - 1];
                    latestRound.complete = true;
                    this.http.put("api/tournament/results/" + this.tournamentId, latestRound.matches).then(function () {
                        _this.http.get("api/tournament/standings/" + _this.tournamentId).then(function (response) {
                            _this.tournament.finalStandings = response.data;
                        });
                    });
                };
                RoundsController.prototype.downloadTournamentData = function () {
                    window.location.href = "api/tournament/export/" + this.tournamentId;
                };
                RoundsController.$inject = ["$scope", "$stateParams", "$http"];
                return RoundsController;
            })();
            Round.RoundsController = RoundsController;
            App.magic.controller("roundsController", RoundsController);
        })(Round = App.Round || (App.Round = {}));
    })(App = Magic.App || (Magic.App = {}));
})(Magic || (Magic = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdW5kL3JvdW5kc0NvbnRyb2xsZXIudHMiXSwibmFtZXMiOlsiTWFnaWMiLCJNYWdpYy5BcHAiLCJNYWdpYy5BcHAuUm91bmQiLCJNYWdpYy5BcHAuUm91bmQuUm91bmRzQ29udHJvbGxlciIsIk1hZ2ljLkFwcC5Sb3VuZC5Sb3VuZHNDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTWFnaWMuQXBwLlJvdW5kLlJvdW5kc0NvbnRyb2xsZXIucGFpck5leHRSb3VuZCIsIk1hZ2ljLkFwcC5Sb3VuZC5Sb3VuZHNDb250cm9sbGVyLnVuZG9MYXN0Um91bmQiLCJNYWdpYy5BcHAuUm91bmQuUm91bmRzQ29udHJvbGxlci5nZXRGaW5hbFN0YW5kaW5ncyIsIk1hZ2ljLkFwcC5Sb3VuZC5Sb3VuZHNDb250cm9sbGVyLmRvd25sb2FkVG91cm5hbWVudERhdGEiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxDQWtGWDtBQWxGRCxXQUFPLEtBQUs7SUFBQ0EsSUFBQUEsR0FBR0EsQ0FrRmZBO0lBbEZZQSxXQUFBQSxHQUFHQTtRQUFDQyxJQUFBQSxLQUFLQSxDQWtGckJBO1FBbEZnQkEsV0FBQUEsS0FBS0EsRUFBQ0EsQ0FBQ0E7WUFFcEJDO2dCQVFJQywwQkFBWUEsTUFBaUJBLEVBQUVBLFlBQXVDQSxFQUFFQSxLQUFzQkE7b0JBUmxHQyxpQkE2RUNBO29CQXBFT0EsSUFBSUEsQ0FBQ0EsWUFBWUEsR0FBR0EsWUFBWUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0E7b0JBQ3ZDQSxJQUFJQSxDQUFDQSxLQUFLQSxHQUFHQSxNQUFNQSxDQUFDQTtvQkFDcEJBLElBQUlBLENBQUNBLElBQUlBLEdBQUdBLEtBQUtBLENBQUNBO29CQUNsQkEsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBTUEsd0JBQXdCQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxRQUFRQTt3QkFDM0VBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO3dCQUN0QkEsS0FBSUEsQ0FBQ0EsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7d0JBQy9DQSxLQUFJQSxDQUFDQSxVQUFVQSxDQUFDQSxRQUFRQSxHQUFHQSxRQUFRQSxDQUFDQSxJQUFJQSxDQUFDQSxRQUFRQSxDQUFDQTt3QkFDbERBLEtBQUlBLENBQUNBLFVBQVVBLENBQUNBLFlBQVlBLEdBQUdBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFlBQVlBLENBQUNBO3dCQUMxREEsS0FBSUEsQ0FBQ0EsVUFBVUEsQ0FBQ0EsY0FBY0EsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsY0FBY0EsQ0FBQ0E7d0JBQzlEQSxLQUFJQSxDQUFDQSxJQUFJQSxDQUFDQSxHQUFHQSxDQUFNQSwyQkFBMkJBLEdBQUdBLEtBQUlBLENBQUNBLFlBQVlBLEdBQUdBLFVBQVVBLENBQUNBLENBQUNBLElBQUlBLENBQUNBLFVBQUNBLFFBQVFBOzRCQUMzRkEsSUFBSUEsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0E7NEJBQ3RDQSxFQUFFQSxDQUFDQSxDQUFDQSxVQUFVQSxHQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQSxDQUFDQTtnQ0FDcEJBLFVBQVVBLEdBQUdBLFVBQVVBLEdBQUdBLENBQUNBLENBQUNBOzRCQUNoQ0EsQ0FBQ0E7NEJBQ0RBLEtBQUlBLENBQUNBLFFBQVFBLEdBQUdBLElBQUlBLEtBQUtBLENBQUNBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLE1BQU1BLENBQUNBLENBQUNBOzRCQUNoREEsSUFBSUEsQ0FBQ0EsR0FBR0EsQ0FBQ0EsQ0FBQ0E7NEJBQ1ZBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLENBQUNBLEdBQUdBLENBQUNBLEVBQUVBLENBQUNBLEdBQUdBLFVBQVVBLEVBQUVBLENBQUNBLElBQUlBLENBQUNBLEVBQUVBLENBQUNBO2dDQUNy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REFBc0JBLEdBQTdCQTtvQkFDSUssTUFBTUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsR0FBR0Esd0JBQXdCQSxHQUFHQSxJQUFJQSxDQUFDQSxZQUFZQSxDQUFDQTtnQkFDeEVBLENBQUNBO2dCQXhFYUwsd0JBQU9BLEdBQUdBLENBQUNBLFFBQVFBLEVBQUVBLGNBQWNBLEVBQUVBLE9BQU9BLENBQUNBLENBQUNBO2dCQXlFaEVBLHVCQUFDQTtZQUFEQSxDQTdFQUQsQUE2RUNDLElBQUFEO1lBN0VZQSxzQkFBZ0JBLG1CQTZFNUJBLENBQUFBO1lBRURBLFNBQUtBLENBQUNBLFVBQVVBLENBQUNBLGtCQUFrQkEsRUFBRUEsZ0JBQWdCQSxDQUFDQSxDQUFDQTtRQUMzREEsQ0FBQ0EsRUFsRmdCRCxLQUFLQSxHQUFMQSxTQUFLQSxLQUFMQSxTQUFLQSxRQWtGckJBO0lBQURBLENBQUNBLEVBbEZZRCxHQUFHQSxHQUFIQSxTQUFHQSxLQUFIQSxTQUFHQSxRQWtGZkE7QUFBREEsQ0FBQ0EsRUFsRk0sS0FBSyxLQUFMLEtBQUssUUFrRlgiLCJmaWxlIjoicm91bmQvcm91bmRzQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBNYWdpYy5BcHAuUm91bmQge1xuXG4gICAgZXhwb3J0IGNsYXNzIFJvdW5kc0NvbnRyb2xsZXIge1xuICAgICAgICBwcml2YXRlIHNjb3BlOiBuZy5JU2NvcGU7XG4gICAgICAgIHB1YmxpYyB0b3VybmFtZW50OiBhbnk7XG4gICAgICAgIHB1YmxpYyBzZWF0aW5nczogYW55O1xuICAgICAgICBwdWJsaWMgc3RhdGljICRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkc3RhdGVQYXJhbXNcIiwgXCIkaHR0cFwiXTtcbiAgICAgICAgcHJpdmF0ZSB0b3VybmFtZW50SWQgOiBzdHJpbmc7XG4gICAgICAgIHByaXZhdGUgaHR0cCA6IG5nLklIdHRwU2VydmljZTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0cnVjdG9yKCRzY29wZTogbmcuSVNjb3BlLCAkc3RhdGVQYXJhbXM6IG5nLnVpLklTdGF0ZVBhcmFtc1NlcnZpY2UsICRodHRwOiBuZy5JSHR0cFNlcnZpY2UpIHtcbiAgICAgICAgICAgIHRoaXMudG91cm5hbWVudElkID0gJHN0YXRlUGFyYW1zW1wiaWRcIl07XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gJHNjb3BlO1xuICAgICAgICAgICAgdGhpcy5odHRwID0gJGh0dHA7XG4gICAgICAgICAgICB0aGlzLmh0dHAuZ2V0PGFueT4oXCJhcGkvdG91cm5hbWVudC9zdGF0dXMvXCIgKyB0aGlzLnRvdXJuYW1lbnRJZCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VybmFtZW50ID0gcmVzcG9uc2UuZGF0YS50b3VybmFtZW50RGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQuY29tcGxldGUgPSByZXNwb25zZS5kYXRhLmNvbXBsZXRlO1xuICAgICAgICAgICAgICAgIHRoaXMudG91cm5hbWVudC5jdXJyZW50Um91bmQgPSByZXNwb25zZS5kYXRhLmN1cnJlbnRSb3VuZDtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQuZmluYWxTdGFuZGluZ3MgPSByZXNwb25zZS5kYXRhLmZpbmFsU3RhbmRpbmdzO1xuICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5nZXQ8YW55PihcImFwaS90b3VybmFtZW50L3N0YW5kaW5ncy9cIiArIHRoaXMudG91cm5hbWVudElkICsgXCI/cm91bmQ9MFwiKS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbkxlbmd0aCA9IHJlc3BvbnNlLmRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbkxlbmd0aCUyICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW5MZW5ndGggPSBldmVuTGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlYXRpbmdzID0gbmV3IEFycmF5KHJlc3BvbnNlLmRhdGEubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV2ZW5MZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWF0aW5nc1tqXSA9IHJlc3BvbnNlLmRhdGFbaV0ucGxheWVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBqKys7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBldmVuTGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdGluZ3Nbal0gPSByZXNwb25zZS5kYXRhW2ldLnBsYXllci5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaisrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5kYXRhLmxlbmd0aCUyICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhlcmUgaXMgYSBieWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VhdGluZ3NbcmVzcG9uc2UuZGF0YS5sZW5ndGggLSAxXSA9IHJlc3BvbnNlLmRhdGFbcmVzcG9uc2UuZGF0YS5sZW5ndGgtMV0ucGxheWVyLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgcGFpck5leHRSb3VuZCgpIHtcbiAgICAgICAgICAgIHZhciBsYXRlc3RSb3VuZCA9IHRoaXMudG91cm5hbWVudC5yb3VuZHNbdGhpcy50b3VybmFtZW50LmN1cnJlbnRSb3VuZC0xXTtcbiAgICAgICAgICAgIGxhdGVzdFJvdW5kLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wdXQ8YW55PihcImFwaS90b3VybmFtZW50L3Jlc3VsdHMvXCIgKyB0aGlzLnRvdXJuYW1lbnRJZCwgbGF0ZXN0Um91bmQubWF0Y2hlcykudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQucm91bmRzLnB1c2gocmVzcG9uc2UuZGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3VybmFtZW50LmN1cnJlbnRSb3VuZCA9IHJlc3BvbnNlLmRhdGEubnVtYmVyO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHB1YmxpYyB1bmRvTGFzdFJvdW5kKCkge1xuICAgICAgICAgICAgdGhpcy5odHRwLmRlbGV0ZTxhbnk+KFwiYXBpL3RvdXJuYW1lbnQvcm91bmQvXCIgKyB0aGlzLnRvdXJuYW1lbnRJZCkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQuY29tcGxldGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbGF0ZXN0Um91bmQgPSB0aGlzLnRvdXJuYW1lbnQucm91bmRzW3RoaXMudG91cm5hbWVudC5jdXJyZW50Um91bmQtMV07XG4gICAgICAgICAgICAgICAgaWYgKCFsYXRlc3RSb3VuZC5jb21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQucm91bmRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQucm91bmRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHRoaXMudG91cm5hbWVudC5yb3VuZHMucHVzaChyZXNwb25zZS5kYXRhKTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvdXJuYW1lbnQuY3VycmVudFJvdW5kID0gdGhpcy50b3VybmFtZW50LnJvdW5kcy5sZW5ndGg7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcHVibGljIGdldEZpbmFsU3RhbmRpbmdzKCkge1xuICAgICAgICAgICAgdGhpcy50b3VybmFtZW50LmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBsYXRlc3RSb3VuZCA9IHRoaXMudG91cm5hbWVudC5yb3VuZHNbdGhpcy50b3VybmFtZW50LmN1cnJlbnRSb3VuZC0xXTtcbiAgICAgICAgICAgIGxhdGVzdFJvdW5kLmNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuaHR0cC5wdXQ8YW55PihcImFwaS90b3VybmFtZW50L3Jlc3VsdHMvXCIgKyB0aGlzLnRvdXJuYW1lbnRJZCwgbGF0ZXN0Um91bmQubWF0Y2hlcykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5odHRwLmdldDxhbnk+KFwiYXBpL3RvdXJuYW1lbnQvc3RhbmRpbmdzL1wiICsgdGhpcy50b3VybmFtZW50SWQpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG91cm5hbWVudC5maW5hbFN0YW5kaW5ncyA9IHJlc3BvbnNlLmRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBwdWJsaWMgZG93bmxvYWRUb3VybmFtZW50RGF0YSgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gXCJhcGkvdG91cm5hbWVudC9leHBvcnQvXCIgKyB0aGlzLnRvdXJuYW1lbnRJZDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1hZ2ljLmNvbnRyb2xsZXIoXCJyb3VuZHNDb250cm9sbGVyXCIsIFJvdW5kc0NvbnRyb2xsZXIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9