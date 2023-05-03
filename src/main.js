import "./main.css";
import { Router } from "@vaadin/router";
import "./pages/home.page";
import "./pages/leaderboard.page";
import "./pages/game.page";

const outlet = document.querySelector("#outlet");
const router = new Router(outlet);

router.setRoutes([
  { path: "/", component: "home-page" },
  { path: "/game", component: "game-page" },
  { path: "/leaderboard", component: "leaderboard-page" },
  { path: "(.*)", redirect: "/" },
]);
