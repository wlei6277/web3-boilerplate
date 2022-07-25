import { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import generateCampaign from '../../../../ethereum/campaign';
import Layout from "../../../../components/Layout";
import web3 from "../../../../ethereum/web3";

const RequestNew = ({ address }) => {
  const router = useRouter()
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    setErrMsg('');
    const campaign = generateCampaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({ from: accounts[0] });
      router.push(`/campaigns/${address}`);
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Layout>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={Boolean(errMsg)}>
        <Form.Field>
          <label>Description</label>
          <Input value={description} onChange={event => setDescription(event.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Value</label>
          <Input value={value} onChange={event => setValue(event.target.value)}/>
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input value={recipient} onChange={event => setRecipient(event.target.value)}/>
        </Form.Field>
        <Message error header="Oops!" content={errMsg} />
        <Button primary loading={loading}>Create</Button>
      </Form>
    </Layout>
  );
}

RequestNew.getInitialProps = async (ctx) => {
  const { query } = ctx
  const { address } = query
  return { address }

}

export default RequestNew