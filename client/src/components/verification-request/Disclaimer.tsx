import { RootState } from '@/store';
import { updateNextDisable } from '@/store/verification.slice';
import { Stack, Switch, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import Footer from './footer';

function Disclaimer() {
  const { nextDisabled } = useSelector((state: RootState) => state.verification);
  const dispatch = useDispatch();

  return (
    <>
      <Stack alignItems="center" gap={2}>
        <Typography variant="body1" fontWeight={'bold'} pb={4}>
          IMPORTANT, PLEASE READ BEFORE CONTINUING
        </Typography>
        <Typography variant="caption" fontWeight={'bold'}>
          We take the security of personal data and certificates extremely seriously. As part of the verification
          process, we will email the learner that was originally issued this certificate to authenticate your request.
        </Typography>

        <Typography variant="caption" fontWeight={'bold'}>
          To allow the learner to identify who is requesting information relating to them, your name and organisation
          will be provided to the learner to allow them to authorise your request
        </Typography>

        <Typography variant="caption" fontWeight={'bold'}>
          Your email address will be used by us to confirm the outcome of your request within 2 working days of
          submission.
        </Typography>

        <Typography variant="caption" fontWeight={'bold'}>
          Please note: The outcome of this request will be recorded and held by us for monitoring purposes. This
          includes your name, organisation and email address. Please tick the box below to confirm your acceptance or
          contact us
        </Typography>

        <Stack direction="row" alignItems="center" mt={4} px={2}>
          <Switch
            onChange={(e) => {
              dispatch(updateNextDisable(!e.target.checked));
            }}
            value={nextDisabled}
            checked={!nextDisabled}
          />
          <Typography variant="caption">
            I confirm I am happy to store and use my details, as detailed above tick box, must be ticked to proceed
          </Typography>
        </Stack>
      </Stack>

      <Footer label="Next" />
    </>
  );
}
export default Disclaimer;
