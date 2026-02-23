import HomePage from "@/pages/home";
import CosmeticWala from "@/pages/cosmetic-wala";
import CandleWala from "@/pages/candle-wala";
import HankyWala from "@/pages/hanky-wala";
import ResinWala from "@/pages/resin-wala";

export const webRoutes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/cosmetic-wala",
    element: <CosmeticWala />,
  },
  {
    path: "/candle-wala",
    element: <CandleWala />,
  },
  {
    path: "/hanky-wala",
    element: <HankyWala />,
  },
  {
    path: "/resin-wala",
    element: <ResinWala />,
  },
];
