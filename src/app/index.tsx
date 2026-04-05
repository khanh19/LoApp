import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";

import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

type Phase = "splash" | "welcome" | "onboarding";

export default function Index() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("splash");
  const goWelcome = useCallback(() => setPhase("welcome"), []);
  const goOnboarding = useCallback(() => setPhase("onboarding"), []);
  const goHome = useCallback(() => {
    router.replace("/tabs");
  }, [router]);

  switch (phase) {
    case "splash":
      return <SplashScreen onFinished={goWelcome} />;
    case "welcome":
      return <WelcomeScreen onGetStarted={goOnboarding} />;
    case "onboarding":
      return <OnboardingScreen onFinished={goHome} />;
  }
}
