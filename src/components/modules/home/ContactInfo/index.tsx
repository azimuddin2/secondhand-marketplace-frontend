import { Card, CardContent } from '@/components/ui/card';
import havingQueriesImg from '@/assets/images/having-queries.png';
import phoneImg from '@/assets/images/phone.png';
import locationImg from '@/assets/images/location.png';
import Image from 'next/image';

const ContactInfo = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5 my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="rounded-2xl px-5">
          <CardContent className="py-6 px-4 flex flex-col gap-2">
            <Image src={havingQueriesImg} alt="Having Queries" />
            <h3 className="text-lg font-semibold mt-2">Having Queries?</h3>
            <p className="text-gray-500 text-sm">
              Save big this Black Friday with unbeatable deals on tech, home
              essentials,
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl px-5">
          <CardContent className="py-6 px-4 flex flex-col gap-2">
            <Image src={phoneImg} alt="Having Queries" />
            <h3 className="text-lg font-semibold mt-2">Call Us Today</h3>
            <p className="text-gray-500 text-sm">
              +000 1883 061967 <br />
              +000 1883 061967
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl px-5">
          <CardContent className="py-6 px-4 flex flex-col gap-2">
            <Image src={locationImg} alt="Having Queries" />
            <h3 className="text-lg font-semibold mt-2">Locate Us</h3>
            <p className="text-gray-500 text-sm">
              Save big this Black Friday with unbeatable deals on tech, home
              essentials,
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfo;
