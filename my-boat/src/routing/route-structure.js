import { VISITOR, LOGGED_IN, ADMIN, USER } from "./auth-types";

export default [
  {
    path: "/",
    pageName: "PageLayout",
    children: [
      {
        path: '',
        pageName: "HomePage",
      },
      {
        path: "login",
        pageName: "LoginPage",
        auth: VISITOR,
      },
      {
        path: "register",
        pageName: "RegisterPage",
        auth: VISITOR,
      },
      {
        path: "checkout",
        pageName: "Checkout",
        auth: LOGGED_IN,
      },
      {
        path: "boats",
        pageName: "BoatGridPage",
        auth: LOGGED_IN
      },
      {
        path: "boats/:id",
        pageName: "SingleBoatPage",
        auth: LOGGED_IN,
      },
      {
        path: "*",
        pageName: "ErrorPage",
      },
      {
        path: "cart",
        pageName: "Cart",
        auth: LOGGED_IN
      },
      {
        path: 'management',
        pageName: 'ManagementPage',
        auth: ADMIN,
      },
      {
        path: 'management/edit/:id',
        pageName: 'ManagementPageBoatForm',
        auth: ADMIN,
      },
      {
        path: 'management/add',
        pageName: 'ManagementPageBoatForm',
        auth: ADMIN,
      },
      {
        path: 'profile',
        pageName: 'ProfilePage',
        auth: LOGGED_IN,
      },
    ],
  },
];

