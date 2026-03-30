import { SplashScreen, Stack } from "expo-router";
import { TamaguiProvider } from "tamagui";

import { setupReactotron } from "../lib/reactotron";
import tamaguiConfig from "../tamagui.config";

import { QueryProvider } from "../lib/providers/QueryProvider";

setupReactotron();

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <QueryProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </QueryProvider>
    </TamaguiProvider>
  );
}
