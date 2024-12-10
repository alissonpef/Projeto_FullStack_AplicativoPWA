import React from "react";

import { f7, f7ready, App, View } from "framework7-react";

import routes from "../js/routes";

const MyApp = () => {
  // Framework7 Parameters
  const f7params = {
    name: "Biscoitos X", // App name
    theme: "auto", // Automatic theme detection
    colors: {
      primary: "#007aff",
    },

    // App routes
    routes: routes,

    // Register service worker (only on production build)
    serviceWorker:
      process.env.NODE_ENV === "production"
        ? {
            path: "/service-worker.js",
          }
        : {},
  };

  f7ready(() => {
    // Call F7 APIs here
  });

  return (
    <App {...f7params}>
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default MyApp;
