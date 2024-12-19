import RegisterForm from '@/components/forms/RegisterForm';
import LogoFull from '@/components/LogoFull';
import { GetUser } from '@/lib/actions/patient.actions';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';


const Register = async ({ params: { userId } }: { params: { userId: string } }) => {

    const user = await GetUser(userId)
    if (!user) redirect("/")

    return (
        <div className='flex h-screen max-h-screen'>

            <section className='remove-scrollbar container  my-auto'>
                <div className='sub-container max-w-[496px] '>

                    <div className='mb-12'>
                        <Link href={"/"}>
                            <LogoFull height={35} width={35} />
                        </Link>
                    </div>

                    <RegisterForm user={user} />


                    <div className='text-14 mt-14 pb-3 flex justify-between items-center'>
                        <p className='text-dark-600  xl:text-left'>©2024 SyncCare</p>
                    </div>

                </div>
            </section>

            <Image
                src={"/assets/images/register-img.png"}
                alt='patient'
                width={1000}
                height={1000}
                className='max-w-[50%] side-img'
            />
        </div>
    );
}

export default Register;
