const path = require("path");
const { getLoader, loaderByName } = require("craco");

const packages = [];
/**
 * add the typescript workspaces this project is dependent up on
 */
packages.push(path.join(__dirname, "../../libs/core"));

module.exports = {
  webpack: {
    configure: (webpackConfig,  { env, paths }) => {
      /**
       * Overriding the output directory of build to fit with default configuration of .NET wrapper
       */
      paths.appBuild = webpackConfig.output.path = path.resolve('../../../build');
      const { isFound, match } = getLoader(webpackConfig, loaderByName("babel-loader"));
      if (isFound) {
        const include = Array.isArray(match.loader.include)
          ? match.loader.include
          : [match.loader.include];

        match.loader.include = include.concat(packages);
      }
      return webpackConfig;
    },
  },
};