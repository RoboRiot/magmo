import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import firebase from "./Firebase";
import { useAuth } from "./AuthUserContext";

const LIGHT_THEME = "light";
const DARK_THEME = "dark";
const SYSTEM_THEME = "system";
const THEME_COLLECTION = "UserPreferences";
const THEME_CACHE_PREFIX = "magmo-theme:";

const ThemeContext = createContext({
  theme: LIGHT_THEME,
  preference: SYSTEM_THEME,
  savingTheme: false,
  themeError: "",
  setTheme: async () => {},
  toggleTheme: async () => {},
});

function isTheme(value) {
  return value === LIGHT_THEME || value === DARK_THEME;
}

function getCachedTheme(uid) {
  if (typeof window === "undefined" || !uid) return null;
  try {
    const cachedTheme = window.localStorage.getItem(`${THEME_CACHE_PREFIX}${uid}`);
    return isTheme(cachedTheme) ? cachedTheme : null;
  } catch (error) {
    return null;
  }
}

function cacheTheme(uid, theme) {
  if (typeof window === "undefined" || !uid) return;
  try {
    if (isTheme(theme)) {
      window.localStorage.setItem(`${THEME_CACHE_PREFIX}${uid}`, theme);
    } else {
      window.localStorage.removeItem(`${THEME_CACHE_PREFIX}${uid}`);
    }
  } catch (error) {
    // A blocked local cache should not prevent the account preference from saving.
  }
}

export function ThemeProvider({ children }) {
  const { authUser, loading: authLoading } = useAuth();
  const [systemTheme, setSystemTheme] = useState(LIGHT_THEME);
  const [preference, setPreference] = useState(SYSTEM_THEME);
  const [savingTheme, setSavingTheme] = useState(false);
  const [themeError, setThemeError] = useState("");
  const saveSequence = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      setSystemTheme(LIGHT_THEME);
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const updateSystemTheme = (event) => {
      setSystemTheme(event.matches ? DARK_THEME : LIGHT_THEME);
    };

    updateSystemTheme(mediaQuery);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", updateSystemTheme);
      return () => mediaQuery.removeEventListener("change", updateSystemTheme);
    }

    mediaQuery.addListener(updateSystemTheme);
    return () => mediaQuery.removeListener(updateSystemTheme);
  }, []);

  useEffect(() => {
    if (authLoading) return undefined;

    const uid = authUser?.uid;
    setThemeError("");
    setSavingTheme(false);

    if (!uid) {
      setPreference(SYSTEM_THEME);
      return undefined;
    }

    const cachedTheme = getCachedTheme(uid);
    setPreference(cachedTheme || SYSTEM_THEME);

    const preferenceRef = firebase
      .firestore()
      .collection(THEME_COLLECTION)
      .doc(uid);

    return preferenceRef.onSnapshot(
      (snapshot) => {
        const savedTheme = snapshot.exists ? snapshot.data()?.theme : null;
        if (isTheme(savedTheme)) {
          setPreference(savedTheme);
          cacheTheme(uid, savedTheme);
        } else {
          setPreference(cachedTheme || SYSTEM_THEME);
        }
      },
      (error) => {
        console.warn("Unable to load the Magmo theme preference:", error);
        setThemeError(
          "Your saved theme could not be loaded. This device will keep using its local setting."
        );
      }
    );
  }, [authLoading, authUser?.uid]);

  const theme = preference === SYSTEM_THEME ? systemTheme : preference;

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-bs-theme", theme);
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const setTheme = useCallback(
    async (nextTheme) => {
      if (!isTheme(nextTheme)) return;

      const uid = authUser?.uid;
      const previousPreference = preference;
      const sequence = saveSequence.current + 1;
      saveSequence.current = sequence;

      setPreference(nextTheme);
      setThemeError("");
      cacheTheme(uid, nextTheme);

      if (!uid) return;

      setSavingTheme(true);
      try {
        await firebase
          .firestore()
          .collection(THEME_COLLECTION)
          .doc(uid)
          .set(
            {
              theme: nextTheme,
              updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            },
            { merge: true }
          );
      } catch (error) {
        console.error("Unable to save the Magmo theme preference:", error);
        if (saveSequence.current === sequence) {
          setPreference(previousPreference);
          cacheTheme(uid, previousPreference);
          setThemeError(
            "The theme could not be saved to your account. Please try again."
          );
        }
      } finally {
        if (saveSequence.current === sequence) setSavingTheme(false);
      }
    },
    [authUser?.uid, preference]
  );

  const toggleTheme = useCallback(() => {
    return setTheme(theme === DARK_THEME ? LIGHT_THEME : DARK_THEME);
  }, [setTheme, theme]);

  const value = useMemo(
    () => ({
      theme,
      preference,
      savingTheme,
      themeError,
      setTheme,
      toggleTheme,
    }),
    [preference, savingTheme, setTheme, theme, themeError, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
