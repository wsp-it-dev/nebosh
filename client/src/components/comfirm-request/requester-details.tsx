import { VerificationIdent } from '@/services/api.service';
import { Paper, Typography } from '@mui/material';
import moment from 'moment';

interface Props {
  data: VerificationIdent;
}

function RequesterDetails({ data }: Props) {
  return (
    <Paper>
      <Typography fontSize={18} fontWeight={700}>
        Requester Details
      </Typography>
      <table className="confirm-request-table">
        <tr>
          <th>Requested By:</th>
          <td>{data.request.name}</td>
        </tr>
        <tr>
          <th>Organisation:</th>
          <td>{data.request.organization}</td>
        </tr>
        <tr>
          <th>Email:</th>
          <td>{data.request.email}</td>
        </tr>
        <tr>
          <th>Requested:</th>
          <td>{moment(data.request.timestamp).format('DD/MM/YYYY hh:mm A')}</td>
        </tr>
      </table>
    </Paper>
  );
}
export default RequesterDetails;
