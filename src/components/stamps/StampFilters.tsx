"use client";

import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { stampCampaigns } from "@/lib/data";
import { useStore } from "@/lib/store";
import { StampCampaignCard } from "./StampCampaignCard";

const categories = ["All categories", ...new Set(stampCampaigns.map((item) => item.category))];
const cities = ["All cities", ...new Set(stampCampaigns.map((item) => item.city))];

export function StampFilters() {
  const { stampCards } = useStore();
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("Greece");
  const [city, setCity] = useState("All cities");
  const [category, setCategory] = useState("All categories");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return stampCampaigns.filter((campaign) =>
      campaign.country === country &&
      (city === "All cities" || campaign.city === city) &&
      (category === "All categories" || campaign.category === category) &&
      (!needle || `${campaign.businessName} ${campaign.title}`.toLowerCase().includes(needle)),
    );
  }, [query, country, city, category]);

  const participatingIds = useMemo(() => new Set(stampCards.map((card) => card.campaignId)), [stampCards]);
  const activeCampaigns = useMemo(
    () => stampCards.map((card) => stampCampaigns.find((campaign) => campaign.id === card.campaignId)).filter((campaign): campaign is NonNullable<typeof campaign> => Boolean(campaign)),
    [stampCards],
  );
  const discoverCampaigns = results.filter((campaign) => !participatingIds.has(campaign.id));

  const reset = () => { setQuery(""); setCountry("Greece"); setCity("All cities"); setCategory("All categories"); };
  const filtered = query || city !== "All cities" || category !== "All categories";

  return (
    <>
      <section aria-label="Stamp campaign filters" className="mt-8 rounded-lg border border-rule bg-surface p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[minmax(240px,1.4fr)_repeat(3,minmax(150px,0.7fr))]">
          <label className="flex min-h-12 items-center gap-2 rounded-md border border-rule-strong bg-paper px-3 focus-within:border-primary">
            <Search className="size-4 text-ink-3" aria-hidden="true" />
            <span className="sr-only">Search by business name</span>
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search a business" className="min-w-0 flex-1 bg-transparent text-[0.86rem] outline-none" />
          </label>
          <FilterSelect label="Country" value={country} onChange={(value) => { setCountry(value); setCity("All cities"); }} options={["Greece"]} />
          <FilterSelect label="City" value={city} onChange={setCity} options={cities} />
          <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />
        </div>
      </section>

      {activeCampaigns.length > 0 && (
        <section className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="u-display text-[1.65rem]">My Active Campaigns</h2>
              <p className="mt-1 text-[0.82rem] text-ink-3">Campaigns you’ve already joined. Progress stays in your Wallet.</p>
            </div>
            <p className="u-nums text-[0.82rem] text-ink-3">{activeCampaigns.length}</p>
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {activeCampaigns.map((campaign) => <StampCampaignCard key={campaign.id} campaign={campaign} variant="active" />)}
          </div>
        </section>
      )}

      <div className="mt-8 flex items-end justify-between gap-4 border-t border-rule pt-7">
        <div>
          <h2 className="u-display text-[1.65rem]">Discover More Campaigns</h2>
          <p className="u-nums mt-1 text-[0.82rem] text-ink-3">{discoverCampaigns.length} campaign{discoverCampaigns.length === 1 ? "" : "s"}</p>
        </div>
        {filtered && <button type="button" onClick={reset} className="inline-flex min-h-11 items-center gap-2 rounded-md border border-rule px-3 text-[0.82rem] font-semibold text-ink-2 hover:border-ink-3"><X className="size-4" />Clear</button>}
      </div>
      {discoverCampaigns.length ? (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{discoverCampaigns.map((campaign) => <StampCampaignCard key={campaign.id} campaign={campaign} />)}</div>
      ) : (
        <div className="mt-6 rounded-lg border border-dashed border-rule-strong bg-surface px-6 py-14 text-center">
          <h3 className="u-display text-[1.35rem]">{filtered ? "No stamp campaigns found in this location." : "You’re already in every available campaign."}</h3>
          <p className="mt-2 text-[0.86rem] text-ink-3">{filtered ? "Try another city or remove a filter." : "Check your Wallet to add the next stamp."}</p>
          {filtered && <button type="button" onClick={reset} className="mt-5 min-h-11 rounded-md bg-primary px-5 text-[0.84rem] font-semibold text-white">Show all campaigns</button>}
        </div>
      )}
    </>
  );
}

function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: string[] }) {
  return <label className="relative"><span className="absolute left-3 top-2 u-label text-ink-3">{label}</span><select value={value} onChange={(event) => onChange(event.target.value)} className="min-h-14 w-full appearance-none rounded-md border border-rule-strong bg-paper px-3 pb-1 pt-5 text-[0.86rem] font-semibold outline-none focus:border-primary">{options.map((option) => <option key={option}>{option}</option>)}</select></label>;
}
