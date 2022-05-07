import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.campaign.create({
    data: {
      name: "Kevin's Campaign",
      budgets: {
        create: [
          {
            name: "Kevin's Budget",
            entries: {
              create: [
                {
                  amount: 100,
                  date: new Date(2022, 4, 1),
                  contribution: {
                    create: {}
                  }
                },
                {
                  amount: 90,
                  date: new Date(2022, 5, 1),
                  disbursement: { create: {} }
                }
              ]
            }
          },
          { name: 'Empty Budget' },
        ]
      }
    }
  });
  await prisma.campaign.create({ data: { name: "Empty Campaign" } });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
