"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { Check, CheckCircle2, FileImage, LoaderCircle, ReceiptText, ShieldCheck, Upload, X } from "lucide-react";
import { brandById, couponById } from "@/lib/data";
import { useStore } from "@/lib/store";
import { BrandLogo } from "@/components/brands/BrandLogo";
import { en } from "@/lib/i18n";

type Stage = "upload" | "submitted" | "approved";

export function ReceiptUploadView() {
  const {
    selectedCouponIds,
    toggleCouponSelection,
    submitReceipt,
    setReceiptStatus,
    approveReceipt,
  } = useStore();
  const selected = selectedCouponIds.map((id) => couponById[id]).filter(Boolean);
  const [fileName, setFileName] = useState("");
  const [stage, setStage] = useState<Stage>("upload");
  const [receiptId, setReceiptId] = useState("");
  const [submittedCouponIds, setSubmittedCouponIds] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function acceptFile(file?: File) {
    if (file) setFileName(file.name);
  }

  function handleSubmit() {
    if (!fileName || selected.length === 0) return;
    const id = submitReceipt(selected.map((coupon) => coupon.id));
    setSubmittedCouponIds(selected.map((coupon) => coupon.id));
    setReceiptStatus(id, "under-review");
    setReceiptId(id);
    setStage("submitted");
  }

  function completeDemoValidation() {
    approveReceipt(receiptId);
    setStage("approved");
  }

  if (stage === "approved") {
    const approvedCoupons = submittedCouponIds.map((id) => couponById[id]).filter(Boolean);
    return (
      <div className="mx-auto max-w-[760px] py-10 text-center lg:py-16">
        <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-save-tint text-save-ink"><Check className="size-8" strokeWidth={2.6} /></span>
        <h1 className="u-display mt-6 text-[2.25rem] leading-tight sm:text-[2.8rem]">{en.platform.receipt.approved}</h1>
        <p className="mx-auto mt-4 max-w-[52ch] text-[1rem] leading-relaxed text-ink-2">{en.platform.receipt.approvedSub}</p>
        <div className="mt-8 grid gap-3 text-left sm:grid-cols-2">
          {approvedCoupons.map((coupon) => (
            <div key={coupon.id} className="rounded-md border border-rule bg-surface p-4">
              <p className="u-label text-save-ink">Reward received</p>
              <p className="mt-2 font-semibold text-ink">{coupon.reward}</p>
              <p className="mt-1 text-[0.8rem] text-ink-3">{coupon.title}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/wallet?tab=rewards" className="inline-flex min-h-12 items-center justify-center rounded-md bg-primary px-6 text-[0.9rem] font-semibold text-white hover:bg-primary-hover">{en.platform.receipt.viewRewards}</Link>
          <Link href="/coupons" className="inline-flex min-h-12 items-center justify-center rounded-md border border-rule-strong bg-surface px-6 text-[0.9rem] font-semibold text-ink hover:border-ink-3">Browse more coupons</Link>
        </div>
      </div>
    );
  }

  if (stage === "submitted") {
    return (
      <div className="mx-auto max-w-[760px] py-10 lg:py-16">
        <div className="text-center">
          <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-primary-tint text-primary"><LoaderCircle className="size-8 animate-spin" /></span>
          <h1 className="u-display mt-6 text-[2.25rem] leading-tight sm:text-[2.8rem]">{en.platform.receipt.checking}</h1>
          <p className="mx-auto mt-4 max-w-[54ch] text-[1rem] leading-relaxed text-ink-2">{en.platform.receipt.checkingSub}</p>
        </div>
        <ol className="mt-9 grid grid-cols-3 overflow-hidden rounded-lg border border-rule bg-surface">
          <li className="border-r border-rule px-3 py-4 text-center"><CheckCircle2 className="mx-auto size-5 text-primary" /><p className="mt-2 text-[0.75rem] font-semibold">Submitted</p></li>
          <li className="border-r border-rule bg-primary-tint/60 px-3 py-4 text-center"><LoaderCircle className="mx-auto size-5 animate-spin text-primary" /><p className="mt-2 text-[0.75rem] font-semibold">Under review</p></li>
          <li className="px-3 py-4 text-center text-ink-3"><ShieldCheck className="mx-auto size-5" /><p className="mt-2 text-[0.75rem] font-semibold">Approved</p></li>
        </ol>
        <div className="mt-8 rounded-lg border border-rule bg-surface p-5 sm:p-6">
          <p className="u-label text-ink-3">Demo validation</p>
          <p className="mt-2 text-[0.9rem] leading-relaxed text-ink-2">Continue to preview successful validation and the resulting Wallet reward.</p>
          <button type="button" onClick={completeDemoValidation} className="mt-5 min-h-12 w-full rounded-md bg-primary px-5 text-[0.9rem] font-semibold text-white hover:bg-primary-hover">{en.platform.receipt.completeDemo}</button>
        </div>
      </div>
    );
  }

  if (selected.length === 0) {
    return (
      <div className="mx-auto max-w-[620px] py-16 text-center">
        <ReceiptText className="mx-auto size-10 text-ink-3" />
        <h1 className="u-display mt-5 text-[2rem]">Select a coupon first</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-3">Choose one or more coupons before uploading a receipt. Saving a coupon is not required.</p>
        <Link href="/coupons" className="mt-6 inline-flex min-h-12 items-center rounded-md bg-primary px-6 text-[0.9rem] font-semibold text-white">Browse coupons</Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-12">
      <section>
        <h1 className="u-display text-[2.25rem] leading-tight sm:text-[2.8rem]">{en.platform.receipt.selectedHeading}</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-2">{selected.length} selected for this receipt. Saving is optional and separate from this claim.</p>
        <ul className="mt-6 divide-y divide-rule border-y border-rule">
          {selected.map((coupon) => {
            const brand = brandById[coupon.brandId];
            return (
              <li key={coupon.id} className="flex items-center gap-3 py-4">
                <BrandLogo brand={brand} size="sm" />
                <div className="min-w-0 flex-1"><p className="truncate text-[0.9rem] font-semibold text-ink">{coupon.title}</p><p className="mt-0.5 text-[0.8rem] text-ink-3">{coupon.reward}</p></div>
                <button type="button" onClick={() => toggleCouponSelection(coupon.id, coupon.title)} aria-label={`Remove ${coupon.title}`} className="flex size-10 items-center justify-center rounded-md text-ink-3 hover:bg-paper-deep hover:text-ink"><X className="size-4" /></button>
              </li>
            );
          })}
        </ul>
        <Link href="/coupons" className="mt-4 inline-flex min-h-11 items-center text-[0.84rem] font-semibold text-primary hover:underline">Add another coupon</Link>
      </section>

      <section className="rounded-lg border border-rule bg-surface p-5 sm:p-7">
        <h2 className="u-display text-[1.65rem]">{en.platform.receipt.uploadHeading}</h2>
        <p className="mt-2 text-[0.88rem] leading-relaxed text-ink-3">{en.platform.receipt.uploadSub}</p>
        <input ref={inputRef} type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => acceptFile(event.target.files?.[0])} />
        <div
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => { event.preventDefault(); acceptFile(event.dataTransfer.files?.[0]); }}
          className="mt-5 flex min-h-[240px] flex-col items-center justify-center rounded-lg border border-dashed border-rule-strong bg-paper px-6 py-8 text-center"
        >
          {fileName ? <FileImage className="size-9 text-primary" /> : <Upload className="size-9 text-ink-3" />}
          <p className="mt-4 text-[0.92rem] font-semibold text-ink">{fileName || en.platform.receipt.drop}</p>
          <p className="mt-1.5 text-[0.8rem] text-ink-3">{en.platform.receipt.formats}</p>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button type="button" onClick={() => inputRef.current?.click()} className="min-h-11 rounded-md border border-rule-strong bg-surface px-5 text-[0.84rem] font-semibold text-ink hover:border-primary">{fileName ? en.platform.receipt.chooseAnother : en.platform.receipt.choose}</button>
            <button type="button" onClick={() => setFileName("demo-receipt.jpg")} className="min-h-11 rounded-md bg-primary-tint px-5 text-[0.84rem] font-semibold text-primary-ink hover:bg-[#dfe4ff]">{en.platform.receipt.useDemo}</button>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {["Photograph the entire receipt", "Make sure the receipt is readable", "Do not cut off the top or bottom", "Review it before submitting"].map((tip) => <p key={tip} className="flex gap-2 text-[0.79rem] leading-relaxed text-ink-2"><Check className="mt-0.5 size-3.5 shrink-0 text-primary" />{tip}</p>)}
        </div>
        <button type="button" onClick={handleSubmit} disabled={!fileName} className="mt-6 min-h-12 w-full rounded-md bg-primary px-5 text-[0.9rem] font-semibold text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-ink-3">{en.platform.receipt.submit}</button>
      </section>
    </div>
  );
}
