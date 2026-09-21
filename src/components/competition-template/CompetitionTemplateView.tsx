"use client";

import { ArrowDown, Check, ChevronDown, Gift, Mail, Menu, ReceiptText, Share2, ShoppingBag, Trophy, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

const prizes = [
  { count: "1×", title: "Weekend getaway", body: "A two-night island escape for two.", featured: true },
  { count: "9×", title: "Headphones", body: "Wireless sound for every summer trip." },
  { count: "50×", title: "Gift cards", body: "Flexible rewards for something you choose." },
  { count: "100×", title: "Juice bundles", body: "A bright VIVA JUICE selection." },
];

const products = [
  { name: "Orange Juice", size: "1L", color: "#ff7a32", fruit: "O" },
  { name: "Tropical Juice", size: "330ml", color: "#f1b91e", fruit: "T" },
  { name: "Apple Juice", size: "250ml", color: "#66a744", fruit: "A" },
];

const faq = [
  ["Who can participate?", "Adults who live in Greece and meet the campaign terms may enter during the campaign period."],
  ["Which products are eligible?", "The Orange 1L, Tropical 330ml and Apple 250ml products shown on this page are included in this fictional campaign."],
  ["How are winners selected?", "Winners would be selected at random from valid entries after receipt and eligibility checks."],
  ["When will winners be announced?", "The example announcement date is 20 October 2026. Winners would be contacted using the details provided."],
  ["How many times can I enter?", "One valid entry is allowed per eligible receipt, subject to the full campaign terms."],
] as const;

export function CompetitionTemplateView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity() || !fileName) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#fff9ea] text-[#17225b]">
      <header className="relative z-30 border-b border-[#17225b]/15 bg-[#fff9ea]">
        <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5 sm:px-8">
          <a href="#top" className="font-black tracking-[-0.04em] text-[#17225b]" aria-label="VIVA JUICE home"><span className="text-[1.4rem]">VIVA</span><span className="ml-1 rounded-sm bg-[#ff6b3d] px-1.5 py-1 text-[0.75rem] tracking-normal text-[#17225b]">JUICE</span></a>
          <nav className="hidden items-center gap-7 text-[0.8125rem] font-bold md:flex" aria-label="Campaign navigation"><a href="#prizes">Prizes</a><a href="#how">How it works</a><a href="#products">Products</a><a href="#faq">FAQ</a><a href="#entry" className="rounded-md bg-[#17225b] px-5 py-3 text-white">Enter now</a></nav>
          <button type="button" onClick={() => setMenuOpen((value) => !value)} className="flex size-11 items-center justify-center rounded-md border border-[#17225b]/20 md:hidden" aria-expanded={menuOpen} aria-label="Toggle campaign menu">{menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}</button>
        </div>
        {menuOpen && <nav className="grid border-t border-[#17225b]/15 bg-[#fff9ea] px-5 py-4 text-[0.875rem] font-bold md:hidden"><a onClick={() => setMenuOpen(false)} href="#prizes" className="py-3">Prizes</a><a onClick={() => setMenuOpen(false)} href="#how" className="py-3">How it works</a><a onClick={() => setMenuOpen(false)} href="#products" className="py-3">Products</a><a onClick={() => setMenuOpen(false)} href="#entry" className="mt-2 rounded-md bg-[#17225b] px-4 py-3 text-center text-white">Enter competition</a></nav>}
      </header>

      <section id="top" className="relative isolate overflow-hidden border-b border-[#17225b]/15 bg-[#ffd63d]">
        <div className="absolute -right-24 -top-24 size-72 rounded-full border-[52px] border-[#fff9ea]/70 md:size-[430px]" aria-hidden="true" />
        <div className="absolute -bottom-32 left-[42%] size-64 rounded-full border-[44px] border-[#ff6b3d]/80" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[650px] max-w-[1240px] items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:py-20">
          <div><h1 className="max-w-[10ch] text-[clamp(3.2rem,8vw,6.8rem)] font-black leading-[0.84] tracking-[-0.04em]">WIN YOUR SUMMER ESCAPE</h1><p className="mt-7 max-w-[52ch] text-[1.0125rem] font-medium leading-relaxed">Buy any participating VIVA JUICE product, upload your receipt and enter the draw.</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><a href="#entry" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-[#17225b] px-7 font-bold text-white">Enter competition <ArrowDown className="size-4" /></a><a href="#prizes" className="inline-flex min-h-14 items-center justify-center rounded-md border-2 border-[#17225b] px-7 font-bold">See prizes</a></div><p className="mt-5 text-[0.75rem] font-bold">Campaign dates: 1 June – 30 September 2026 · Demo campaign</p></div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[470px] items-center justify-center" aria-label="VIVA JUICE product illustration">
            <span className="absolute size-[86%] rounded-full bg-[#ff6b3d]" /><span className="absolute right-[5%] top-[2%] size-24 rounded-full border-[18px] border-[#fff9ea]" />
            <div className="relative flex h-[76%] w-[44%] rotate-6 flex-col items-center justify-between rounded-[28px_28px_18px_18px] border-4 border-[#17225b] bg-[#fff9ea] p-6 shadow-[12px_16px_0_rgba(23,34,91,0.18)]"><span className="h-5 w-[60%] rounded-sm bg-[#17225b]" /><span className="text-center"><span className="block text-[2.5rem] font-black tracking-[-0.04em]">VIVA</span><span className="mt-1 block bg-[#ff6b3d] py-2 text-[0.75rem] font-black text-[#17225b]">ORANGE</span></span><span className="flex size-24 items-center justify-center rounded-full border-[18px] border-[#ff7a32] text-[1.6rem] font-black">O</span><span className="text-[0.75rem] font-black">1 LITRE</span></div>
          </div>
        </div>
      </section>

      <section id="prizes" className="scroll-mt-16 px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[1240px]"><div className="flex flex-col gap-4 border-b border-[#17225b]/20 pb-7 md:flex-row md:items-end md:justify-between"><h2 className="max-w-[12ch] text-[clamp(2.3rem,5vw,4.6rem)] font-black leading-[0.9] tracking-[-0.04em]">160 prizes are waiting</h2><p className="max-w-[44ch] text-[0.875rem] leading-relaxed text-[#17225b]/70">One bright summer purchase could put an island weekend, new headphones or instant rewards within reach.</p></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{prizes.map((prize) => <article key={prize.title} className={`flex min-h-64 flex-col justify-between rounded-lg border border-[#17225b]/20 p-6 ${prize.featured ? "bg-[#17225b] text-white md:col-span-2 lg:col-span-1" : "bg-white"}`}><Trophy className={`size-8 ${prize.featured ? "text-[#ffd63d]" : "text-[#ff6b3d]"}`} /><div><p className="text-[2.4rem] font-black tracking-[-0.04em]">{prize.count}</p><h3 className="mt-1 text-[1.2rem] font-black">{prize.title}</h3><p className={`mt-2 text-[0.8125rem] leading-relaxed ${prize.featured ? "text-white/70" : "text-[#17225b]/65"}`}>{prize.body}</p></div></article>)}</div></div></section>

      <section id="how" className="scroll-mt-16 bg-[#17225b] px-5 py-20 text-white sm:px-8 lg:py-24"><div className="mx-auto max-w-[1240px]"><h2 className="text-[clamp(2.3rem,5vw,4.2rem)] font-black leading-none tracking-[-0.04em]">Three steps. One draw.</h2><ol className="mt-10 grid gap-px overflow-hidden rounded-lg bg-white/15 md:grid-cols-3">{[[ShoppingBag,"Buy","Purchase any participating VIVA JUICE product."],[ReceiptText,"Upload","Upload a clear photo of your receipt."],[Gift,"Enter","Complete your details and enter the draw."]].map(([Icon,title,body], index) => { const StepIcon = Icon as typeof ShoppingBag; return <li key={title as string} className="bg-[#17225b] p-7"><div className="flex items-center justify-between"><StepIcon className="size-8 text-[#ffd63d]" /><span className="text-[0.75rem] font-black text-white/50">0{index + 1}</span></div><h3 className="mt-10 text-[1.6rem] font-black">{title as string}</h3><p className="mt-3 text-[0.875rem] leading-relaxed text-white/65">{body as string}</p></li>; })}</ol></div></section>

      <section id="products" className="scroll-mt-16 px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto max-w-[1240px]"><h2 className="text-[clamp(2.3rem,5vw,4.2rem)] font-black leading-none tracking-[-0.04em]">Pick your flavour</h2><p className="mt-4 max-w-[54ch] text-[0.875rem] leading-relaxed text-[#17225b]/70">These fictional packs show how eligible products can be made immediately recognisable.</p><div className="mt-9 grid gap-4 sm:grid-cols-3">{products.map((product) => <article key={product.name} className="flex min-h-80 flex-col items-center justify-end overflow-hidden rounded-lg border border-[#17225b]/20 bg-white p-6"><div className="flex h-44 w-28 flex-col items-center justify-between rounded-[18px_18px_10px_10px] border-2 border-[#17225b] bg-[#fff9ea] p-3"><span className="font-black">VIVA</span><span className="flex size-16 items-center justify-center rounded-full border-[12px] text-[1.2rem] font-black" style={{ borderColor: product.color }}>{product.fruit}</span><span className="text-[0.65rem] font-black">JUICE</span></div><h3 className="mt-6 text-center text-[0.975rem] font-black">{product.name}</h3><p className="mt-1 text-[0.8125rem] font-bold text-[#17225b]/55">{product.size}</p></article>)}</div></div></section>

      <section id="entry" className="scroll-mt-16 bg-[#ff6b3d] px-5 py-20 sm:px-8 lg:py-28"><div className="mx-auto grid max-w-[1240px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"><div><h2 className="max-w-[10ch] text-[clamp(2.5rem,6vw,5.2rem)] font-black leading-[0.9] tracking-[-0.04em] text-[#17225b]">Ready to enter?</h2><p className="mt-5 max-w-[42ch] text-[0.875rem] font-semibold leading-relaxed text-[#17225b]">Keep your receipt nearby. Required fields are marked, and this demo stores or sends no personal information.</p></div><div className="rounded-lg bg-[#fff9ea] p-5 sm:p-8">{submitted ? <div role="status" className="flex min-h-[500px] flex-col items-center justify-center text-center"><span className="flex size-16 items-center justify-center rounded-full bg-[#ffd63d]"><Check className="size-8" strokeWidth={3} /></span><h3 className="mt-6 text-[2rem] font-black tracking-[-0.03em]">Your entry has been submitted successfully.</h3><p className="mt-3 max-w-[44ch] text-[0.875rem] leading-relaxed text-[#17225b]/65">This is a mock confirmation. No entry was transmitted.</p><button type="button" onClick={() => { setSubmitted(false); setFileName(""); }} className="mt-7 min-h-12 rounded-md border-2 border-[#17225b] px-6 font-bold">Submit another demo</button></div> : <form onSubmit={submit} noValidate><div className="grid gap-4 sm:grid-cols-2"><Field label="Full Name" name="name" type="text" /><Field label="Email" name="email" type="email" /><Field label="Phone" name="phone" type="tel" /><Field label="Campaign code (optional)" name="code" type="text" required={false} /></div><div className="mt-4"><label className="text-[0.75rem] font-black uppercase tracking-[0.08em]">Receipt Upload *</label><input ref={fileRef} type="file" accept="image/*,.pdf" className="sr-only" onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")} required /><button type="button" onClick={() => fileRef.current?.click()} className="mt-2 flex min-h-28 w-full items-center justify-center gap-3 rounded-md border-2 border-dashed border-[#17225b]/30 bg-white px-4 text-[0.875rem] font-bold hover:border-[#17225b]"><Upload className="size-5" />{fileName || "Choose receipt image"}</button>{!fileName && <p className="mt-2 text-[0.75rem] text-[#17225b]/60">A receipt is required to submit.</p>}</div><div className="mt-5 space-y-3"><CheckField name="terms" label="I agree to the Terms & Conditions." /><CheckField name="privacy" label="I consent to the processing described in the Privacy Policy." /></div><button type="submit" className="mt-6 min-h-14 w-full rounded-md bg-[#17225b] px-6 font-black text-white hover:bg-[#263477]">Enter Competition</button></form>}</div></div></section>

      <section id="faq" className="scroll-mt-16 px-5 py-20 sm:px-8 lg:py-24"><div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[0.7fr_1.3fr]"><div><h2 className="text-[clamp(2.3rem,5vw,4.2rem)] font-black leading-none tracking-[-0.04em]">Questions, answered.</h2><p className="mt-4 text-[0.875rem] text-[#17225b]/65"><a href="#" className="font-bold underline">Terms & Conditions</a> · <a href="#" className="font-bold underline">Privacy Policy</a></p></div><div className="divide-y divide-[#17225b]/20 border-y border-[#17225b]/20">{faq.map(([question, answer], index) => { const open = openFaq === index; return <article key={question}><h3><button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? -1 : index)} className="flex min-h-16 w-full items-center justify-between gap-5 py-4 text-left text-[0.975rem] font-black">{question}<ChevronDown className={`size-5 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} /></button></h3>{open && <p className="pb-5 pr-9 text-[0.875rem] leading-relaxed text-[#17225b]/70">{answer}</p>}</article>; })}</div></div></section>

      <footer className="border-t border-white/15 bg-[#17225b] px-5 py-10 text-white sm:px-8"><div className="mx-auto flex max-w-[1240px] flex-col gap-7 sm:flex-row sm:items-center sm:justify-between"><p className="font-black tracking-[-0.03em]">VIVA <span className="text-[#ffd63d]">JUICE</span></p><nav className="flex flex-wrap gap-x-6 gap-y-3 text-[0.8125rem] font-bold" aria-label="Campaign footer"><a href="#">Terms</a><a href="#">Privacy</a><a href="mailto:hello@example.com">Contact</a></nav><div className="flex gap-2"><a href="#" aria-label="Share campaign" className="flex size-10 items-center justify-center rounded-full border border-white/25"><Share2 className="size-4" /></a><a href="mailto:hello@example.com" aria-label="Email" className="flex size-10 items-center justify-center rounded-full border border-white/25"><Mail className="size-4" /></a></div></div><p className="mx-auto mt-7 max-w-[1240px] border-t border-white/15 pt-5 text-[0.75rem] text-white/50">Fictional campaign concept for demonstration only. VIVA JUICE is not a real brand.</p></footer>
    </div>
  );
}

function Field({ label, name, type, required = true }: { label: string; name: string; type: string; required?: boolean }) {
  return <label className="text-[0.75rem] font-black uppercase tracking-[0.08em]">{label}{required && " *"}<input name={name} type={type} required={required} className="mt-2 min-h-13 w-full rounded-md border-2 border-[#17225b]/25 bg-white px-4 text-[0.875rem] font-medium normal-case tracking-normal outline-none focus:border-[#17225b]" /></label>;
}

function CheckField({ name, label }: { name: string; label: string }) {
  return <label className="flex items-start gap-3 text-[0.8125rem] font-medium leading-relaxed"><input name={name} type="checkbox" required className="mt-0.5 size-5 shrink-0" />{label}</label>;
}
