import { VerificationIdent } from '@/services/api.service';
import { Paper, Typography } from '@mui/material';

interface Props {
  data: VerificationIdent;
}

function DetailsRequested({ data }: Props) {
  return (
    <Paper>
      <Typography fontSize={18} fontWeight={700}>
        Details Requested
      </Typography>
      <table className="confirm-request-table">
        <tr>
          <th>Certificate Name:</th>
          <td>{data.student.name}</td>
        </tr>
        <tr>
          <th>Certificate Date:</th>
          <td>{data.certificate.issueDate}</td>
        </tr>
        <tr>
          <th>Qualification:</th>
          <td>{data.certificate.name}</td>
        </tr>
        <tr>
          <th>Mater log certificate No:</th>
          <td>{data.certificate.number}</td>
        </tr>
      </table>
    </Paper>
  );
}
export default DetailsRequested;
