import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";

import AuthLandingScreen from "../screens/AuthLandingScreen";
import AuthScreen from "../screens/AuthScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import SplashScreen from "../screens/SplashScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

type Phase = "splash" | "authLanding" | "auth" | "welcome" | "onboarding";

export default function Index() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("splash");
  const [authInitialMode, setAuthInitialMode] = useState<"signup" | "login">(
    "signup",
  );
  const goAuthLanding = useCallback(() => setPhase("authLanding"), []);
  const goWelcome = useCallback(() => setPhase("welcome"), []);
  const goOnboarding = useCallback(() => setPhase("onboarding"), []);
  const goHome = useCallback(() => {
    router.replace("/tabs");
  }, [router]);

  switch (phase) {
    case "splash":
      return <SplashScreen onFinished={goAuthLanding} />;
    case "authLanding":
      return (
        <AuthLandingScreen
          onLogIn={() => {
            setAuthInitialMode("login");
            setPhase("auth");
          }}
          onSignUp={() => {
            setAuthInitialMode("signup");
            setPhase("auth");
          }}
        />
      );
    case "auth":
      return (
        <AuthScreen
          key={authInitialMode}
          initialMode={authInitialMode}
          onAuthenticated={goWelcome}
          onOAuthDismiss={goAuthLanding}
          onBackToEntry={goAuthLanding}
        />
      );
    case "welcome":
      return <WelcomeScreen onGetStarted={goOnboarding} />;
    case "onboarding":
      return <OnboardingScreen onFinished={goHome} />;
  }
}
