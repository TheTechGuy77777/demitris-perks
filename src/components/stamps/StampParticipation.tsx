"use client";

import { useRef, useState } from "react";
import { Check, FileImage, KeyRound, ReceiptText, Upload } from "lucide-react";
import type { StampCampaign } from "@/lib/types";
import { useStore } from "@/lib/store";
import { relativeTime } from "@/lib/date";

export function StampParticipation({
  campaign,
  initialMethod = "receipt",
}: {
  campaign: StampCampaign;
  initialMethod?: "receipt" | "code";
}) {
  const { stampCards, addCampaignStamp } = useStore();
  const [method, setMethod] = useState<"receipt" | "code">(initialMethod);
  const [fileName, setFileName] = useState("");
  const [code, setCode] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const card = stampCards.find((item) => item.campaignId === campaign.id);
  const complete = (card?.progress ?? 0) >= campaign.target;
  const valid = method === "receipt" ? Boolean(fileName) : code.trim().length >= 5;

  function submit() {
    if (!valid || complete) return;
    addCampaignStamp(campaign.id, campaign.target, campaign.title, method);
    setSuccess(true);
  }

  return (
    <section id="stamp-validate" className="scroll-mt-28 rounded-lg border border-rule bg-surface p-5 sm:p-7">
      <div className="flex items-start gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary"><ReceiptText className="size-5" /></span>
        <div>
          <h2 className="u-display text-[1.6rem]">{complete ? "Reward unlocked" : "Add your next stamp"}</h2>
          <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-3">
            {complete ? "This campaign is complete. Your reward is ready in Wallet." : "Validate an eligible purchase here. Progress stays on this stamp card."}
          </p>
        </div>
      </div>

      {card?.lastValidation && (
        <p className="mt-4 text-[0.78rem] text-ink-3">Last validation: {card.lastValidation.method === "receipt" ? "Receipt" : "Code"} · {relativeTime(card.lastValidation.at)}</p>
      )}

      {complete ? (
        <div role="status" className="mt-5 flex items-center gap-3 rounded-md bg-save-tint p-4 text-save-ink">
          <Check className="size-5 shrink-0" strokeWidth={2.8} />
          <p className="text-[0.84rem] font-semibold">Your {campaign.reward.toLowerCase()} is ready.</p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-2 gap-2" role="group" aria-label="Validation method">
            <MethodButton active={method === "receipt"} onClick={() => { setMethod("receipt"); setSuccess(false); }} icon={Upload} label="Upload receipt" />
            <MethodButton active={method === "code"} onClick={() => { setMethod("code"); setSuccess(false); }} icon={KeyRound} label="Enter code" />
          </div>
          {method === "receipt" ? (
            <div className="mt-4">
              <input ref={fileRef} type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => { setFileName(event.target.files?.[0]?.name ?? ""); setSuccess(false); }} />
              <button type="button" onClick={() => fileRef.current?.click()} className="flex min-h-[170px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-rule-strong bg-paper px-5 text-center hover:border-primary">
                {fileName ? <FileImage className="size-8 text-primary" /> : <Upload className="size-8 text-ink-3" />}
                <span className="mt-3 text-[0.88rem] font-semibold">{fileName || "Choose a clear receipt image"}</span>
                <span className="mt-1 text-[0.76rem] text-ink-3">JPG, PNG or PDF · demo only</span>
              </button>
              <button type="button" onClick={() => { setFileName("stamp-demo-receipt.jpg"); setSuccess(false); }} className="mt-2 min-h-11 w-full rounded-md bg-primary-tint text-[0.83rem] font-semibold text-primary-ink">Use demo receipt</button>
            </div>
          ) : (
            <label className="mt-5 block">
              <span className="u-label text-ink-2">Campaign code</span>
              <input value={code} onChange={(event) => { setCode(event.target.value.toUpperCase()); setSuccess(false); }} placeholder="e.g. STAMP-24" className="mt-2 min-h-14 w-full rounded-md border border-rule-strong bg-paper px-4 font-semibold tracking-[0.07em] outline-none focus:border-primary" />
              <span className="mt-2 block text-[0.75rem] text-ink-3">Enter at least 5 characters for the demo.</span>
            </label>
          )}
          <button type="button" disabled={!valid} onClick={submit} className="mt-5 min-h-12 w-full rounded-md bg-primary px-5 text-[0.88rem] font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-ink-3">{method === "receipt" ? "Validate receipt" : "Submit code"}</button>
          {success && (
            <div role="status" className="mt-4 flex items-center gap-3 rounded-md bg-save-tint p-4 text-save-ink">
              <Check className="size-5 shrink-0" strokeWidth={2.8} />
              <p className="text-[0.84rem] font-semibold">Stamp added successfully. Your Wallet progress is updated.</p>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function MethodButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: typeof Upload; label: string }) {
  return <button type="button" aria-pressed={active} onClick={onClick} className={`flex min-h-12 items-center justify-center gap-2 rounded-md border px-3 text-[0.8rem] font-semibold ${active ? "border-ink bg-ink text-paper" : "border-rule bg-paper text-ink-2 hover:border-ink-3"}`}><Icon className="size-4" />{label}</button>;
}
