import { Stack } from "expo-router";

import { setupReactotron } from "@/src/lib/reactotron";

import { QueryProvider } from "./providers/QueryProvider";

setupReactotron();

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}
