import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ReceiptUploadView } from "@/components/coupons/ReceiptUploadView";

export const metadata: Metadata = { title: "Upload receipt", description: "Register selected coupon benefits with one clear purchase receipt." };

export default function ReceiptUploadPage() {
  return <Container className="pb-8 pt-8 lg:pt-12"><ReceiptUploadView /></Container>;
}
