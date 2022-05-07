import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getBudget } from "~/models/budget.server";

export async function loader({ params: { budgetId } }: { params: { budgetId: string } }) {
  return json({
    budget: await getBudget(budgetId)
  })
}

export default function BudgetId() {
  const { budget } = useLoaderData();
  return <main>
    <h1>{budget.name}</h1>
    <Link to="./contributions">Contributions</Link>
    <Outlet />
  </main>
}
