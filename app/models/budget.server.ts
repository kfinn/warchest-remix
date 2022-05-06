import type { Budget, Prisma } from '@prisma/client';
import { prisma } from "~/db.server";

export type { Budget, Prisma } from "@prisma/client";


export async function getBudget(id: string, args: { select?: Prisma.BudgetSelect, include?: Prisma.BudgetInclude } = {}): Promise<Budget> {
  return await prisma.budget.findUnique({
    where: { id },
    rejectOnNotFound: true,
    ...args
  });
}
