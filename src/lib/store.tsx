"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import type {
  CategoryId,
  LanguageCode,
  ReceiptStatus,
  UserPreference,
  WalletReward,
  WalletStampCard,
} from "@/lib/types";
import {
  couponById,
  defaultUser,
  initialSavedOfferIds,
  initialWalletRewards,
  notifications as seedNotifications,
} from "@/lib/data";

/**
 * Prototype state.
 *
 * Everything a real product would keep server-side lives here instead: saved
 * offers, followed brands, read notifications and preferences. It is an
 * external store read through `useSyncExternalStore`, which is what lets the
 * server render the demo's default account while the browser restores whatever
 * the visitor did last — without a hydration mismatch and without a
 * state-setting effect.
 *
 * Persisted under one versioned key; bump the version to reset the demo.
 */

const STORAGE_KEY = "perks.state.v3";

export interface DemoReceiptSubmission {
  id: string;
  couponIds: string[];
  submittedAt: string;
  status: ReceiptStatus;
}

export interface PersistedState {
  savedOfferIds: string[];
  savedCouponIds: string[];
  savedGiftCardIds: string[];
  selectedCouponIds: string[];
  receiptSubmissions: DemoReceiptSubmission[];
  walletRewards: WalletReward[];
  stampCards: WalletStampCard[];
  followedBrandIds: string[];
  readNotificationIds: string[];
  preferences: UserPreference;
}

export type Toast = {
  id: number;
  message: string;
  detail?: string;
  tone: "saved" | "removed" | "info";
};

const serverState: PersistedState = {
  savedOfferIds: initialSavedOfferIds,
  savedCouponIds: ["c-galaxy-cashback"],
  savedGiftCardIds: [],
  selectedCouponIds: [],
  receiptSubmissions: [],
  walletRewards: initialWalletRewards,
  stampCards: [
    { campaignId: "stamp-coffee-club", progress: 3, joinedAt: "2026-08-14T10:00:00.000Z" },
    { campaignId: "stamp-fresh-bowl", progress: 1, joinedAt: "2026-09-01T12:00:00.000Z" },
    { campaignId: "stamp-glow-beauty", progress: 6, joinedAt: "2026-07-18T10:00:00.000Z" },
  ],
  followedBrandIds: defaultUser.brands,
  readNotificationIds: seedNotifications.filter((n) => n.read).map((n) => n.id),
  preferences: defaultUser,
};

/* -------------------------------------------------------------- internals */

let state: PersistedState = serverState;
let toasts: Toast[] = [];
let restored = false;
let toastSeq = 0;

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function readStorage(): PersistedState | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!Array.isArray(parsed.savedOfferIds)) return null;
    return {
      savedOfferIds: parsed.savedOfferIds,
      savedCouponIds: parsed.savedCouponIds ?? serverState.savedCouponIds,
      savedGiftCardIds: parsed.savedGiftCardIds ?? [],
      selectedCouponIds: parsed.selectedCouponIds ?? [],
      receiptSubmissions: parsed.receiptSubmissions ?? [],
      walletRewards: parsed.walletRewards ?? serverState.walletRewards,
      stampCards: parsed.stampCards ?? serverState.stampCards,
      followedBrandIds: parsed.followedBrandIds ?? serverState.followedBrandIds,
      readNotificationIds: parsed.readNotificationIds ?? serverState.readNotificationIds,
      preferences: {
        ...defaultUser,
        ...(parsed.preferences ?? {}),
        notifications: {
          ...defaultUser.notifications,
          ...(parsed.preferences?.notifications ?? {}),
        },
      },
    };
  } catch {
    return null;
  }
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — the session still works, it just won't survive a reload */
  }
}

/**
 * Restores once, lazily, on the first client read. React calls
 * `getServerSnapshot` during hydration and only then switches to this, so the
 * markup React hydrates always matches what the server produced.
 */
function getSnapshot(): PersistedState {
  if (!restored) {
    restored = true;
    const stored = readStorage();
    if (stored) state = stored;
  }
  return state;
}

function getServerSnapshot(): PersistedState {
  return serverState;
}

function getToasts(): Toast[] {
  return toasts;
}

const NO_TOASTS: Toast[] = [];
function getServerToasts(): Toast[] {
  return NO_TOASTS;
}

function update(next: PersistedState) {
  state = next;
  persist();
  emit();
}

function pushToast(message: string, tone: Toast["tone"], detail?: string) {
  const id = ++toastSeq;
  toasts = [...toasts.slice(-2), { id, message, detail, tone }];
  emit();
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  }, 3600);
}

