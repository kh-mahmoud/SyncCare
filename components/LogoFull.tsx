import Image from 'next/image';
import React from 'react';

const LogoFull = ({classes,height,width}:{classes?:string,height?:number,width?:number}) => {
    return (
        <div className='flex w-fit  gap-2 items-center cursor-pointer'>
            <Image
                src={"/assets/icons/logo-full.png"}
                alt='logo'
                height={height}
                width={width}
                className={classes?classes:""}
            />
            <p className='text-[1.2rem] font-semibold select-none'>SyncCare </p>
        </div>
    );
}

export default LogoFull;
