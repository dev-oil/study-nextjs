'use client';

import { supabase } from '@/utils/supabase';
import { useEffect, useState } from 'react';

const NoteViewer = ({ note, setActiveNoteId, fetchNotes }) => {
  const [title, setTitle] = useState(note?.title);
  const [content, setContent] = useState(note?.content);
  const [isEditing, setIsEditing] = useState(false);

  const onEdit = async () => {
    const { data, error } = await supabase
      .from('note')
      .update({
        title,
        content,
      })
      .eq('id', note.id);

    if (error) {
      alert(error.message);
    }
    setIsEditing(false);
    fetchNotes();
  };

  const onDelete = async () => {
    const { data, error } = await supabase
      .from('note')
      .delete()
      .eq('id', note.id);

    if (error) {
      alert(error.message);
    }
    setIsEditing(false);
    setActiveNoteId(null);
    fetchNotes();
  };

  useEffect(() => {
    setTitle(note?.title);
    setContent(note?.content);
    setIsEditing(false);
  }, [note]);

  return (
    <div className='flex w-2/3 items-center justify-center'>
      <div className='flex flex-col gap-[20px] w-[90%] h-[80%] py-[30px] px-[20px] bg-white/25 backdrop-blur-md  border border-white/20 shadow-[0_8px_32px_0_rgba(255,255,255,0.17)] rounded-xl'>
        {isEditing ? (
          <>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type='text'
              className='px-[10px] py-[5px] text-xl bg-white/10 rounded-lg border border-white/50 font-bold'
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
          </>
        ) : (
          <>
            <h2 className='text-xl font-bold'>{title}</h2>
            <p>{content}</p>
          </>
        )}

        <div className='flex justify-end gap-[10px]'>
          {isEditing ? (
            <>
              <button
                onClick={() => onEdit()}
                className='flex-1 py-[10px] rounded-lg border border-white/50 cursor-pointer bg-white/30 hover:bg-white/50 hover:text-black transition-all'
              >
                저장
              </button>
              <button
                onClick={() => onDelete()}
                className='flex-1 py-[10px] rounded-lg border border-white/50 cursor-pointer bg-white/30 hover:bg-white/50 hover:text-black transition-all'
              >
                삭제
              </button>
            </>
          ) : (
            <button
              className='flex-1 py-[10px] rounded-lg border border-white/50 cursor-pointer bg-white/30 hover:bg-white/50 hover:text-black transition-all'
              onClick={() => setIsEditing(true)}
            >
              수정하기
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;
