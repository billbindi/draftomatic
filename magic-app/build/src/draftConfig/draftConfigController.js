var Magic;
(function (Magic) {
    var App;
    (function (App) {
        var DraftConfig;
        (function (DraftConfig) {
            var DraftConfigController = (function () {
                function DraftConfigController($scope, $http) {
                    var _this = this;
                    this.$scope = $scope;
                    this.$scope.draftConfigController = this;
                    $http.get("api/players/list").then(function (response) {
                        console.log(response);
                        _this.$scope.allPlayers = response.data;
                    });
                    this.sets = [
                        {
                            name: "Magic: Origins",
                            value: "ori"
                        },
                        {
                            name: "Dragons of Tarkir",
                            value: "dtk"
                        },
                        {
                            name: "Battle for Zendikar",
                            value: "bfz"
                        },
                        {
                            name: "Modern Masters 2015",
                            value: "mm2"
                        },
                        {
                            name: "Oath of the Gatewatch",
                            value: "otg"
                        },
                        {
                            name: "Shadows Over Innistrad",
                            value: "soi"
                        },
                        {
                            name: "Eternal Masters",
                            value: "ema"
                        },
                        {
                            name: "Eldritch Moon",
                            value: "emn"
                        }
                    ];
                    this.formats = ["LIMITED_DRAFT", "LIMITED_TEAM_DRAFT", "LIMITED_SEALED",
                        "LIMITED_TEAM_SEALED", "LIMITED_2HG_SEALED", "LIMITED_2HG_DRAFT",
                        "CONSTRUCTED_CASUAL", "CONSTRUCTED_STANDARD", "CONSTRUCTED_MODERN",
                        "CONSTRUCTED_LEGACY", "CONSTRUCTED_VINTAGE"];
                }
                DraftConfigController.prototype.addPendingPlayer = function () {
                    console.log(this.pendingPlayer);
                    if (typeof this.pendingPlayer === 'string') {
                        // if the new player is specified by the user, it will show up as a string
                        if ((this.pendingPlayer).length > 0) {
                            this.$scope.tournamentModel.players.push({
                                name: this.pendingPlayer,
                                id: -1,
                            });
                        }
                    }
                    else if (this.pendingPlayer.name.trim().length > 0) {
                        this.$scope.tournamentModel.players.push({
                            name: this.pendingPlayer.name,
                            id: this.pendingPlayer.id
                        });
                    }
                    ;
                    this.pendingPlayer = "";
                };
                DraftConfigController.prototype.removePlayer = function (player) {
                    _.remove(this.$scope.tournamentModel.players, player);
                };
                DraftConfigController.$inject = ["$scope", "$http"];
                return DraftConfigController;
            })();
            DraftConfig.DraftConfigController = DraftConfigController;
            App.magic.controller("draftConfigController", DraftConfigController);
        })(DraftConfig = App.DraftConfig || (App.DraftConfig = {}));
    })(App = Magic.App || (Magic.App = {}));
})(Magic || (Magic = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRyYWZ0Q29uZmlnL2RyYWZ0Q29uZmlnQ29udHJvbGxlci50cyJdLCJuYW1lcyI6WyJNYWdpYyIsIk1hZ2ljLkFwcCIsIk1hZ2ljLkFwcC5EcmFmdENvbmZpZyIsIk1hZ2ljLkFwcC5EcmFmdENvbmZpZy5EcmFmdENvbmZpZ0NvbnRyb2xsZXIiLCJNYWdpYy5BcHAuRHJhZnRDb25maWcuRHJhZnRDb25maWdDb250cm9sbGVyLmNvbnN0cnVjdG9yIiwiTWFnaWMuQXBwLkRyYWZ0Q29uZmlnLkRyYWZ0Q29uZmlnQ29udHJvbGxlci5hZGRQZW5kaW5nUGxheWVyIiwiTWFnaWMuQXBwLkRyYWZ0Q29uZmlnLkRyYWZ0Q29uZmlnQ29udHJvbGxlci5yZW1vdmVQbGF5ZXIiXSwibWFwcGluZ3MiOiJBQUFBLElBQU8sS0FBSyxDQTJHWDtBQTNHRCxXQUFPLEtBQUs7SUFBQ0EsSUFBQUEsR0FBR0EsQ0EyR2ZBO0lBM0dZQSxXQUFBQSxHQUFHQTtRQUFDQyxJQUFBQSxXQUFXQSxDQTJHM0JBO1FBM0dnQkEsV0FBQUEsV0FBV0EsRUFBQ0EsQ0FBQ0E7WUE2QjFCQztnQkFNSUMsK0JBQVlBLE1BQXlCQSxFQUFFQSxLQUFzQkE7b0JBTmpFQyxpQkEyRUNBO29CQXBFT0EsSUFBSUEsQ0FBQ0EsTUFBTUEsR0FBR0EsTUFBTUEsQ0FBQ0E7b0JBQ3JCQSxJQUFJQSxDQUFDQSxNQUFNQSxDQUFDQSxxQkFBcUJBLEdBQUdBLElBQUlBLENBQUNBO29CQUN6Q0EsS0FBS0EsQ0FBQ0EsR0FBR0EsQ0FBTUEsa0JBQWtCQSxDQUFDQSxDQUFDQSxJQUFJQSxDQUFDQSxVQUFDQSxRQUFRQTt3QkFDN0NBLE9BQU9BLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUFBO3dCQUNyQkEsS0FBSUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsVUFBVUEsR0FBR0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0E7b0JBQzNDQSxDQUFDQSxDQUFDQSxDQUFDQTtvQkFDSEEsSUFBSUEsQ0FBQ0EsSUFBSUEs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QUFRQSxFQUFFQSxPQUFPQSxDQUFDQSxDQUFDQTtnQkFzRWhEQSw0QkFBQ0E7WUFBREEsQ0EzRUFELEFBMkVDQyxJQUFBRDtZQTNFWUEsaUNBQXFCQSx3QkEyRWpDQSxDQUFBQTtZQUVEQSxTQUFLQSxDQUFDQSxVQUFVQSxDQUFDQSx1QkFBdUJBLEVBQUVBLHFCQUFxQkEsQ0FBQ0EsQ0FBQ0E7UUFDckVBLENBQUNBLEVBM0dnQkQsV0FBV0EsR0FBWEEsZUFBV0EsS0FBWEEsZUFBV0EsUUEyRzNCQTtJQUFEQSxDQUFDQSxFQTNHWUQsR0FBR0EsR0FBSEEsU0FBR0EsS0FBSEEsU0FBR0EsUUEyR2ZBO0FBQURBLENBQUNBLEVBM0dNLEtBQUssS0FBTCxLQUFLLFFBMkdYIiwiZmlsZSI6ImRyYWZ0Q29uZmlnL2RyYWZ0Q29uZmlnQ29udHJvbGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZSBNYWdpYy5BcHAuRHJhZnRDb25maWcge1xuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJVG91cm5hbWVudE1vZGVsIHtcbiAgICAgICAgbnVtUm91bmRzOiBudW1iZXI7XG4gICAgICAgIHBsYXllcnM6IElQbGF5ZXJbXTtcbiAgICAgICAgZm9ybWF0OiBzdHJpbmc7XG4gICAgICAgIHNldDogc3RyaW5nO1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSVBsYXllciB7XG4gICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgaWQ6IG51bWJlcjtcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIElTZXQge1xuICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBJRHJhZnRDb25maWdDb250cm9sbGVyIHtcblxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSURyYWZ0Q29uZmlnU2NvcGUgZXh0ZW5kcyBuZy5JU2NvcGUge1xuICAgICAgICBkcmFmdENvbmZpZ0NvbnRyb2xsZXI6IElEcmFmdENvbmZpZ0NvbnRyb2xsZXI7XG4gICAgICAgIHRvdXJuYW1lbnRNb2RlbDogSVRvdXJuYW1lbnRNb2RlbDtcbiAgICAgICAgYWxsUGxheWVyczogSVBsYXllcltdO1xuICAgIH1cblxuICAgIGV4cG9ydCBjbGFzcyBEcmFmdENvbmZpZ0NvbnRyb2xsZXIgaW1wbGVtZW50cyBJRHJhZnRDb25maWdDb250cm9sbGVyIHtcbiAgICAgICAgcHJpdmF0ZSAkc2NvcGU6IElEcmFmdENvbmZpZ1Njb3BlO1xuICAgICAgICBwdWJsaWMgZm9ybWF0czogc3RyaW5nW107XG4gICAgICAgIHB1YmxpYyBzZXRzOiBJU2V0W107XG4gICAgICAgIHB1YmxpYyBwZW5kaW5nUGxheWVyOiBhbnk7XG4gICAgICAgIHB1YmxpYyBzdGF0aWMgJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRodHRwXCJdO1xuICAgICAgICBjb25zdHJ1Y3Rvcigkc2NvcGU6IElEcmFmdENvbmZpZ1Njb3BlLCAkaHR0cDogbmcuSUh0dHBTZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLiRzY29wZSA9ICRzY29wZTtcbiAgICAgICAgICAgIHRoaXMuJHNjb3BlLmRyYWZ0Q29uZmlnQ29udHJvbGxlciA9IHRoaXM7XG4gICAgICAgICAgICAkaHR0cC5nZXQ8YW55PihcImFwaS9wbGF5ZXJzL2xpc3RcIikudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSlcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS5hbGxQbGF5ZXJzID0gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5zZXRzID0gW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJNYWdpYzogT3JpZ2luc1wiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJvcmlcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIkRyYWdvbnMgb2YgVGFya2lyXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImR0a1wiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiQmF0dGxlIGZvciBaZW5kaWthclwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJiZnpcIlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIk1vZGVybiBNYXN0ZXJzIDIwMTVcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwibW0yXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJPYXRoIG9mIHRoZSBHYXRld2F0Y2hcIixcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IFwib3RnXCJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJTaGFkb3dzIE92ZXIgSW5uaXN0cmFkXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcInNvaVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRXRlcm5hbCBNYXN0ZXJzXCIsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBcImVtYVwiXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiRWxkcml0Y2ggTW9vblwiLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogXCJlbW5cIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLmZvcm1hdHMgPSBbXCJMSU1JVEVEX0RSQUZUXCIsIFwiTElNSVRFRF9URUFNX0RSQUZUXCIsIFwiTElNSVRFRF9TRUFMRURcIixcbiAgICAgICAgICAgIFwiTElNSVRFRF9URUFNX1NFQUxFRFwiLCBcIkxJTUlURURfMkhHX1NFQUxFRFwiLCBcIkxJTUlURURfMkhHX0RSQUZUXCIsXG4gICAgICAgICAgICBcIkNPTlNUUlVDVEVEX0NBU1VBTFwiLCBcIkNPTlNUUlVDVEVEX1NUQU5EQVJEXCIsIFwiQ09OU1RSVUNURURfTU9ERVJOXCIsXG4gICAgICAgICAgICBcIkNPTlNUUlVDVEVEX0xFR0FDWVwiLCBcIkNPTlNUUlVDVEVEX1ZJTlRBR0VcIl1cbiAgICAgICAgfVxuXG4gICAgICAgIHB1YmxpYyBhZGRQZW5kaW5nUGxheWVyKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5wZW5kaW5nUGxheWVyKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5wZW5kaW5nUGxheWVyID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBuZXcgcGxheWVyIGlzIHNwZWNpZmllZCBieSB0aGUgdXNlciwgaXQgd2lsbCBzaG93IHVwIGFzIGEgc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKCh0aGlzLnBlbmRpbmdQbGF5ZXIpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2NvcGUudG91cm5hbWVudE1vZGVsLnBsYXllcnMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiB0aGlzLnBlbmRpbmdQbGF5ZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogLTEsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wZW5kaW5nUGxheWVyLm5hbWUudHJpbSgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzY29wZS50b3VybmFtZW50TW9kZWwucGxheWVycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogdGhpcy5wZW5kaW5nUGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGlkOiB0aGlzLnBlbmRpbmdQbGF5ZXIuaWRcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLnBlbmRpbmdQbGF5ZXIgPSBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgcHVibGljIHJlbW92ZVBsYXllcihwbGF5ZXI6IElQbGF5ZXIpIHtcbiAgICAgICAgICAgIF8ucmVtb3ZlKHRoaXMuJHNjb3BlLnRvdXJuYW1lbnRNb2RlbC5wbGF5ZXJzLCBwbGF5ZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbWFnaWMuY29udHJvbGxlcihcImRyYWZ0Q29uZmlnQ29udHJvbGxlclwiLCBEcmFmdENvbmZpZ0NvbnRyb2xsZXIpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9