import home from "./components/home.vue";
import gameBody from "./components/game-body.vue";
import leaderboard from "./components/leaderboard.vue";

export const routes = [
  { path: "/", component: home },
  { path: "/game", component: gameBody },
  { path: "/leaderboard", component: leaderboard }
];
