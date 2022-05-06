import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getBudget } from "~/models/budget.server";

export async function loader({ params: { id } }: { params: { id: string } }) {
  return json({
    budget: await getBudget(id)
  })
}

export default function BudgetId() {
  const { budget } = useLoaderData();
  return <main>
    <h1>{budget.name}</h1>
  </main>
}
