'use client';

import { useSearchParams } from 'next/navigation';
import apiService from '@/services/api.service';
import { updateStudent } from '@/store/verification.slice';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';

interface Resp {
  data: {
    data: {
      name: string;
      issueDate: string;
      id: number;
      ident: string;
      number: string;
    };
  };
}

function FetchReqData() {
  const dispatch = useDispatch();
  const params = useSearchParams<any>();

  useQuery(
    `/certificate/${params.get('ident')}`,
    async () => {
      const { data }: Resp = await apiService.get(`/api/certificates/certificate-with-ident/${params.get('ident')}`);
      dispatch(
        updateStudent({
          certId: data.data.id,
          number: data.data.number,
          name: data.data.name,
          issueDate: data.data.issueDate,
        })
      );
      return data.data;
    },
    {
      enabled: Boolean(params.get('ident')),
    }
  );

  return null;
}
export default FetchReqData;
