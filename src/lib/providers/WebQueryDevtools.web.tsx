import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function WebQueryDevtools() {
  if (!__DEV__) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        right: 16,
        zIndex: 999_999,
      }}
    >
      <ReactQueryDevtools
        buttonPosition="relative"
        position="bottom"
        initialIsOpen={false}
      />
    </div>
  );
}
