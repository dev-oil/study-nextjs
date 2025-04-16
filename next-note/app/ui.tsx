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
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from('note')
      .select('+')
      .ilike('title', `%${search}%`);

    if (error) {
      alert(error.message);
      return;
    }
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [search]);

  return (
    <main className='bg-[url("/bg.jpg")] bg-cover bg-center h-screen'>
      <Header />
      <div className='flex'>
        <Sidebar
          activeNoteId={activeNoteId}
          setActiveNoteId={setActiveNoteId}
          setIsCreating={setIsCreating}
          search={search}
          setSearch={setSearch}
          notes={notes}
        />
        {isCreating ? (
          <NewNote
            fetchNotes={fetchNotes}
            setIsCreating={setIsCreating}
            setActiveNoteId={setActiveNoteId}
          />
        ) : activeNoteId ? (
          <NoteViewer
            note={notes.find((note) => note.id === activeNoteId)}
            setActiveNoteId={setActiveNoteId}
            fetchNotes={fetchNotes}
          />
        ) : (
          <EmptyNote />
        )}
      </div>
    </main>
  );
};

export default UI;
