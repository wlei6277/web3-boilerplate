import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Form, Input, Message, Button,
} from 'semantic-ui-react';
import generateCampaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

function ContributeForm({ address }) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrMsg('');
    const campaign = generateCampaign(address);
    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether'),
      });
      router.reload();
    } catch (error) {
      console.error(error);
      setErrMsg(error.message);
    } finally {
      setLoading(false);
      setValue('');
    }
  };
  return (
    <Form onSubmit={onSubmit} error={Boolean(errMsg)}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input label="ether" labelPosition="right" onChange={(event) => setValue(event.target.value)} />
      </Form.Field>
      <Message error header="Ooops!" content={errMsg} />
      <Button loading={loading} primary>Contribute</Button>
    </Form>
  );
}

export default ContributeForm;
