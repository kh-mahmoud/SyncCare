import LogoFull from '@/components/LogoFull';
import { Button } from '@/components/ui/button';
import { Doctors } from '@/constants';
import { GetAppointment } from '@/lib/actions/appointment.action';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';


const Success = async ({ searchParams: { appointmentId }, params: { userId } }: { searchParams: { appointmentId: string }, params: { userId: string } }) => {

    const appointment = await GetAppointment(appointmentId)
    if (!appointment) redirect("/")

    const doctor = Doctors.find((doc) => doc.name === appointment.primaryPhysician)

    return (
        <div className={"flex h-screen max-h-screen px-[5%]"}>
            <div className='success-img'>
                <div className='mb-12'>
                    <Link href="/">
                        <LogoFull height={35} width={35} />
                    </Link>
                </div>

                <section className={"flex flex-col items-center"}>
                    <Image
                        src={"/assets/gifs/success.gif"}
                        height={300}
                        width={280}
                        alt='success'
                        className=''
                    />


                    <h2 className={"header mb-6 max-w-[600px] text-center"}>
                        your <span className='text-green-500'>appointment request</span> has been succefully submitted!
                    </h2>

                    <p>We'll be in touch shortly to confirm.</p>
                </section>

                <section className='request-details'>
                    <p>Request appointment details:</p>
                    <div className='flex items-center gap-3'>
                        <Image
                            src={doctor?.image!}
                            width={100}
                            height={100}
                            alt='doctor'
                            className='size-6'
                        />

                        <p>Dr. {doctor?.name}</p>
                    </div>

                    <div className='flex gap-2'>
                        <Image
                            src={"/assets/icons/calendar.svg"}
                            width={24}
                            height={24}
                            alt='calendar'
                        />

                        <p>{formatDateTime(appointment.schedule).dateTime}</p>
                    </div>
                </section>

                <Button variant={"outline"} className='shad-primary-btn' asChild>
                    <Link href={`/patients/${userId}/new-appointment`}>
                        New Appointmnet
                    </Link>

                </Button>
                <p className='copyright'>© 2024 SyncCare</p>

            </div>
        </div>
    );
}

export default Success;
