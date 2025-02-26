'use client';

import { useSession } from '@/lib/auth-client';
import Image from 'next/image';

export default function App() {
  const { data, isPending, error } = useSession();

  console.log('data', data);
  console.log('isPending', isPending);
  console.log('error', error);

  if (error) {
    return <div>error: {error.message}</div>;
  }

  if (!isPending && !data) {
    return <div>you are not logged in</div>;
  }

  if (!data) {
    return <div>loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="max-w-sm mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4">
          <div className="flex items-center space-x-4">
            {data.user.image && (
              <Image
                src={data.user.image}
                alt="Profile"
                className="h-12 w-12 rounded-full"
                width={48}
                height={48}
              />
            )}
            <div>
              <h2 className="text-lg font-semibold">
                {data.user.name || 'User'}
              </h2>
              <p className="text-gray-500 text-sm">{data.user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
