import type { Metadata } from "next";
import { CompetitionTemplateView } from "@/components/competition-template/CompetitionTemplateView";

export const metadata: Metadata = { title: "VIVA JUICE — Win Your Summer Escape", description: "A fictional standalone branded competition campaign template." };

export default function CompetitionTemplatePage() {
  return <CompetitionTemplateView />;
}
