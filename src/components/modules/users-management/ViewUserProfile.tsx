import { IUser } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FaCity, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { HiOutlineStatusOnline } from 'react-icons/hi';
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

const ViewUserProfile = ({ user }: { user: IUser }) => {
  const {
    images,
    name,
    email,
    role,
    status,
    phone,
    address,
    city,
    createdAt,
    company,
    education,
    jobTitle,
    portfolio,
    linkedInProfile,
    facebookProfile,
  } = user;

  return (
    <div className="flex justify-center items-center my-5">
      <Card className="w-full max-w-3xl bg-white rounded-xl border-none">
        <CardHeader className="flex flex-col items-center">
          <Avatar className="w-24 h-24 bg-[#F9FAFB]">
            {images?.length ? (
              <AvatarImage
                src={images[0] || '/default-avatar.png'}
                alt="Profile"
              />
            ) : (
              <AvatarFallback className="text-4xl border">
                {name?.charAt(0) || 'SM'}
              </AvatarFallback>
            )}
          </Avatar>
          <CardTitle className="mt-2 text-xl font-semibold">
            {name || 'Not Provided'}
          </CardTitle>
          <p className="text-gray-500">{email || 'Not Provided'}</p>
          <div className="flex justify-center mt-2"></div>
        </CardHeader>

        <CardContent className="space-y-3 px-5">
          <div className=" p-5 grid grid-cols-1 bg-[#F9FAFB] rounded">
            <p className="flex items-center border-b py-3">
              <MdOutlinePhoneInTalk className="mr-2 text-lg" />
              <strong className="font-semibold">Phone:</strong>
              <span className="ml-1">{phone || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaCity className="mr-2" />
              <strong className="font-semibold">City: </strong>
              <span className="ml-1">{city || 'Not Provided'}</span>
            </p>
            <p className="flex border-b py-3">
              <IoLocationOutline className="mr-2 text-xl" />
              <strong className="font-semibold">Address:</strong>
              <span className="ml-1">{address || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <PiGraduationCapDuotone className="mr-2 text-lg" />
              <strong className="font-semibold">Education:</strong>
              <span className="ml-1">{education || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <MdOutlineWorkHistory className="mr-2" />
              <strong className="font-semibold">Job Title:</strong>
              <span className="ml-1">{jobTitle || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <MdHomeWork className="mr-2" />
              <strong className="font-semibold">Company:</strong>
              <span className="ml-1">{company || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <VscWorkspaceTrusted className="mr-2" />
              <strong className="font-semibold">Role:</strong>
              <span className="ml-1 capitalize">{role || 'User'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <HiOutlineStatusOnline className="mr-2" />
              <strong className="font-semibold">Status:</strong>
              <span className="ml-1 capitalize">{status || 'in-progress'}</span>
            </p>
            <p className="flex items-center py-3">
              <LuCalendarDays className="mr-2" />
              <strong className="font-semibold">Joined:</strong>
              <span className="ml-1">
                {createdAt
                  ? new Date(createdAt).toLocaleDateString()
                  : 'Fetching date...'}
              </span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaLinkSlash className="mr-2" />
              <strong className="font-semibold">Portfolio Link:</strong>
              <span className="ml-1">{portfolio || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaLinkedin className="mr-2" />
              <strong className="font-semibold">LinkedIn Profile:</strong>
              <span>{linkedInProfile || 'Not Provided'}</span>
            </p>
            <p className="flex items-center border-b py-3">
              <FaFacebook className="mr-2" />
              <strong className="font-semibold">Facebook Profile:</strong>
              <span className="ml-1">{facebookProfile || 'Not Provided'}</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewUserProfile;
