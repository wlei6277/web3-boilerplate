import { useContext } from "react";
import Link from "next/link";
import { MetaMaskContext } from '../../../_app'
import { Button, Table } from "semantic-ui-react";
import generateCampaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";
import Layout from "../../../../components/Layout";


const RequestIndex = ({ address, requests, approversCount, managerAddress, summary }) => {
  const { address: userAddress } = useContext(MetaMaskContext)
  const { Header, Row, HeaderCell, Body } = Table;
  const isManager = userAddress === managerAddress
  return (
    <Layout>
      <h3>Request List</h3>
      {isManager && <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button floated="right" style={{ marginBottom: 10 }} primary>Add request</Button>
        </a>
      </Link>}
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {requests.map((r, i) => <RequestRow request={r} index={i} campaignAddress={address} id={i} approversCount={approversCount} isManager={isManager} />)}
        </Body>
      </Table>
      <div>Found {requests.length} requests.</div>
    </Layout>
  );
};

RequestIndex.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const { address } = query;
  const campaign = generateCampaign(address);
  const numRequests = await campaign.methods.getRequestsCount().call();
  const summary = await campaign.methods.getSummary().call()
  const requests = await Promise.all(
    Array(parseInt(numRequests))
      .fill()
      .map((_element, index) => campaign.methods.requests(index).call())
  );
  const approversCount = await campaign.methods.approversCount().call();
  return { address, requests, approversCount, managerAddress: summary[4], summary };
};

export default RequestIndex;
