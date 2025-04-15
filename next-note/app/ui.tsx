'use client';

import EmptyNote from '@/components/EmptyNote';
import Header from '@/components/Header';
import NewNote from '@/components/NewNote';
import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import React, { useState } from 'react';

const notes = [
  {
    id: 1,
    title: '노트 1',
    content: '노트 내용 입니다 1',
  },
  {
    id: 2,
    title: '노트 2',
    content: '노트 내용 입니다 2',
  },
];

const UI = () => {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);

  return (
    <main className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen'>
      <Header />
      <div className='flex'>
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          notes={notes}
        />
        {isCreating ? (
          <NewNote setIsCreating={setIsCreating} />
        ) : activeNoteId ? (
          <NoteViewer note={notes.find((note) => note.id === activeNoteId)} />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
};

export default UI;
