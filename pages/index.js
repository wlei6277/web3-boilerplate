import { CardGroup, Button } from "semantic-ui-react";
import Link from 'next/link'
import factory from "../ethereum/factory";
import Layout from '../components/Layout'

const CampaignPage = ({ campaigns }) => {
  
  return (
    <main>
      <Layout>
        <h3>Open Campaigns</h3>
        <Link href="/campaigns/new">
          <a>
            <Button floated="right" content="Create Campaign" icon="add circle" primary  />
          </a>
        </Link>
        <CardGroup
          items={campaigns.map((address) => ({
            header: address,
            description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
            fluid: true,
          }))}
        />
      </Layout>
    </main>
  );
};

CampaignPage.getInitialProps = async (ctx) => {
  const campaigns = await factory.methods.getDeployedCampaigns().call();
  return { campaigns };
};

export default CampaignPage;
