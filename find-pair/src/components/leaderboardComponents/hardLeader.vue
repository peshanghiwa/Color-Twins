<template>
  <div class="tableContainer">
    <h1 class="tableNames" style="text-align:center; color:white;">
      Leaderboard in Hard Mode
    </h1>
    <table class="table table-hover table-light .table-responsive tableSetting">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Time</th>
          <th scope="col">Clicks</th>
          <th scope="col">Total Points</th>
          <th scope="col">Date Played</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in userData" :key="index">
          <th scope="row">{{ index + 1 }}</th>
          <td>{{ item.fullName }}</td>
          <td>{{ item.HardMode.finishedTime }}</td>
          <td>{{ item.HardMode.clicks }}</td>
          <td>{{ item.HardMode.fullReport }}</td>
          <td>{{ item.HardMode.gameDate }}</td>
        </tr>
      </tbody>
    </table>
    <button
      class="btn btn-success back"
      style="display:block; margin:10px auto 40px;"
      @click="showMoreResult"
      v-if="showBtn"
    >
      Load More Users
    </button>
  </div>
</template>

<script>
import {
  addUserData,
  getUserData,
  getSoretdUserData,
  updateUserData,
  getSpecificUserData,
  updateStats,
  getStatDatas
} from "./../scripts/routes";
export default {
  data() {
    return {
      userData: undefined,
      dataLimit: 5,
      userDataLength: 0,
      showBtn: true
    };
  },
  methods: {
    getData(limit) {
      getSoretdUserData(
        `?sort=HardMode.fullReport,clicks,finishedTime${limit}&mode=hard`
      ).then(response => {
        this.userData = response.data.userDataResult;
        console.log(this.userDataLength);
        console.log(this.userData.length);
        if (this.userDataLength == this.userData.length) {
          this.showBtn = false;
        }
      });
    },
    showMoreResult() {
      if (this.userDataLength - this.userData.length > 5) {
        this.dataLimit += 5;
        this.getData(`&limit=${this.dataLimit}`);
        return true;
      } else {
        this.dataLimit += this.userDataLength - this.userData.length;
        this.getData(`&limit=${this.dataLimit}`);
      }
    }
  },
  created() {
    this.getData(`&limit=${this.dataLimit}`);
    getUserData("?mode=hard").then(response => {
      this.userDataLength = response.data.userDataResult.length;
    });
  }
};
</script>

<style scoped>
* {
  font-family: "Raleway", sans-serif;
  font-weight: 400;
}
.back {
  background-color: #16a085;
  color: white;
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
.container {
  margin-top: 10px;
}

@media screen and (max-width: 800px) {
  .tableSetting {
    font-size: 13px;
  }
}

@media screen and (max-width: 600px) {
  .tableSetting {
    font-size: 11px;
  }
}

@media screen and (max-width: 450px) {
  .tableSetting {
    font-size: 10px;
  }
}
</style>
