<template>
  <div class="tableContainer">
    <br />
    <h1 style="text-align:center; margin-bottom:-20px; color:white;">
      Game Statistics
    </h1>
    <div class="statContainer" style="background-color: #d35400;">
      <h3 class="statName">Users</h3>
      <small>Number Of Users who played the Game.</small>
      <hr />
      <h1 class="statValue">{{ numberOfUsers }}</h1>
    </div>
    <div class="statContainer" style="background-color: #27ae60;">
      <h3 class="statName">Games Played</h3>
      <small>Number of games that has been played.</small>
      <hr />
      <h1 class="statValue">{{ gamesPlayed }}</h1>
      <small>Easy Mode: {{ gamesPlayedEasy }}</small> -
      <small>Hard Mode: {{ gamesPlayedHard }}</small>
    </div>
    <div class="statContainer" style="background-color: #2c3e50;">
      <h3 class="statName">Best Player With Clicks</h3>
      <small>User who finishes the game with the least amount of clicks.</small>
      <hr />
      <h1 class="statValueString">Easy Mode: {{ bestClicksPlayerEasy }}</h1>
      <h1 class="statValueString">Hard Mode: {{ bestClicksPlayerHard }}</h1>
    </div>
    <div class="statContainer" style="background-color: #2980b9;">
      <h3 class="statName">Best Player With Time</h3>
      <small>User who finishes the game at the shortest period of time.</small>
      <hr />
      <h1 class="statValueString">Easy Mode: {{ bestTimePlayerEasy }}</h1>
      <h1 class="statValueString">Hard Mode: {{ bestTimePlayerHard }}</h1>
    </div>

    <div class="statContainer">
      <h3 class="statName">Game Ratings</h3>
      <small>Hope you enjoyed the game!</small>
      <hr />
      <div class="row starsContainer">
        <div class="col-12">
          <div>
            <i
              class="fas fa-star ratingStars"
              v-for="(n, index) in 5"
              :key="index"
            ></i>
            <div id="Progress_Status" style="float:right;">
              <div class="myprogressBar">{{ rateNumber[4] }}</div>
            </div>
          </div>
          <div>
            <i
              class="fas fa-star ratingStars"
              v-for="(n, index) in 4"
              :key="index"
            ></i>
            <div id="Progress_Status" style="float:right;">
              <div class="myprogressBar">{{ rateNumber[3] }}</div>
            </div>
          </div>
          <div>
            <i
              class="fas fa-star ratingStars"
              v-for="(n, index) in 3"
              :key="index"
            ></i>
            <div id="Progress_Status" style="float:right;">
              <div class="myprogressBar">{{ rateNumber[2] }}</div>
            </div>
          </div>
          <div>
            <i
              class="fas fa-star ratingStars"
              v-for="(n, index) in 2"
              :key="index"
            ></i>
            <div id="Progress_Status" style="float:right;">
              <div class="myprogressBar">{{ rateNumber[1] }}</div>
            </div>
          </div>
          <div>
            <i
              class="fas fa-star ratingStars"
              v-for="(n, index) in 1"
              :key="index"
            ></i>
            <div id="Progress_Status" style="float:right;">
              <div class="myprogressBar">{{ rateNumber[0] }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import {
  addUserData,
  getUserData,
  getSoretdUserData,
  getDataCount,
  updateUserData,
  getSpecificUserData,
  updateStats,
  getStatDatas
} from "./../scripts/routes";
export default {
  data() {
    return {
      numberOfUsers: 0,
      gamesPlayed: 0,
      gamesPlayedEasy: 0,
      gamesPlayedHard: 0,
      bestClicksPlayerEasy: "",
      bestTimePlayerEasy: "",
      bestClicksPlayerHard: "",
      bestTimePlayerHard: "",
      rating: [0, 0, 0, 0, 0],
      rateNumber: []
    };
  },
  methods: {
    countDataOragnizer() {
      const progressBars = document.getElementsByClassName("myprogressBar");
      this.progressCalculator();
      // this.rating.forEach((el, i) => {
      //   progressBars[i].style.width = `${this.rating[i]}%`;
      // });
      progressBars[0].style.width = `${this.rating[4]}%`;
      progressBars[1].style.width = `${this.rating[3]}%`;
      progressBars[2].style.width = `${this.rating[2]}%`;
      progressBars[3].style.width = `${this.rating[1]}%`;
      progressBars[4].style.width = `${this.rating[0]}%`;
    },
    progressCalculator() {
      let total = 0;
      this.rating.forEach(el => {
        total += el;
      });
      total = total / this.rating.length;

      this.rating.forEach((el, index) => {
        this.rating[index] = Math.round((this.rating[index] / total) * 10 * 2);
      });
    }
  },
  created() {
    getUserData("").then(response => {
      this.numberOfUsers = response.data.userDataResult.length;
    });
    getStatDatas().then(res => {
      this.gamesPlayed = res.data.response.gamesPlayed;
      this.gamesPlayedEasy = res.data.response.gamesPlayedEasy;
      this.gamesPlayedHard = res.data.response.gamesPlayedHard;
    });
    getSoretdUserData("?sort=EasyMode.clicks").then(response => {
      this.bestClicksPlayerEasy = response.data.userDataResult[0].fullName;
    });
    getSoretdUserData("?sort=EasyMode.finishedTime").then(response => {
      this.bestTimePlayerEasy = response.data.userDataResult[0].fullName;
    });
    getSoretdUserData("?sort=HardMode.clicks").then(response => {
      this.bestClicksPlayerHard = response.data.userDataResult[0].fullName;
    });
    getSoretdUserData("?sort=HardMode.finishedTime").then(response => {
      this.bestTimePlayerHard = response.data.userDataResult[0].fullName;
    });
    getDataCount("?field=rating").then(res => {
      const ratingFields = res.data.count;
      ratingFields.forEach(el => {
        if (el.rating == 5) this.rating[4]++;
        if (el.rating == 4) this.rating[3]++;
        if (el.rating == 3) this.rating[2]++;
        if (el.rating == 2) this.rating[1]++;
        if (el.rating == 1) this.rating[0]++;
      });
      this.rateNumber = [...this.rating];
      this.countDataOragnizer();
    });
  }
};
</script>

<style scoped>
* {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}

.container {
  margin-top: 10px;
}

.statContainer {
  display: block;
  margin: 40px auto;
  padding: 10px 2px;
  text-align: center;
  color: #ebeff3;
  background-color: #c0392b;
  width: 100%;
  border-radius: 8px;
}

.statName {
  font-size: 26px;
  margin: 0;
}

.statValue {
  font-size: 50px;
  margin: 0;
}

.statValueString {
  font-size: 22px;
  margin: 10px;
}

.ratingStars {
  color: #cddbdf;
  margin: 8px 2px 0;
  font-size: 30px;
  transition: all 0.1s ease-in;
}

.starsContainer {
  padding: 5px 30px;
  text-align: left;
}
.progressContainer {
  padding: 10px 2px;
}
#Progress_Status {
  width: 60vw;
  margin: 12px 0 0;
  background-color: #2d3436;
}

.myprogressBar {
  transition: 1s cubic-bezier(0.66, 0.01, 0.39, 0.99);
  width: 0%;
  height: 25px;
  background-color: #cddbdf;
  text-align: center;
  line-height: 25px;
  overflow: hidden;
  color: black;
  font-size: 20px;
}

@media screen and (max-width: 991px) {
  #Progress_Status {
    width: 45vw;
    margin: 10px 0 0;
  }

  .ratingStars {
    margin: 8px 2px 0;
    font-size: 25px;
  }
}

@media screen and (max-width: 767px) {
  #Progress_Status {
    width: 38vw;
    height: 20px;
    margin: 12px 0 0;
  }
  .myprogressBar {
    height: 20px;
    line-height: 20px;
    font-size: 15px;
  }

  .ratingStars {
    margin: 8px 2px 0;
    font-size: 23px;
  }
}

@media screen and (max-width: 450px) {
  #Progress_Status {
    width: 34vw;
    height: 15px;
    margin: 12px 0 0;
  }

  .myprogressBar {
    height: 15px;
    line-height: 15px;
    font-size: 12px;
  }

  .ratingStars {
    margin: 8px 2px 0;
    font-size: 18px;
  }
}
</style>
