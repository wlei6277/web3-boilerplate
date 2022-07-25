import { Button, Table } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import generateCampaign from "../ethereum/campaign";

const RequestRow = ({ campaignAddress, index, request, approversCount, isManager }) => {
  const { Row, Cell } = Table;
  const { description, value, recipient, approvalCount } = request;
  const onApprove = async () => {
    const campaign = generateCampaign(campaignAddress);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(index).send({ from: accounts[0] });
  };
  const onFinalize = async () => {
    const campaign = generateCampaign(campaignAddress);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(index).send({ from: accounts[0] });
  };
  const readyToFinalize = request.approvalCount > approversCount / 2;
  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>{index}</Cell>
      <Cell>{description}</Cell>
      <Cell>{web3.utils.fromWei(value, "ether")}</Cell>
      <Cell>{recipient}</Cell>
      <Cell>
        {approvalCount}/{approversCount}
      </Cell>
      <Cell>
        {!request.complete && (
          <Button color="green" basic onClick={onApprove} disabled={isManager}>
            Approve
          </Button>
        )}
      </Cell>
      <Cell>
        {!request.complete && (
          <Button color="teal" basic onClick={onFinalize} disabled={!isManager}>
            Finalize
          </Button>
        )}
      </Cell>
    </Row>
  );
};

export default RequestRow;
