import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import _ from "lodash";
import { getCampaign } from "~/models/campaign.server";

export async function loader({ params: { id } }: { params: { id: string } }) {
  return json({
    campaign: await getCampaign(
      id, 
      {
        include: {
          budgets: true
        },
      }
    ),
  });
}

export default function CampaignId() {
  const { campaign } = useLoaderData();
  return (
    <main>
      <h1>{campaign.name}</h1>
      <ul>
        {
          ..._.map(campaign.budgets, (budget) => (
            <li key={budget.id}><Link to={`/budgets/${budget.id}/contributions`}>{budget.name}</Link></li>
          ))
        }
      </ul>
    </main>
  )
}
