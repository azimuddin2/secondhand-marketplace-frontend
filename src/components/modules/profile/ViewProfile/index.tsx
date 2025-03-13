'use client';

import { useUser } from '@/context/UserContext';
import { useEffect, useState } from 'react';
import { getSingleUser } from '@/services/User';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { FaCity, FaEdit, FaFacebook, FaLinkedin } from 'react-icons/fa';
import {
  MdHomeWork,
  MdOutlinePhoneInTalk,
  MdOutlineWorkHistory,
} from 'react-icons/md';
import { FaLinkSlash } from 'react-icons/fa6';
import { IoLocationOutline } from 'react-icons/io5';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { PiGraduationCapDuotone } from 'react-icons/pi';
import { LuCalendarDays } from 'react-icons/lu';
import Link from 'next/link';
import Spinner from '@/components/shared/Spinner';

const ViewProfile = () => {
  const { user } = useUser();
  const [userInfo, setUserInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user?.userId) {
      getSingleUser(user.userId)
        .then((data) => {
          if (!data || data?.success === false) {
            setError(data?.message || 'Failed to fetch user data');
          } else {
            setUserInfo(data.data);
          }
        })
        .catch(() => setError('Failed to load profile.'))
        .finally(() => setLoading(false));
    }
  }, [user?.userId]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex justify-center items-center my-5">
      <Card className="w-full max-w-3xl bg-white rounded-xl border-none">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 bg-[#F9FAFB]">
            {userInfo?.images?.length ? (
              <AvatarImage
                src={userInfo?.images[0] || '/default-avatar.png'}
                alt="Profile"
              />
            ) : (
              <AvatarFallback className="text-4xl border">
                {userInfo?.name?.charAt(0) || 'SM'}
              </AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="mt-2 text-xl font-semibold">
            {userInfo?.name || 'Not Provided'}
          </CardTitle>
          <p className="text-gray-500">{userInfo?.email || 'Not Provided'}</p>
          <div className="flex justify-center mt-2">
            <Link href={`/${userInfo?.role}/edit-profile`}>
              <Button variant="default" className="w-full cursor-pointer">
                Edit Profile <FaEdit />{' '}
              </Button>
            </Link>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 px-5">
          <div className=" p-5 grid grid-cols-1 bg-[#F9FAFB] rounded">
            <p className="flex items-center border-b py-3">
              <MdOutlinePhoneInTalk className="mr-2 text-lg" />
              <strong className="font-semibold">Phone:</strong>
              <span className="ml-1">{userInfo?.phone || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaCity className="mr-2" />
              <strong className="font-semibold">City: </strong>
              <span className="ml-1">{userInfo?.city || 'Not Provided'}</span>
            </p>
            <p className="flex border-b py-3">
              <IoLocationOutline className="mr-2 text-xl" />
              <strong className="font-semibold">Address:</strong>
              <span className="ml-1">
                {userInfo?.address || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <PiGraduationCapDuotone className="mr-2 text-lg" />
              <strong className="font-semibold">Education:</strong>
              <span className="ml-1">
                {userInfo?.education || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <MdOutlineWorkHistory className="mr-2" />
              <strong className="font-semibold">Job Title:</strong>
              <span className="ml-1">
                {userInfo?.jobTitle || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <MdHomeWork className="mr-2" />
              <strong className="font-semibold">Company:</strong>
              <span className="ml-1">
                {userInfo?.company || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaLinkSlash className="mr-2" />
              <strong className="font-semibold">Portfolio Link:</strong>
              <span className="ml-1">
                {userInfo?.portfolio || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaLinkedin className="mr-2" />
              <strong className="font-semibold">LinkedIn Profile:</strong>
              <span>{userInfo?.linkedInProfile || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaFacebook className="mr-2" />
              <strong className="font-semibold">Facebook Profile:</strong>
              <span className="ml-1">
                {userInfo?.facebookProfile || 'Not Provided'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <VscWorkspaceTrusted className="mr-2" />
              <strong className="font-semibold">Role:</strong>
              <span className="ml-1 capitalize">
                {userInfo?.role || 'User'}
              </span>
            </p>
            <p className="flex items-center py-3">
              <LuCalendarDays className="mr-2" />
              <strong className="font-semibold">Joined:</strong>
              <span className="ml-1">
                {userInfo?.createdAt
                  ? new Date(userInfo.createdAt).toLocaleDateString()
                  : 'Fetching date...'}
              </span>
            </p>
          </div>
          {error && <p className="text-red-500 text-center">{error}</p>}
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewProfile;
