import { ButtonProps } from '@/types';
import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';



const SubmitButton = ({isLoading,className,children}:ButtonProps) => {
  return (
    <Button disabled={isLoading} type='submit' className={className??'shad-primary-btn w-full'}>
       {isLoading?(
            <div className='flex items-center gap-4'>
                 <Image
                   src={"/assets/icons/loader.svg"}
                   alt='loader'
                   width={24}
                   height={24}
                   className='animate-spin'
                 />
                 Loading ...
            </div>
       ):(
             <p>{children}</p>
       )}
    </Button>
  );
}

export default SubmitButton;