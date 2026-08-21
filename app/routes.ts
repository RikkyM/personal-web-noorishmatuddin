import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/main-layout.tsx", [
    index("routes/home.tsx"),
    // route("profil", "routes/profile.tsx"),
    route("kegiatan", "routes/kegiatan.tsx"),
    route("kegiatan/:slug", "routes/kegiatan.$slug.tsx"),

    route("*", "routes/not-found.tsx"),
  ]),
] satisfies RouteConfig;
