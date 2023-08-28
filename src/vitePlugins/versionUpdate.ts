/**
 * Creates a version.json with the dist folder with the current git commit hash as its version
 * number.
 *
 * The React app will check for this file on some interval, and if the running app's version
 * is different than this version, it will force a reload of the app to get the latest version.
 */
import fs from "node:fs";
import path from "node:path";

export default () => {
  let config: any;

  return {
    name: "version-update",
    apply: "build",

    configResolved(resolvedConfig: any) {
      config = resolvedConfig;
    },

    buildStart() {
      const versionFilePath = config.publicDir + path.sep + "version.json";
      // get application version from import.meta.env.VITE_APP_VERSION
      const appVersion = JSON.stringify({ version: config.env.VITE_APP_VERSION });

      // write current version into the version.json file
      fs.writeFile(versionFilePath, appVersion, err => {
        // Log the error, so it is visible in the CI Build Output
        // eslint-disable-next-line
        console.error(err)
      });
    }
  };
};
