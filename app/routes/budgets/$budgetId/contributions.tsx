import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import _ from "lodash";
import { contributionFormattedAmount, contributionFormattedDate } from "~/models/contribution";
import { getContributions } from "~/models/contribution.server";

export async function loader({ params: { budgetId } }: { params: { budgetId: string } }) {
  return json({
    contributions: await getContributions({
      where: { entry: { budgetId } },
      include: { entry: true }
    })
  })
}

export default function Contributions() {
  const { contributions } = useLoaderData();
  return <main>
    <ul>
      <Link to="./new">New Contribution</Link>
      <Outlet />
      {
        _.map(contributions, (contribution) => (
          <li key={contribution.id}>{contributionFormattedAmount(contribution)} on {contributionFormattedDate(contribution)}</li>
        ))
      }
    </ul>
  </main>
}
