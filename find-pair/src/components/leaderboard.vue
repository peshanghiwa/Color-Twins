<template>
  <div class="con">
    <div class="container">
      <div class="headerContainer">
        <h1 class="headerText" style="margin: 0px 0 50px; padding-top:20px;">
          COLOR TWINS
        </h1>
        <button
          class="btn btn-info back"
          style="position:absolute; top:10px; right: 30px;"
        >
          Main Page
        </button>
      </div>
      <easy-leaderboard style="z-index: 1000;"></easy-leaderboard>
      <hard-leaderboard style="z-index: 1000;"></hard-leaderboard>
      <stats style="z-index: 1000;"></stats>
      <button class="btn backBackup">Go Back To Main Page</button>
    </div>
  </div>
</template>

<script>
import easyLeaderboard from "./leaderboardComponents/easyLeader";
import hardLeaderboard from "./leaderboardComponents/hardLeader";
import stats from "./leaderboardComponents/stats";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    "easy-leaderboard": easyLeaderboard,
    "hard-leaderboard": hardLeaderboard,
    stats
  },
  created() {}
};
</script>

<style scoped>
* {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.con {
  margin: 0;
  padding-bottom: 60px;
  background-color: #252829;
}

.back {
  background-color: #ecf0f1;
  color: #252829;
  outline: none;
  border: none;
  transition: 0.4s ease;
}
.back:hover {
  background-color: #c0392b;
}

.back:focus {
  outline: none;
}

.backBackup {
  background-color: #8e44ad;
  color: white;
  outline: none;
  border: none;
  width: 100%;
  transition: 0.4s ease;
  padding: 13px 0;
}
.backBackup:hover {
  background-color: #2980b9;
  color: white;
}

.backBackup:focus {
  outline: none;
}

@media screen and (max-width: 650px) {
  .back {
    display: none;
  }

  .backBackup {
    display: block;
  }
}

.headerText {
  text-align: center;
  color: white;
}
</style>