function toggleIn<T>(list: T[], item: T): T[] {
  return list.includes(item) ? list.filter((x) => x !== item) : [...list, item];
}

/* ----------------------------------------------------------------- actions */

const actions = {
  toggleSave(offerId: string, title: string) {
    const has = state.savedOfferIds.includes(offerId);
    update({
      ...state,
      savedOfferIds: has
        ? state.savedOfferIds.filter((id) => id !== offerId)
        : [offerId, ...state.savedOfferIds],
    });
    pushToast(
      has ? "Removed from your Wallet" : "Saved to your Wallet",
      has ? "removed" : "saved",
      title,
    );
  },

  toggleSaveCoupon(couponId: string, title: string) {
    const has = state.savedCouponIds.includes(couponId);
    update({
      ...state,
      savedCouponIds: has
        ? state.savedCouponIds.filter((id) => id !== couponId)
        : [couponId, ...state.savedCouponIds],
    });
    pushToast(
      has ? "Removed from Saved" : "Saved for later",
      has ? "removed" : "saved",
      has ? title : `${title}. Saving is optional and does not register a claim.`,
    );
  },

  toggleSaveGiftCard(giftCardId: string, title: string) {
    const has = state.savedGiftCardIds.includes(giftCardId);
    update({
      ...state,
      savedGiftCardIds: has
        ? state.savedGiftCardIds.filter((id) => id !== giftCardId)
        : [giftCardId, ...state.savedGiftCardIds],
    });
    pushToast(
      has ? "Removed from Saved" : "Gift card saved",
      has ? "removed" : "saved",
      has ? title : `${title}. Saved for later, not purchased.`,
    );
  },

  joinStampCampaign(campaignId: string, title: string) {
    if (state.stampCards.some((card) => card.campaignId === campaignId)) return;
    update({
      ...state,
      stampCards: [{ campaignId, progress: 0, joinedAt: new Date().toISOString() }, ...state.stampCards],
    });
    pushToast("Stamp card added to your Wallet", "saved", title);
  },

  addCampaignStamp(campaignId: string, target: number, title: string, method: "receipt" | "code" = "receipt") {
    const existing = state.stampCards.find((card) => card.campaignId === campaignId);
    const lastValidation = { method, at: new Date().toISOString() };
    const nextCard: WalletStampCard = existing
      ? { ...existing, progress: Math.min(target, existing.progress + 1), lastValidation }
      : { campaignId, progress: 1, joinedAt: new Date().toISOString(), lastValidation };
    update({
      ...state,
      stampCards: existing
        ? state.stampCards.map((card) => card.campaignId === campaignId ? nextCard : card)
        : [nextCard, ...state.stampCards],
    });
    pushToast(existing?.progress === target - 1 ? "Reward unlocked" : "Stamp added successfully", "saved", title);
  },

  toggleCouponSelection(couponId: string, title: string) {
    const has = state.selectedCouponIds.includes(couponId);
    if (!has && state.selectedCouponIds.length >= 10) {
      pushToast("Selection limit reached", "info", "Up to 10 coupons can be linked to one receipt in this demo.");
      return;
    }
    update({
      ...state,
      selectedCouponIds: has
        ? state.selectedCouponIds.filter((id) => id !== couponId)
        : [...state.selectedCouponIds, couponId],
    });
    pushToast(
      has ? "Removed from receipt selection" : "Selected for receipt",
      has ? "removed" : "info",
      title,
    );
  },

  clearCouponSelection() {
    update({ ...state, selectedCouponIds: [] });
  },

  submitReceipt(couponIds: string[]) {
    const submission: DemoReceiptSubmission = {
      id: `receipt-${Date.now()}`,
      couponIds,
      submittedAt: new Date().toISOString(),
      status: "submitted",
    };
    update({
      ...state,
      receiptSubmissions: [submission, ...state.receiptSubmissions],
    });
    pushToast("Receipt submitted", "info", `${couponIds.length} coupon${couponIds.length === 1 ? "" : "s"} sent for checking.`);
    return submission.id;
  },

  setReceiptStatus(receiptId: string, status: ReceiptStatus) {
    update({
      ...state,
      receiptSubmissions: state.receiptSubmissions.map((submission) =>
        submission.id === receiptId ? { ...submission, status } : submission,
      ),
    });
  },

  approveReceipt(receiptId: string) {
    const submission = state.receiptSubmissions.find((item) => item.id === receiptId);
    if (!submission) return;
    const awardedAt = new Date().toISOString();
    const existingCouponIds = new Set(state.walletRewards.map((reward) => reward.couponId));
    const rewards: WalletReward[] = submission.couponIds
      .filter((couponId) => !existingCouponIds.has(couponId))
      .map((couponId) => {
        const coupon = couponById[couponId];
        return {
          id: `reward-${receiptId}-${couponId}`,
          couponId,
          title: coupon?.title ?? "Coupon reward",
          value: coupon?.reward ?? "Reward",
          awardedAt,
          receiptSubmissionId: receiptId,
        };
      });
    update({
      ...state,
      selectedCouponIds: [],
      receiptSubmissions: state.receiptSubmissions.map((item) =>
        item.id === receiptId ? { ...item, status: "approved" } : item,
      ),
      walletRewards: [...rewards, ...state.walletRewards],
    });
    pushToast("Reward added to your Wallet", "saved", `${rewards.length} validated benefit${rewards.length === 1 ? "" : "s"}.`);
  },

  toggleFollow(brandId: string, name: string) {
    const has = state.followedBrandIds.includes(brandId);
    update({
      ...state,
      followedBrandIds: has
        ? state.followedBrandIds.filter((id) => id !== brandId)
        : [brandId, ...state.followedBrandIds],
      preferences: {
        ...state.preferences,
        brands: has
          ? state.preferences.brands.filter((id) => id !== brandId)
          : [...new Set([brandId, ...state.preferences.brands])],
      },
    });
    pushToast(has ? `You no longer follow ${name}` : `You're following ${name}`, "info");
  },

  toggleRead(notificationId: string) {
    update({
      ...state,
      readNotificationIds: toggleIn(state.readNotificationIds, notificationId),
    });
  },

  markAllRead() {
    update({ ...state, readNotificationIds: seedNotifications.map((n) => n.id) });
  },

  toggleCategoryPreference(category: CategoryId) {
    update({
      ...state,
      preferences: {
        ...state.preferences,
        categories: toggleIn(state.preferences.categories, category),
      },
    });
  },

  toggleBrandPreference(brandId: string) {
    const has = state.preferences.brands.includes(brandId);
    update({
      ...state,
      followedBrandIds: has
        ? state.followedBrandIds.filter((id) => id !== brandId)
        : [...new Set([brandId, ...state.followedBrandIds])],
      preferences: {
        ...state.preferences,
        brands: has
          ? state.preferences.brands.filter((b) => b !== brandId)
          : [...state.preferences.brands, brandId],
      },
    });
  },

  setNotificationSetting(key: keyof UserPreference["notifications"], value: boolean) {
    update({
      ...state,
      preferences: {
        ...state.preferences,
        notifications: { ...state.preferences.notifications, [key]: value },
      },
    });
  },

  setLanguage(code: LanguageCode) {
    update({ ...state, preferences: { ...state.preferences, language: code } });
  },

  dismissToast(id: number) {
    toasts = toasts.filter((t) => t.id !== id);
    emit();
  },
};

