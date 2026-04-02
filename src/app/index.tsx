import { useRouter } from "expo-router";
import { useCallback, useState } from "react";

import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";

type Phase = "splash" | "onboarding";

export default function Index() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("splash");
  const goOnboarding = useCallback(() => setPhase("onboarding"), []);
  const goHome = useCallback(() => {
    router.replace("/tabs");
  }, [router]);

  switch (phase) {
    case "splash":
      return <SplashScreen onFinished={goOnboarding} />;
    case "onboarding":
      return <OnboardingScreen onFinished={goHome} />;
  }
}
