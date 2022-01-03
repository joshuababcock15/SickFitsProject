import { useRouter } from 'next/router';
import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage() {
  const router = useRouter();
  const { query } = router;
  console.log(query.token);
  if (!query?.token) {
    return (
      <div>
        <p>Sorry you must supply a token</p>
        <RequestReset />
      </div>
    );
  }
  return (
    <div>
      <p>Reset Your Password {query?.token}</p>
      <Reset token={query?.token} />
    </div>
  );
}
