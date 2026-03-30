import Reactotron from "reactotron-react-native";
import { QueryClientManager, reactotronReactQuery } from "reactotron-react-query";

import { queryClient } from "./query-client";

let didConnect = false;

export function setupReactotron(): void {
  if (!__DEV__ || didConnect) return;
  didConnect = true;

  const queryClientManager = new QueryClientManager({ queryClient });

  Reactotron.configure({
    name: "LoApp",
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
    .use(reactotronReactQuery(queryClientManager))
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate|127\.0\.0\.1|localhost/,
      },
    })
    .connect();
}
