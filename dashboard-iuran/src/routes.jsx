import {
  HomeIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Notifications, Dataiuran, InputCategories, InputFee } from "@/pages/dashboard";
import AdminRoute from "@/components/AdminRoute";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
      {
        icon: <UserCircleIcon {...icon} />,
        name: "profil",
        path: "/profile",
        element: <Profile />,
      },
      {
        icon: <TableCellsIcon {...icon} />,
        name: "data iuran",
        path: "/data-iuran",
        element: <Dataiuran />,
      },

      {
        icon: <HomeIcon {...icon} />,
        name: "input-kategori",
        path: "/input-categories",
        element: <InputCategories />,
      },
      {
        icon: <HomeIcon {...icon} />,
        name: "input-iuran",
        path: "/input-fee",
        element: <InputFee />,
      },
    ],
  },
  {
    title: "Lainnya",
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "Masuk",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "daftar user",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
