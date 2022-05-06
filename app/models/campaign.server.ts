import type { Campaign, Prisma } from '@prisma/client';
import { prisma } from "~/db.server";

export type { Campaign, Prisma } from "@prisma/client";

export async function getCampaigns(): Promise<Campaign[]> {
  return await prisma.campaign.findMany();
}

export async function getCampaign(id: string, args: { select?: Prisma.CampaignSelect, include?: Prisma.CampaignInclude } = {}): Promise<Campaign> {
  return await prisma.campaign.findUnique({
    where: { id },
    rejectOnNotFound: true,
    ...args
  });
}
