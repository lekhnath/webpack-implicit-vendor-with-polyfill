# Webpack implicit vendor bundle with polyfill bundle

This repo is created to demonstrate [answer](https://stackoverflow.com/a/48679069/2071612) provided to this SO [Question](https://stackoverflow.com/q/43716644/2071612).

## \# Available npm commands:

### npm run build
Generates output to build/dist directory

### npm run clean:build
Removes all auto generated contents from build/dist directory

## \# How it works

When you run build command (ie. npm run build) it dynamically creates `vendor bundle` including all imports from `node_modules` in our source files. It also creates `polyfill bundle` by including all module explicitly defined in `src/polyfill.ts` file. And the remaining contents which is essentially the source code we authored is separated in final `main bundle`.
