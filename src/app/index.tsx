import { useCallback, useState } from "react";

import HomeScreen from "../screens/HomeScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";

type Phase = "splash" | "onboarding" | "home";

export default function Index() {
  const [phase, setPhase] = useState<Phase>("splash");
  const goOnboarding = useCallback(() => setPhase("onboarding"), []);
  const goHome = useCallback(() => setPhase("home"), []);

  switch (phase) {
    case "splash":
      return <SplashScreen onFinished={goOnboarding} />;
    case "onboarding":
      return <OnboardingScreen onFinished={goHome} />;
    case "home":
      return <HomeScreen />;
  }
}
