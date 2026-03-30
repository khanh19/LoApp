module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@/screens": "./src/screens",
            "@/components": "./src/components",
            "@/lib": "./src/lib",
            "@/data": "./src/data",
            "@/constants": "./src/constants",
            "@/theme": "./src/theme",
            "@": "./",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
      [
        "@tamagui/babel-plugin",
        {
          components: ["tamagui"],
          config: "./src/theme.ts",
          disableExtraction: process.env.NODE_ENV === "development",
        },
      ],
      "react-native-reanimated/plugin",
    ],
  };
};
