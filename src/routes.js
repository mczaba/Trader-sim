import Home from "./components/Home.vue";
import Portfolio from "./components/portfolio/Portfolio.vue";
import Favorites from "./components/Favorites/Favorites.vue";
import Search from "./components/search/Search.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/portfolio", component: Portfolio },
  { path: "/favorites", component: Favorites },
  { path: "/search", component: Search },
  { path: "*", redirect: "/" }
];
