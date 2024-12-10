import HomePage from "../pages/home.jsx";
import LoginPage from "../pages/login.jsx";
import SignupPage from "../pages/signup.jsx";
import AddQRCodePage from "../pages/qrcodes_add.jsx";
import ListQRCodePage from "../pages/qrcodes_list.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/login/",
    component: LoginPage,
  },
  {
    path: "/signup/",
    component: SignupPage,
  },
  {
    path: "/qrcodes/add/",
    component: AddQRCodePage,
  },
  {
    path: "/qrcodes/list/",
    component: ListQRCodePage,
  },
];

export default routes;
