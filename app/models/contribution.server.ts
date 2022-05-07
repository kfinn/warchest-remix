import type { Prisma } from '@prisma/client';
import { prisma } from "~/db.server";

export type { Contribution, Prisma } from "@prisma/client";

export function getContributions(args: Prisma.ContributionFindManyArgs) {
  return prisma.contribution.findMany(args);
}

export function createContribution(data: Prisma.ContributionCreateInput) {
  return prisma.contribution.create({ data });
}
