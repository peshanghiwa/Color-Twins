<template>
  <div id="container">
    <div class="menuIconContainer" @click="goToLeaderboard" id="menuContainer">
      <div id="menuIcon"></div>
    </div>

    <div class="menuContainer"></div>

    <canvas id="canvas"></canvas>
    <div class="brandLogo">
      <i class="fas fa-gamepad logo"></i>
      <p class="logoText">PLAY</p>
    </div>

    <div id="lottie"></div>
    <div class="quoteContainer">
      <p class="quote">
        There's a reason we dont't see the world in black and white
        <br />
        <small>&quot;Henri Matisse&quot;</small>
      </p>
    </div>

    <form class="form">
      <div class="textBoxContainer">
        <div class="nameTextBoxText">Your Name</div>
        <input
          :placeholder="errMessage || userExistsName || 'Full Name here...'"
          v-on:input="handleInput"
          class="nameTextbox"
          :disabled="userExists"
          type="text"
          v-model="fullName"
          id="textBox"
        />
      </div>

      <div class="playButtonContainer">
        <button
          class="GameButtons"
          id="playGameButton"
          @click.prevent="startGame"
        >
          Start Game
        </button>

        <button
          class="GameButtons"
          id="playMusicButton"
          @click.prevent="playMusic"
        >
          Music
        </button>
        <button
          class="GameButtons"
          id="leaderBoardButton"
          @click.prevent="goToLeaderboard"
        >
          Leaderboard
        </button>

        <select
          style="z-index:1000;"
          class="browser-default selectDifficultyOptions"
          name="gameDifficulty"
          @change="setDifficulty"
          v-model="selectedDifficulty"
        >
          <option
            v-for="(level, index) in difficultyOptions"
            :key="index"
            :value="level"
            >{{ level == "4 X 4" ? "Easy" : "Hard" }}</option
          >
        </select>
      </div>
      <br />
    </form>

    <p class="creator">made with &hearts; by Peshang</p>
  </div>
</template>
<script>
import { getData, addData } from "./../userDatabase.js";
import lottie from "lottie-web";
import Granim from "granim";
import axios from "axios";

window.setTimeout(() => {
  var animation = lottie.loadAnimation({
    container: document.getElementById("lottie"),
    path: "./src/details/SVG/data.json",
    renderer: "svg",
    loop: false,
    autoplay: true,
    name: "Hello World"
  });

  var menuAnimation = lottie.loadAnimation({
    container: document.getElementById("menuIcon"),
    path: "./src/details/SVG/menuIcon/data.json",
    renderer: "svg",
    loop: false,
    autoplay: false,
    name: "Hello World"
  });

  const menuIcon = document.getElementById("menuContainer");
  menuIcon.addEventListener("mouseenter", () => {
    menuAnimation.play();
  });

  menuIcon.addEventListener("mouseleave", () => {
    menuAnimation.stop();
  });

  var granimInstance = new Granim({
    element: "#canvas",
    direction: "left-right",
    isPausedWhenNotInView: true,
    states: {
      "default-state": {
        gradients: [
          ["#c8d6e5", "#c8d6e5"],
          ["#ff9f43", "#feca57"],
          ["#1dd1a1", "#48dbfb"],
          ["#833471", "#D980FA"],
          ["#ff7675", "#e17055"],
          ["#fd79a8", "#74b9ff"]
        ]
      }
    }
  });
}, 100);

export default {
  data() {
    return {
      fullName: undefined,
      errMessage: "",
      difficultyOptions: ["4 X 4", "6 X 6"],
      selectedDifficulty: "4 X 4",
      music: "true",
      userExists: false,
      userExistsName: ""
    };
  },
  methods: {
    goToLeaderboard() {
      location.assign("/leaderboard");
    },
    async addData(dataObject) {
      try {
        const res = await axios.post("/api/data/addData", dataObject);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    playMusic() {
      if (this.music == "true") {
        this.music = "false";
        document.getElementById("playMusicButton").style.backgroundColor =
          "#c0392b";
      } else {
        this.music = "true";
        document.getElementById("playMusicButton").style.backgroundColor =
          "#00745c";
      }
      console.log(this.music);
    },
    setDifficulty() {
      $cookies.set("difficulty", this.selectedDifficulty);
      console.log(this.selectedDifficulty);
    },
    startGame() {
      if (this.userExists) {
        $cookies.set("musicAllow", this.music);
        location.assign("/game");
      } else {
        addData({
          fullName: this.fullName,
          EasyMode: {
            clicks: 0,
            finishedTime: 0,
            fullReport: 0
          },
          HardMode: {
            clicks: 0,
            finishedTime: 0,
            fullReport: 0
          },
          rating: undefined
        })
          .then(res => {
            if (this.fullName == undefined || this.fullName == "") {
              this.errMessage =
                "Your name is Required to have your result saved!";
              document.getElementById("textBox").style.backgroundColor =
                "#c0392b";
            } else {
              $cookies.set("userId", res.data.response._id);
              $cookies.set("userFullName", this.fullName);
              $cookies.set("musicAllow", this.music);
              location.assign("/game");
              // timer.start();
            }
          })
          .catch(err => {
            this.errMessage = `${err.message}`;
          });
      }
    },
    handleInput() {
      this.errMessage = "";
    }
  },
  created() {
    if ($cookies.get("userId")) {
      this.userExists = true;
      this.userExistsName =
        "you're logged in as " + $cookies.get("userFullName");
    } else {
      this.userExists = false;
    }
    $cookies.set("musicAllow", "true");
    $cookies.set("difficulty", "4 X 4");
  }
};
</script>
<style src="./styles/homeStyles.css" scoped></style>
