"use client";

import { useRef, useState } from "react";
import { Camera, Check, FileImage, Keyboard, QrCode, ReceiptText, ScanBarcode, ScanLine, Upload } from "lucide-react";
import type { Competition } from "@/lib/types";
import { en } from "@/lib/i18n";

const COPY = {
  receipt: { title: en.platform.competitions.entry.receiptTitle, body: en.platform.competitions.entry.receiptBody, icon: ReceiptText },
  code: { title: en.platform.competitions.entry.codeTitle, body: en.platform.competitions.entry.codeBody, icon: Keyboard },
  qr: { title: en.platform.competitions.entry.qrTitle, body: en.platform.competitions.entry.qrBody, icon: QrCode },
  barcode: { title: en.platform.competitions.entry.barcodeTitle, body: en.platform.competitions.entry.barcodeBody, icon: ScanBarcode },
};

function Scanner({ kind, scanned, onScan }: { kind: "qr" | "barcode"; scanned: boolean; onScan: () => void }) {
  return (
    <div className="mt-5 overflow-hidden rounded-lg bg-ink p-4 text-paper sm:p-5">
      <div className="relative mx-auto flex aspect-[4/3] max-w-[420px] items-center justify-center overflow-hidden rounded-md border border-white/18 bg-[#22242d] sm:aspect-[16/10]">
        <div className="absolute left-3 top-3 flex items-center gap-2 rounded-md bg-black/45 px-2.5 py-1.5 text-[0.72rem] font-medium"><Camera className="size-3.5" />{en.platform.competitions.entry.cameraPreview}</div>
        {kind === "qr" ? (
          <div className="grid size-28 grid-cols-5 gap-1.5 bg-white p-3" aria-hidden="true">
            {[1,0,1,1,1,1,0,0,1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1].map((on, index) => <span key={index} className={on ? "bg-ink" : "bg-white"} />)}
          </div>
        ) : (
          <div className="flex h-24 w-56 items-stretch gap-[3px] bg-white p-4" aria-hidden="true">
            {[2,1,3,1,2,4,1,3,2,1,4,2,1,3,1,2,4,1,2,3,1,4].map((width, index) => <span key={index} className="h-full bg-ink" style={{ width }} />)}
          </div>
        )}
        <span className="pointer-events-none absolute inset-[18%] border border-white/85" aria-hidden="true"><span className="absolute left-0 right-0 top-1/2 h-px bg-primary" /></span>
        {scanned && <div className="absolute inset-x-5 bottom-5 rounded-md bg-white px-4 py-3 text-center text-[0.8rem] font-semibold text-ink"><Check className="mr-2 inline size-4 text-primary" />{en.platform.competitions.entry.detected.replace("{kind}", kind === "qr" ? "QR code" : "Barcode")}</div>}
      </div>
      <button type="button" onClick={onScan} className="mt-4 min-h-12 w-full rounded-md bg-white px-5 text-[0.88rem] font-semibold text-ink hover:bg-paper-deep">{scanned ? en.platform.competitions.entry.scanAgain : en.platform.competitions.entry.startScan.replace("{kind}", kind === "qr" ? "QR" : "barcode")}</button>
      <p className="mt-3 text-center text-[0.74rem] text-paper/60">{en.platform.competitions.entry.scannerDisclosure}</p>
    </div>
  );
}

export function CompetitionEntryDemo({ competition }: { competition: Competition }) {
  const [registered, setRegistered] = useState(false);
  const [fileName, setFileName] = useState("");
  const [code, setCode] = useState("");
  const [scanned, setScanned] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const spec = COPY[competition.entryMethod];
  const Icon = spec.icon;

  if (registered) {
    return (
      <div id="enter" className="scroll-mt-28 rounded-lg border border-rule bg-surface p-6 text-center sm:p-8">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-tint text-primary"><Check className="size-7" strokeWidth={2.7} /></span>
        <h2 className="u-display mt-5 text-[1.85rem]">{en.platform.competitions.registered}</h2>
        <p className="mx-auto mt-3 max-w-[48ch] text-[0.9rem] leading-relaxed text-ink-3">{en.platform.competitions.entry.confirmationDisclosure}</p>
        <button type="button" onClick={() => { setRegistered(false); setFileName(""); setCode(""); setScanned(false); }} className="mt-6 min-h-11 rounded-md border border-rule-strong px-5 text-[0.84rem] font-semibold text-ink hover:border-ink-3">{en.platform.competitions.reset}</button>
      </div>
    );
  }

  const canSubmit = competition.entryMethod === "receipt" ? Boolean(fileName) : competition.entryMethod === "code" ? code.trim().length >= 6 : scanned;

  return (
    <section id="enter" className="scroll-mt-28 rounded-lg border border-rule bg-surface p-5 sm:p-7">
      <div className="flex items-start gap-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-md bg-primary-tint text-primary"><Icon className="size-5" /></span>
        <div><h2 className="u-display text-[1.65rem]">{spec.title}</h2><p className="mt-1.5 text-[0.86rem] leading-relaxed text-ink-3">{spec.body}</p></div>
      </div>

      {competition.entryMethod === "receipt" && (
        <>
          <input ref={fileRef} type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} />
          <button type="button" onClick={() => fileRef.current?.click()} className="mt-5 flex min-h-[190px] w-full flex-col items-center justify-center rounded-lg border border-dashed border-rule-strong bg-paper px-5 text-center hover:border-primary">
            {fileName ? <FileImage className="size-8 text-primary" /> : <Upload className="size-8 text-ink-3" />}
            <span className="mt-3 text-[0.9rem] font-semibold text-ink">{fileName || en.platform.competitions.entry.chooseReceipt}</span>
            <span className="mt-1 text-[0.78rem] text-ink-3">{en.platform.competitions.entry.readableReceipt}</span>
          </button>
          <button type="button" onClick={() => setFileName("competition-demo-receipt.jpg")} className="mt-3 min-h-11 w-full rounded-md bg-primary-tint px-5 text-[0.84rem] font-semibold text-primary-ink hover:bg-[#dfe4ff]">{en.platform.competitions.entry.useDemoReceipt}</button>
        </>
      )}

      {competition.entryMethod === "code" && (
        <label className="mt-6 block">
          <span className="u-label text-ink-2">{en.platform.competitions.entry.campaignCode}</span>
          <input value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} autoCapitalize="characters" placeholder={en.platform.competitions.entry.codePlaceholder} className="mt-2 min-h-14 w-full rounded-md border border-rule-strong bg-paper px-4 text-[1rem] font-semibold tracking-[0.08em] outline-none focus:border-primary" />
          <span className="mt-2 block text-[0.76rem] text-ink-3">{en.platform.competitions.entry.codeGuidance}</span>
        </label>
      )}

      {(competition.entryMethod === "qr" || competition.entryMethod === "barcode") && <Scanner kind={competition.entryMethod} scanned={scanned} onScan={() => setScanned(true)} />}

      <button type="button" disabled={!canSubmit} onClick={() => setRegistered(true)} className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-primary px-5 text-[0.9rem] font-semibold text-white hover:bg-primary-hover disabled:cursor-not-allowed disabled:bg-rule-strong disabled:text-ink-3">
        <ScanLine className="size-[18px]" />
        {en.platform.competitions.submit}
      </button>
    </section>
  );
}
