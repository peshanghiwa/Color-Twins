//Must Have Imports
import { mapGetters, mapActions } from "vuex";
import { getData, addData } from "./../../userDatabase.js";
import axios from "axios";
import Granim from "granim";
import lottie from "lottie-web";
import { Howl, Howler } from "howler";
import {
  addUserData,
  getUserData,
  updateUserData,
  getSpecificUserData,
  updateStats,
  getStatDatas
} from "./routes";

let click = new Howl({
  src: ["./src/details/musics/click.mp3"],
  volume: 0.1
});
let done = new Howl({
  src: ["./src/details/musics/done.mp3"],
  volume: 0.1
});
let wrong = new Howl({
  src: ["./src/details/musics/wrong.mp3"],
  volume: 0.1
});
let success = new Howl({
  src: ["./src/details/musics/success.mp3"],
  volume: 0.1
});

let backgroundMusic = new Howl({
  src: ["./src/details/musics/backgroundMusic.m4a"]
});

//EasyTimer.js Configurations
var easytimer = require("easytimer");
var timer = new easytimer();
timer.addEventListener("secondsUpdated", function(e) {
  $("#timerInSecond").html(timer.getTimeValues().seconds);
});
timer.addEventListener("secondsUpdated", function(e) {
  $("#timerInMinute").html(timer.getTimeValues().minutes);
});

window.setTimeout(() => {
  var granimInstance = new Granim({
    element: "#canvas",
    direction: "left-right",
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          ["#833471", "#D980FA"],
          ["#ff9f43", "#feca57"],
          ["#1dd1a1", "#48dbfb"],
          ["#833471", "#D980FA"],
          ["#ff7675", "#e17055"],
          ["#fd79a8", "#74b9ff"]
        ]
      }
    }
  });

  // var menuAnimation = lottie.loadAnimation({
  //   container: document.getElementById("menuIcon"),
  //   path: "./src/details/SVG/menuIcon/data.json",
  //   renderer: "svg",
  //   loop: false,
  //   autoplay: false,
  //   name: "Hello World"
  // });

  // const menuIcon = document.getElementById("menuContainer");
  // menuIcon.addEventListener("mouseenter", () => {
  //   menuAnimation.play();
  // });

  // menuIcon.addEventListener("mouseleave", () => {
  //   menuAnimation.stop();
  // });
}, 1);

