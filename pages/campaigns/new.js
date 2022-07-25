import { useState } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";


const CampaignNew = () => {
  const router = useRouter()
  const [minContribution, setMinContribution] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async event => {
    event.preventDefault();
    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      await factory.methods.createCampaign(Number(minContribution)).send({ from: accounts[0] });
      router.push('/');
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <Layout>
      <h3>Create a Campaign</h3>
      <Form onSubmit={onSubmit} error={Boolean(errMsg)}>
        <Form.Field>
          <label>Min Contribution</label>
          <Input label="wei" labelPosition="right" value={minContribution} onChange={event => setMinContribution(event.target.value)}/>
        </Form.Field>
        <Button primary loading={loading}>Create</Button>
        <Message error header="Oops!" content={errMsg} />
      </Form>
    </Layout>
  );
};

export default CampaignNew;
