'use client';

const Header = () => {
  return (
    <header className='py-[10px] px-[20px] bg-white/25 backdrop-blur-md  border-b border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.17)]'>
      <div className='flex items-center'>
        <div className='w-[40px]'>
          <img src='/note.png' alt='' />
        </div>

        <span className='ml-[10px] font-bold'>My Note</span>
      </div>
    </header>
  );
};

export default Header;
