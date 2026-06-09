import {
  Home,
  AboutMe,
  PersonalProjects,
  Contact,
} from "../components/layouts/views";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/about",
    element: <AboutMe />,
  },
  {
    path: "/projects",
    element: <PersonalProjects />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
];

export default routes;
