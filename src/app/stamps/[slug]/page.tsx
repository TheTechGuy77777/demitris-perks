import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { StampCampaignDetail } from "@/components/stamps/StampCampaignDetail";
import { getStampCampaign, stampCampaigns } from "@/lib/data";

export function generateStaticParams() {
  return stampCampaigns.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/stamps/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getStampCampaign(slug);
  return campaign ? { title: campaign.title, description: campaign.summary } : { title: "Stamp campaign" };
}

export default async function StampCampaignPage({ params }: PageProps<"/stamps/[slug]">) {
  const { slug } = await params;
  const campaign = getStampCampaign(slug);
  if (!campaign) notFound();
  return <Container className="pb-8 pt-7 lg:pt-10"><StampCampaignDetail campaign={campaign} /></Container>;
}
