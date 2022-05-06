import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import _ from 'lodash';
import { getCampaigns } from "~/models/campaign.server";
import type { Campaign } from "~/models/campaign.server";

export async function loader() {
  return json({
    campaigns: await getCampaigns(),
  })
}

export default function Index() {
  const { campaigns } = useLoaderData<{ campaigns: Campaign[] }>();  
  return (
    <main>
      <ul>
        {
          ..._.map(campaigns, (campaign) => (
            <li key={campaign.id}><Link to={`campaigns/${campaign.id}`}>{campaign.name}</Link></li>
          ))
        }
      </ul>
    </main>
  );
}
