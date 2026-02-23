import { authRoutes } from "./authRoutes.tsx";
import { webRoutes } from "./web.tsx";

const appRoutes = [...webRoutes, ...authRoutes];

export default appRoutes;
