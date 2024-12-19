import AppointmentForm from '@/components/forms/AppointmentForm';
import PatientForm from '@/components/forms/PatientForm';
import LogoFull from '@/components/LogoFull';
import { GetPatient } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const Appointment = async ({ params: { userId } }: { params: { userId: string } }) => {

  const patient = await GetPatient(userId)
  if (!patient) redirect("/")

  return (
    <div className='flex h-screen max-h-screen'>

      <section className='remove-scrollbar container  my-auto'>
        <div className='sub-container max-w-[496px] '>


          <div className='mb-12'>
            <Link href={"/"}>
              <LogoFull height={35} width={35} />
            </Link>
          </div>

          <AppointmentForm type="create" userId={userId} patientId={patient.$id} />

          <div className='text-14 mt-14 pb-3 flex justify-between items-center'>
            <p className='text-dark-600  xl:text-left'>©{new Date().getFullYear()} SyncCare</p>
          </div>

        </div>
      </section>

      <Image
        src={"/assets/images/appointment-img.png"}
        alt='appointment'
        width={1000}
        height={1000}
        className='side-img max-w-[390px] bg-bottom'
      />
    </div>
  );
}

export default Appointment;
