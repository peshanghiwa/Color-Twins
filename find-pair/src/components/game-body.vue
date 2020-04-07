<template>
  <div id="container">
    <div class="row">
      <div class="col"></div>
    </div>
    <!-- <div class="menuContainer"></div> -->

    <canvas id="canvas"></canvas>
    <div class="brandLogo">
      <i class="fas fa-gamepad logo"></i>
      <p class="logoText">PLAY</p>
    </div>

    <div v-if="!startGame">
      <h5>choose game difficulty</h5>
      <select
        class="browser-default custom-select"
        name="gameDifficulty"
        @change="setDifficulty"
        v-model="selectedDifficulty"
      >
        <option
          v-for="(level, index) in difficultyOptions"
          :key="index"
          :value="level"
          >{{ level ? level : "select difficulty" }}</option
        >
      </select>
      <div class="btn btn-info" @click="startGameFunction">Start Game</div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="afterGame">
          <div class="afterGameDetailsContainer">
            <p class="congrats">
              Congratulations dear <b>{{ $cookies.get("userFullName") }}</b
              >, you completed the game in <b>{{ selectedDifficulty }}</b> mode!
            </p>
            <p class="afterGameData">
              Time: <br />
              <b> {{ timeFinishedInMinute }}: {{ timeFinishedInSecond }}</b>
            </p>
            <p class="afterGameData">
              Number of clicks: <br />
              <b> {{ clickCounter }}</b>
            </p>
            <button class="btn btn-success restartButton" @click="restartGame">
              Restart this Game
            </button>
            <button
              class="btn btn-primary checkLeaderboardButton"
              @click="leaderboard"
            >
              Check Leaderboard
            </button>
            <button class="btn btn-primary goBackButton" @click="mainPage">
              Go back to Main Page
            </button>

            <div class="rateTheGameContainer">
              <p class="reviewText">
                Rate the Game:
              </p>
              <i
                class="fas fa-star ratingStars"
                v-for="(item, index) in 5"
                :key="item"
                @mouseleave="starsleft(index)"
                @mouseover="starsHovered(index)"
                @click="starsClicked(item)"
                v-show="!reviewed"
              ></i>
            </div>
          </div>
        </div>
        <div class="timerContianer">
          <p style="float:left; margin-right: 15px" class="timeCounterColon">
            Timer:
          </p>
          <h5 class="timeCounter" style="float:left;" id="timerInMinute">0</h5>
          <p style="float:left" class="timeCounterColon">:</p>
          <h5 class="timeCounter" style="float:left" id="timerInSecond">0</h5>
        </div>
        <div class="clicksContainer">
          <p style="float:left;" class="clicksCounterColon">Clicks:</p>
          <h5 class="timeCounter" style="float:left;" id="timerInMinute">
            {{ clickCounter }}
          </h5>
        </div>
      </div>
    </div>
    <div class="row justify-content-center" v-show="startGame">
      <div class="col-8 game-body">
        <div class="gameContainer">
          <div v-for="n in getNumberOfBoxes" class="fix-lines" :key="n">
            <div v-for="m in getNumberOfBoxes" :key="m">
              <div
                :class="'box ' + boxStyle"
                :id="m + 'and' + n"
                @click="boxClicked(m, n)"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="creator">made with &hearts; by Peshang</p>
  </div>
</template>

<script src="./scripts/game-body-scripts.js"></script>

<style
  src="./styles/game-body-styles.css"
  href="./styles/game-body-styles.css"
  scoped
></style>
