'use client';

import EmptyNote from '@/components/EmptyNote';
import Header from '@/components/Header';
import NewNote from '@/components/NewNote';
import NoteViewer from '@/components/NoteViewer';
import Sidebar from '@/components/Sidebar';
import { Database } from '@/types_db';
import { supabase } from '@/utils/supabase';
import React, { useEffect, useState } from 'react';

const UI = () => {
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [notes, setNotes] = useState<
    Database['public']['Tables']['note']['Row'][]
  >([]);

  const fetchNotes = async () => {
    const { data, error } = await supabase.from('note').select('+');

    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

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
