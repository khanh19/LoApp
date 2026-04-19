import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as SystemUI from "expo-system-ui";
import React, { useCallback, useLayoutEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { type SocialProvider, useSocialLogin } from "../lib/auth/socialLogin";

const FG = "#111827";
const LINK = "#017AFF";
const SUBTITLE = "#656565";
const INPUT_BG = "rgba(211,211,211,0.3)";
const PLACEHOLDER = "#59595C";
const TERTIARY = "#7E7E82";
const REMEMBER = "#7f7f7f";
const BORDER = "#d9d9d9";

export interface AuthScreenProps {
  initialMode?: "signup" | "login";
  onAuthenticated: () => void;
}

export default function AuthScreen({
  initialMode = "signup",
  onAuthenticated,
}: AuthScreenProps) {
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberPassword, setRememberPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const { authenticate, isPending, error: hookError, reset } =
    useSocialLogin();

  const isSignup = mode === "signup";

  const displayError =
    localError ??
    (hookError instanceof Error ? hookError.message : null) ??
    (hookError ? String(hookError) : null);

  const handleAuth = useCallback(
    async (provider?: SocialProvider) => {
      setLocalError(null);
      reset();
      try {
        const token = await authenticate(provider);
        if (token) onAuthenticated();
      } catch (e) {
        setLocalError(
          e instanceof Error ? e.message : "Something went wrong",
        );
      }
    },
    [authenticate, onAuthenticated, reset],
  );

  useLayoutEffect(() => {
    void SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top", "left", "right", "bottom"]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {isSignup ? (
          <View style={styles.backSpacer} />
        ) : (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => setMode("signup")}
            hitSlop={12}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={28} color={FG} />
          </Pressable>
        )}

        <View style={styles.logoWrap}>
          <Image
            source={require("@/assets/images/app-icon.png")}
            style={styles.logo}
            contentFit="contain"
          />
        </View>

        <View style={styles.mainCol}>
          <View style={styles.innerCol}>
            <View style={styles.headerBlock}>
              <Text style={styles.title}>
                {isSignup ? "Sign up" : "Log in"}
              </Text>
              <Text style={styles.subtitle}>
                {isSignup
                  ? "Sign up to explore more hidden gems in your area."
                  : "Log in to explore more hidden gems in your area."}
              </Text>
            </View>

            <View style={styles.formCol}>
              <TextInput
                style={styles.input}
                placeholder="example@gmail.com"
                placeholderTextColor={PLACEHOLDER}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                textContentType="emailAddress"
              />

              {!isSignup && (
                <>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={PLACEHOLDER}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    textContentType="password"
                  />
                  <View style={styles.optionsRow}>
                    <Pressable
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: rememberPassword }}
                      onPress={() => setRememberPassword((v) => !v)}
                      style={styles.rememberRow}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={rememberPassword ? "checkbox" : "square-outline"}
                        size={18}
                        color={rememberPassword ? FG : "#d9d9d9"}
                      />
                      <Text style={styles.rememberText}>Remember password</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => void handleAuth()}
                      hitSlop={8}
                      disabled={isPending}
                    >
                      <Text style={styles.linkSmall}>Forgot password?</Text>
                    </Pressable>
                  </View>
                </>
              )}

              {displayError ? (
                <Text style={styles.errorBanner}>{displayError}</Text>
              ) : null}

              <Pressable
                onPress={() => void handleAuth()}
                disabled={isPending}
              >
                <View
                  style={[styles.primaryBtn, isPending && styles.btnDisabled]}
                >
                  <Text style={styles.primaryBtnText}>
                    {isPending ? "…" : isSignup ? "Continue with email" : "Sign in"}
                  </Text>
                </View>
              </Pressable>
            </View>

            <View style={styles.altSection}>
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerLabel}>
                  {isSignup ? "or sign up with" : "or sign in with"}
                </Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialCol}>
                <Pressable
                  onPress={() => void handleAuth("apple")}
                  disabled={isPending}
                >
                  <View
                    style={[
                      styles.socialBtn,
                      isPending && styles.btnDisabled,
                    ]}
                  >
                    <Ionicons name="logo-apple" size={18} color="#000" />
                    <Text style={styles.socialLabel}>Continue with Apple</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => void handleAuth("google")}
                  disabled={isPending}
                >
                  <View
                    style={[
                      styles.socialBtn,
                      isPending && styles.btnDisabled,
                    ]}
                  >
                    <Ionicons name="logo-google" size={18} color="#EA4335" />
                    <Text style={styles.socialLabel}>Continue with Google</Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => void handleAuth("facebook")}
                  disabled={isPending}
                >
                  <View
                    style={[
                      styles.socialBtn,
                      isPending && styles.btnDisabled,
                    ]}
                  >
                    <Ionicons name="logo-facebook" size={18} color="#1877F2" />
                    <Text style={styles.socialLabel}>
                      Continue with Facebook
                    </Text>
                  </View>
                </Pressable>
              </View>
            </View>
          </View>

          <Pressable
            onPress={() => setMode(isSignup ? "login" : "signup")}
            style={styles.footer}
          >
            {isSignup ? (
              <Text style={styles.footerText}>
                <Text style={styles.footerPlain}>Already have an account?</Text>
                <Text style={styles.footerLink}> Log in</Text>
              </Text>
            ) : (
              <Text style={styles.footerText}>
                <Text style={styles.footerPlain}>
                  {"Don't have an account?"}
                </Text>
                <Text style={styles.footerLink}> Sign up</Text>
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
    flexGrow: 1,
  },
  backSpacer: {
    height: 28,
    marginBottom: 20,
  },
  backBtn: {
    width: 28,
    height: 28,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "flex-start",
  },
  logoWrap: {
    width: 88,
    height: 65,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 37,
  },
  logo: {
    width: "100%",
    height: "100%",
  },
  mainCol: {
    gap: 16,
    flex: 1,
  },
  innerCol: {
    width: "100%",
  },
  headerBlock: {
    gap: 21,
    marginBottom: 0,
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    color: "#000",
    lineHeight: 38,
    letterSpacing: -0.45,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "400",
    color: SUBTITLE,
    lineHeight: 20,
    letterSpacing: -0.23,
  },
  formCol: {
    gap: 16,
    width: "100%",
    marginTop: 26,
  },
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.23,
    color: "#000",
  },
  optionsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  rememberText: {
    fontSize: 13,
    fontWeight: "600",
    color: REMEMBER,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  linkSmall: {
    fontSize: 13,
    fontWeight: "600",
    color: LINK,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  primaryBtn: {
    backgroundColor: FG,
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnDisabled: {
    opacity: 0.5,
  },
  errorBanner: {
    fontSize: 13,
    color: "#dc2626",
    lineHeight: 18,
    textAlign: "center",
  },
  primaryBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 22,
    letterSpacing: -0.43,
  },
  altSection: {
    gap: 26,
    marginTop: 26,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14.672,
    paddingHorizontal: 5.24,
    marginTop: 0,
  },
  dividerLine: {
    flex: 1,
    borderTopWidth: 1,
    borderColor: BORDER,
  },
  dividerLabel: {
    fontSize: 13.624,
    fontWeight: "600",
    color: TERTIARY,
    lineHeight: 18.864,
    letterSpacing: -0.0838,
  },
  socialCol: {
    gap: 15,
    width: "100%",
  },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6.288,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 52.4,
    paddingVertical: 10.48,
    paddingHorizontal: 16,
  },
  socialLabel: {
    fontSize: 17.816,
    fontWeight: "600",
    color: FG,
    lineHeight: 23.056,
    letterSpacing: -0.4506,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
    paddingVertical: 8,
  },
  footerText: {
    textAlign: "center",
  },
  footerPlain: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
    lineHeight: 18,
    letterSpacing: -0.08,
  },
  footerLink: {
    fontSize: 13,
    fontWeight: "600",
    color: LINK,
    lineHeight: 18,
    letterSpacing: -0.08,
  },
});