/* -------------------------------------------------------------------- hook */

export function useStore() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const toastList = useSyncExternalStore(subscribe, getToasts, getServerToasts);

  const isSaved = useCallback(
    (id: string) => snapshot.savedOfferIds.includes(id),
    [snapshot.savedOfferIds],
  );
  const isFollowing = useCallback(
    (id: string) => snapshot.followedBrandIds.includes(id),
    [snapshot.followedBrandIds],
  );

  const readSet = useMemo(
    () => new Set(snapshot.readNotificationIds),
    [snapshot.readNotificationIds],
  );

  /**
   * The number the Wallet's "Saved" tab shows. Header and tab-bar badges use
   * this rather than the raw list, so the badge matches the Saved content.
   */
  const activeSavedCount = useMemo(() => {
    return snapshot.savedCouponIds.length + snapshot.savedGiftCardIds.length;
  }, [snapshot.savedCouponIds.length, snapshot.savedGiftCardIds.length]);

  return {
    ...snapshot,
    ...actions,
    toasts: toastList,
    isSaved,
    isCouponSaved: (id: string) => snapshot.savedCouponIds.includes(id),
    isGiftCardSaved: (id: string) => snapshot.savedGiftCardIds.includes(id),
    isCouponSelected: (id: string) => snapshot.selectedCouponIds.includes(id),
    isFollowing,
    isRead: (id: string) => readSet.has(id),
    activeSavedCount,
    unreadCount: seedNotifications.filter((n) => !readSet.has(n.id)).length,
  };
}
