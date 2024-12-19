import PatientForm from '@/components/forms/PatientForm';
import LogoFull from '@/components/LogoFull';
import PassKeyModal from '@/components/PassKeyModal';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Home = ({ searchParams: { admin } }: { searchParams: { admin: string } }) => {

  const isAdmin = admin && true


  return (
    <div className='flex h-screen max-h-screen'>
      {isAdmin && <PassKeyModal />}
      <section className='remove-scrollbar container  my-auto'>
        <div className='sub-container max-w-[496px] '>


          <div className='mb-12'>
            <Link href={"/"}>
              <LogoFull height={35} width={35} />
            </Link>
          </div>

          <PatientForm />

          <div className='text-14 mt-14 pb-3 flex justify-between items-center'>
            <p className='text-dark-600  xl:text-left'>©2024 SyncCare</p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>

        </div>
      </section>

      <Image
        src={"/assets/images/onboarding-img.png"}
        alt='patient'
        width={1000}
        height={1000}
        className='max-w-[50%] side-img'
      />
    </div>
  );
}

export default Home;
