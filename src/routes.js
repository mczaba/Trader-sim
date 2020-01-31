import Home from "./components/Home.vue";
import Portfolio from "./components/Portfolio.vue";
import Favorites from "./components/Favorites.vue";
import Search from "./components/Search.vue";
import SignUp from "./components/Signup.vue";
import LogIn from "./components/Login.vue";

export const routes = [
  { path: "/", component: Home },
  { path: "/portfolio", component: Portfolio },
  { path: "/watch-list", component: Favorites },
  { path: "/search", component: Search },
  { path: "/signup", component: SignUp },
  { path: "/login", component: LogIn },
  { path: "*", redirect: "/" }
];
