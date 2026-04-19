import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";

import AuthScreen from "../screens/AuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

type Phase = "splash" | "auth" | "welcome" | "onboarding";

export default function Index() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("splash");
  const goAuth = useCallback(() => setPhase("auth"), []);
  const goWelcome = useCallback(() => setPhase("welcome"), []);
  const goOnboarding = useCallback(() => setPhase("onboarding"), []);
  const goHome = useCallback(() => {
    router.replace("/tabs");
  }, [router]);

  switch (phase) {
    case "splash":
      return <SplashScreen onFinished={goAuth} />;
    case "auth":
      return <AuthScreen onAuthenticated={goWelcome} />;
    case "welcome":
      return <WelcomeScreen onGetStarted={goOnboarding} />;
    case "onboarding":
      return <OnboardingScreen onFinished={goHome} />;
  }
}