export default {
  data() {
    return {
      difficultyOptions: ["4 X 4", "6 X 6"],
      selectedDifficulty: $cookies.get("difficulty"),
      boxStyle: $cookies.get("difficulty") == "4 X 4" ? "box4" : "box6",
      startGame: false,
      endGame: false,
      clicks: 0,
      clickCounter: 0,
      winAlert: 0,
      boxNumber1: { hor: 0, ver: 0, checked: false },
      boxNumber2: { hor: 0, ver: 0, checked: false },
      buttonCheck: false,
      availableColors: [],
      boxColors: [],
      musics: $cookies.get("musicAllow"),
      timeFinishedInSecond: 0,
      timeFinishedInMinute: 0,
      timeReport: 0,
      fullReport: 0,
      gameReview: undefined,
      gameStats: undefined,
      userDetails: undefined,
      reviewed: $cookies.get("reviewed") || false,
      rateGame: undefined
    };
  },
  computed: {
    ...mapGetters([
      "getselectedDifficulty",
      "getNumberOfBoxes",
      "getBoxColors",
      "getMusicPlay"
    ])
  },
  methods: {
    starsHovered(index) {
      for (let i = 0; i <= index; i++) {
        document.getElementsByClassName("ratingStars")[i].style.color =
          "#6D214F";
      }
    },
    starsleft(index) {
      for (let i = 0; i <= index; i++) {
        document.getElementsByClassName("ratingStars")[i].style.color =
          "#2d3436";
      }
    },
    starsClicked(item) {
      this.gameReview = item;
      updateUserData({ rating: this.gameReview }, this.userDetails._id);
      $cookies.set("reviewed", true);
      this.reviewed = !this.reviewed;
      document.querySelector(".reviewText").innerHTML = "Thanks For The Review";
    },
    startGameFunction() {
      this.startGame = true;
      timer.start();
    },
    getFinishedTimer() {
      const minute = document.getElementById("timerInMinute").innerHTML;
      const second = document.getElementById("timerInSecond").innerHTML;
      this.timeFinishedInMinute = parseInt(minute, 10);
      this.timeFinishedInSecond = parseInt(second, 10);
      this.timeReport = parseInt(minute, 10) * 60 + parseInt(second, 10);
    },
    mainPage() {
      location.assign("/");
    },
    leaderboard() {
      location.assign("/leaderboard");
    },
    setDifficulty() {
      $cookies.set("difficulty", this.selectedDifficulty);
      window.location.reload();
      this.$store.dispatch({
        type: "setDifficulty",
        value: $cookies.get("difficulty")
      });

      this.gameGenerator();
    },
    search(nameKey, myArray) {
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i].id === nameKey) {
          return myArray[i];
        }
      }
    },
    shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
      }
      return a;
    },
    boxClicked(m, n) {
      //get the clicked element
      const element = document.getElementById(`${m}and${n}`);
      let boxDetail = this.search(`${m}and${n}`, this.boxColors);

      //check if it's the first or second box is opening through an if statement
      if (this.clicks == 0) {
        //get the box data to it' variable in the DATA above
        this.boxNumber1 = { hor: m, ver: n };
        this.clicks++;
        this.clickCounter++;

        //change the clicked element behavior
        let box1 = document.getElementById(
          `${this.boxNumber1.hor}and${this.boxNumber1.ver}`
        );

        $(box1).css({
          "background-color": `${boxDetail.color}`,
          "pointer-events": "none"
        });
        click.play();
        //if it's the second bx then this else block gets compiled
      } else {
        //get the box data to it' variable in the DATA above
        this.boxNumber2 = { hor: m, ver: n };
        this.clicks = 0;
        this.clickCounter++;

        //change the clicked element behavior
        let box2 = document.getElementById(
          `${this.boxNumber2.hor}and${this.boxNumber2.ver}`
        );

        $(box2).css({
          "background-color": `${boxDetail.color}`,
          "pointer-events": "none"
        });
        //go for the final check
        this.checkMatch();
      }
    },
    checkMatch() {
      let box1 = document.getElementById(
        `${this.boxNumber1.hor}and${this.boxNumber1.ver}`
      );
      let box2 = document.getElementById(
        `${this.boxNumber2.hor}and${this.boxNumber2.ver}`
      );

      if (box1.style.backgroundColor != box2.style.backgroundColor) {
        window.setTimeout(() => {
          const revertColor = ".box:hover {background-color: chocolate}";
          $(box1).css({
            "background-color": "brown",
            "pointer-events": "auto"
          });
          box1.style.cssText = revertColor;
          $(box2).css({
            "background-color": "brown",
            "pointer-events": "auto"
          });
          box2.style.cssText = revertColor;
        }, 1000);
        wrong.play();
      } else {
        this.winAlert++;
        if (this.winAlert == this.availableColors.length) {
          this.endGame = true;
          //these are all necessery things to do when a game finishes
          timer.stop();
          this.getFinishedTimer();
          success.play();
          $(".afterGame").css({
            "z-index": "100000000000000000"
          });
          $(".afterGameDetailsContainer").css({
            opacity: "1"
          });

          // this.userDetails.clicks = selectedDifficulty == "4 X 4"?
          //COME BACK TO HERRRRRRRRRREEEEEEEEEEEEEEEEEEEEE
          this.fullReport = this.clickCounter + this.timeReport;
          const updatedObject =
            this.selectedDifficulty == "4 X 4"
              ? {
                  clicks: this.userDetails.EasyMode.clicks,
                  finishedTime: this.userDetails.EasyMode.finishedTime,
                  fullReport: this.userDetails.EasyMode.fullReport
                }
              : {
                  clicks: this.userDetails.HardMode.clicks,
                  finishedTime: this.userDetails.HardMode.finishedTime,
                  fullReport: this.userDetails.HardMode.fullReport
                };

          if (updatedObject.fullReport == 0) {
            var ObjectToSend =
              this.selectedDifficulty == "4 X 4"
                ? {
                    EasyMode: {
                      clicks: this.clickCounter,
                      finishedTime: this.timeReport,
                      fullReport: this.clickCounter + this.timeReport,
                      gameDate:
                        new Date().getDate() +
                        "-" +
                        new Date().getMonth() +
                        "-" +
                        new Date().getFullYear()
                    }
                  }
                : {
                    HardMode: {
                      clicks: this.clickCounter,
                      finishedTime: this.timeReport,
                      fullReport: this.clickCounter + this.timeReport,
                      gameDate:
                        new Date().getDate() +
                        "-" +
                        new Date().getMonth() +
                        "-" +
                        new Date().getFullYear()
                    }
                  };
            updateUserData(ObjectToSend, this.userDetails._id).then(
              response => {
                console.log("Report is the first time");
              }
            );
          } else {
            if (this.fullReport < updatedObject.fullReport) {
              var ObjectToSend =
                this.selectedDifficulty == "4 X 4"
                  ? {
                      EasyMode: {
                        clicks: this.clickCounter,
                        finishedTime: this.timeReport,
                        fullReport: this.clickCounter + this.timeReport,
                        gameDate:
                          new Date().getDate() +
                          "-" +
                          (new Date().getMonth() + 1) +
                          "-" +
                          new Date().getFullYear()
                      }
                    }
                  : {
                      HardMode: {
                        clicks: this.clickCounter,
                        finishedTime: this.timeReport,
                        fullReport: this.clickCounter + this.timeReport,
                        gameDate:
                          new Date().getDate() +
                          "-" +
                          new Date().getMonth() +
                          "-" +
                          new Date().getFullYear()
                      }
                    };
              updateUserData(ObjectToSend, this.userDetails._id).then(
                response => {
                  console.log("Report is updated");
                }
              );
            } else {
              console.log("nothing is updated!");
            }
          }

          //these are all the necessery reports to upload to the database
          if ($cookies.get("reviewed") == "true") {
            document.querySelector(".reviewText").innerHTML =
              "Thanks For The Review";
          }
          console.log("you won congratulations");
        } else {
          done.play();
        }
      }
    },

    gameGenerator() {
      /* -- The following code is the core of the game and it does: --
                   
      1- generate a new game every time the page gets loaded or refreshed.
      2- shuffles the array containing the colours to generate different outputs every game.
      3- It works dynamically so that if you choose any perfect 2D MATRIX the algorith
         used here will generate the game and work with it.
      
      --*/
      this.$store.dispatch({
        type: "generateGame"
      });
      this.availableColors = this.$store.getters.getBoxColors;
      let boxTags = document.getElementsByClassName("box");

      window.setTimeout(() => {
        let selectedTag;
        let boxId = [];
        for (let i = 0; i < boxTags.length; i++) {
          boxId.push(boxTags[i].id);
        }

        this.availableColors.forEach((el, i) => {
          for (let i = 0; i < 2; i++) {
            selectedTag = boxId[Math.floor(Math.random() * boxId.length)];
            this.boxColors.push({
              id: selectedTag,
              color: el
            });
            boxId.splice(boxId.indexOf(selectedTag), 1);
          }
        });
      }, 500);
    },
    restartGame() {
      location.assign("./game");
    }
  },
  created() {
    //Database records to update
    getSpecificUserData($cookies.get("userId")).then(response => {
      this.userDetails = response.data.userData;
    });

    getStatDatas().then(response => {
      this.gameStats = response.data.response;
      this.gameStats.gamesPlayed++;

      if (this.selectedDifficulty == "4 X 4") {
        this.gameStats.gamesPlayedEasy++;
        updateStats({
          gamesPlayed: this.gameStats.gamesPlayed,
          gamesPlayedEasy: this.gameStats.gamesPlayedEasy
        });
      } else {
        this.gameStats.gamesPlayedHard++;
        updateStats({
          gamesPlayed: this.gameStats.gamesPlayed,
          gamesPlayedHard: this.gameStats.gamesPlayedHard
        });
      }

      getUserData().then(response => {
        this.gameStats.users = response.data.userData.length;
        updateStats({
          users: this.gameStats.users
        });
      });
    });

    //music Setting ---------------------------------
    if (this.musics == "false") {
    } else {
      backgroundMusic.play();
    }
    //set difficulty function ------------------------
    this.$store.dispatch({
      type: "setDifficulty",
      value: $cookies.get("difficulty")
    });
    // Start the game --------------------------------

    this.startGame = true;
    timer.start();
    this.gameGenerator();
  }
};
