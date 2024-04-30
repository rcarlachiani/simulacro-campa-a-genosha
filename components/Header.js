function Header() {
    return (
        <div className='flex flex-col items-center mt-3 p-5'>
            <div className='flex items-center mb-4'>
                <img src="/images/snLogo.webp" alt="studio-logo" className='w-12 drop-shadow-lg ml-4 sm:mx-4' />
                <h1 className="font-Montserrat text-center leading-none text-white font-bold text-[22px] md:text-[30px] xl:text-[30px] xxl:text-[30px] py-4 drop-shadow-lg">
                    Audio y Tambor - Drum tracking studios
                </h1>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className="font-Montserrat text-center leading-none text-yellow font-bold text-[15px] md:text-[20px] xl:text-[20px] xxl:text-[20px] p-4 drop-shadow-lg">
                    Reservá tu turno aquí
                </h2>
                <img
                    src="../images/downarrow.svg"
                    className="max-w-[20px] drop-shadow-lg"
                    alt="icon arrow"
                />
            </div>
        </div>
    );
}

export default Header;