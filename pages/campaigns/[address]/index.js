import { Button, Card, Grid } from 'semantic-ui-react'
import Link from 'next/link';
import Layout from '../../../components/Layout'
import generateCampaign from '../../../ethereum/campaign'
import web3 from '../../../ethereum/web3'
import ContributeForm from "../../../components/ContributeForm";

const CampaignShow = ({  address, minimumContribution, balance, requestsCount, approversCount, manager }) => {
  const campaignDetails = [
    {
      header: manager,
      meta: 'Address of the manager',
      description: 'The manager created this campaign and can create requests to withdraw money',
      style: { overflowWrap: 'break-word' }
    },
    {
      header: minimumContribution,
      meta: 'Minimum Contribution (wei)',
      description: 'You must contribute at least this much wei to become an approver'
    },
    {
      header: requestsCount,
      meta: 'Number of Requests',
      description: 'A request tries to withdraw money from this contract. Requests must be approved by approvers.',
    },
    {
      header: approversCount,
      meta: 'Number of Approvers',
      description: 'Number of people who have already donated to this campaign'
    },
    { 
      header: web3.utils.fromWei(balance, 'ether'),
      meta: 'Campaign Balance (ether)',
      description: 'The balance is how much money this campaign has left to spend.'
    }
  ]
  return (
    <main>
      <Layout>
        <h3>Campaign Show</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>
              <Card.Group items={campaignDetails} />
            </Grid.Column>
            <Grid.Column width={6}>
              <ContributeForm address={address}/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Link href={`/campaigns/${address}/requests`}>
                <a>
                  <Button primary>View requests</Button>
                </a>
              </Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    </main>
  );
};


CampaignShow.getInitialProps = async (ctx) => {
  const { query } = ctx
  const { address } = query
  const campaign = generateCampaign(address)
  const summary = await campaign.methods.getSummary().call()
  return { address, minimumContribution: summary[0], balance: summary[1], requestsCount: summary[2], approversCount: summary[3], manager: summary[4] }

}
export default CampaignShow;
