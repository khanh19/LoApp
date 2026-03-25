import { Stack } from "expo-router";

import { setupReactotron } from "@/lib/reactotron";

import { QueryProvider } from "./providers/QueryProvider";

setupReactotron();

export default function RootLayout() {
  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}
