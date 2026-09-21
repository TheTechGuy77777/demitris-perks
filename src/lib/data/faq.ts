export interface FaqQuestion {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  name: string;
  icon: string;
  active: boolean;
  questions: FaqQuestion[];
}

export const faqCategories: FaqCategory[] = [
  {
    id: "general",
    name: "General",
    icon: "CircleHelp",
    active: true,
    questions: [
      {
        question: "What is Perks?",
        answer:
          "Perks is a consumer rewards platform where you can discover products, claim coupon benefits, collect loyalty stamps and enter competitions.",
      },
      {
        question: "How does Perks work?",
        answer:
          "Browse a reward type, follow the participation steps shown on its page, then keep saved items, validated rewards and stamp progress together in your Wallet.",
      },
      {
        question: "Do I need an account to browse offers?",
        answer:
          "No. You can browse public campaigns without an account. Registration is required when you want to submit a receipt, collect stamps or save personal progress.",
      },
    ],
  },
  {
    id: "account",
    name: "Account",
    icon: "UserRound",
    active: true,
    questions: [
      {
        question: "How do I create an account?",
        answer:
          "Choose Sign In or Register from the account area and follow the on-screen steps. Authentication is represented as a prototype in this version.",
      },
      {
        question: "How do I change my profile details?",
        answer:
          "Open Account from the profile icon. Your personal details and preferences are grouped there.",
      },
      {
        question: "What happens if I forget my password?",
        answer:
          "Use the Forgot password link on the future sign-in screen to request a secure reset email.",
      },
    ],
  },
  {
    id: "wallet",
    name: "Wallet",
    icon: "WalletCards",
    active: true,
    questions: [
      {
        question: "How does the Wallet work?",
        answer:
          "The Wallet separates things saved for later, rewards you have received, active stamp cards and your validation activity.",
      },
      {
        question: "Where can I see my saved offers?",
        answer:
          "Open Wallet and choose the Saved tab. Saving is a reminder only and does not claim a coupon or guarantee a benefit.",
      },
      {
        question: "Where can I see my stamp progress?",
        answer:
          "Open the Stamp Cards tab in your Wallet to see every joined campaign, visual progress and any unlocked reward.",
      },
    ],
  },
  {
    id: "offers",
    name: "Offers",
    icon: "Tag",
    active: true,
    questions: [
      {
        question: "How do I claim a cashback offer?",
        answer:
          "Select the eligible coupon, buy the required product and upload the full readable receipt for validation.",
      },
      {
        question: "Do I need to save an offer before purchasing?",
        answer:
          "No. Saving is optional and only helps you find an offer again. Select the coupon and submit proof of purchase to register a claim.",
      },
      {
        question: "How do I upload a receipt?",
        answer:
          "From a coupon or competition, choose the receipt option and upload a JPG, PNG or PDF showing the complete readable receipt.",
      },
    ],
  },
  {
    id: "competitions",
    name: "Competitions",
    icon: "Trophy",
    active: true,
    questions: [
      {
        question: "How do I enter a competition?",
        answer:
          "Open the competition, review its prize, dates and requirements, then use the single entry method shown for that campaign.",
      },
      {
        question: "Can I enter using a receipt, code, QR code or barcode?",
        answer:
          "Yes, Perks supports all four concepts. Each campaign specifies exactly one method so the next step is always clear.",
      },
      {
        question: "Where can I see my competition entries?",
        answer:
          "A production version would list confirmed entries in your Wallet activity. This prototype demonstrates entry confirmation on each competition page.",
      },
    ],
  },
  {
    id: "support",
    name: "Support",
    icon: "LifeBuoy",
    active: true,
    questions: [
      {
        question: "How do I contact support?",
        answer:
          "Use the Contact link in the footer. In a production release, this would open the support channel available in your country.",
      },
      {
        question: "What should I do if my receipt is rejected?",
        answer:
          "Check that the full receipt is visible, readable and includes the eligible product. Then upload a clearer image before the campaign deadline.",
      },
    ],
  },
];
