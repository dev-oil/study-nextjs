'use client';

import { useState } from 'react';

const NewNote = ({ setIsCreating }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const onSave = async () => {
    // supabase에 노트 저장하기

    setIsCreating(false);
  };

  return (
    <div className='flex w-2/3 items-center justify-center'>
      <div className='flex flex-col gap-[20px] w-[90%] h-[80%] py-[30px] px-[20px] bg-white/25 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.17)] rounded-xl'>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type='text'
          className='px-[10px] py-[5px] bg-white/10 rounded-lg border border-white/50 font-bold'
          placeholder='제목을 입력하세요'
        />

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name=''
          id=''
          className='flex-1 px-[10px] py-[5px] bg-white/10 rounded-lg border border-white/50'
          placeholder='내용을 입력해주세요'
        ></textarea>

        <button
          className='py-[10px] rounded-lg border border-white/50 cursor-pointer bg-white/30 hover:bg-white/50 hover:text-black transition-all'
          onClick={() => onSave()}
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default NewNote;
