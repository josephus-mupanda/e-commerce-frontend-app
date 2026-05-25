import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { clearAuth } from "@/store/authSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const TIMEOUT_MS = 15 * 60 * 1000;

export const SessionTimeoutProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogout = useCallback(() => {
    if (!isAuthenticated) return;
    dispatch(clearAuth());
    window.location.assign("/signin");
  }, [dispatch, isAuthenticated]);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (user?.role === "ADMIN") {
      timerRef.current = setTimeout(handleLogout, TIMEOUT_MS);
    }
  }, [handleLogout, user?.role]);

  useEffect(() => {
    if (!isAuthenticated || user?.role !== "ADMIN") return;

    const events = ["mousemove", "keydown", "scroll", "click"];
    resetTimer();
    events.forEach((event) => window.addEventListener(event, resetTimer));

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, resetTimer, user?.role]);

  return <>{children}</>;
};
