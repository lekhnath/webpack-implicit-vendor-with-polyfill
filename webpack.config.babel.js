import webpack from "webpack";
import path from 'path';

const baseDir = process.cwd();
const srcDir = path.join(baseDir, 'src');
const distDir = path.join(baseDir, 'build/dist');
const tsconfigPath = path.join(baseDir, 'tsconfig.json');

export default (env) => {
  return {
    context: srcDir,
    entry: {
      'polyfill': 'polyfill.ts',
      'main': 'main.ts',
    },
    output: {
      filename: "[name].bundle.js",
      chunkFilename: "[id].chunk.js",
      path: distDir,
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: ["src", "node_modules"],
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: srcDir,
          use: [
            {
              loader: "awesome-typescript-loader",
              options: {
                configFileName: tsconfigPath,
                useWebpackText: true,
                useTranspileModule: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.NoEmitOnErrorsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.ContextReplacementPlugin(
        /angular(\\|\/)core(\\|\/)@angular/,
        srcDir
      ),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        chunks: ["main"],
        minChunks: function(module) {
          const check =
            module.context && module.context.indexOf("node_modules") !== -1;
          module.originalChunkNames = module.chunks.map(chunk => chunk.name);
          return check;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "polyfill",
        chunks: ["vendor"],
        minChunks: function({ originalChunkNames }) {
          return originalChunkNames.includes("polyfill");
        }
      }),
    ]
  }
}
