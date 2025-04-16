'use client';

const Sidebar = ({ notes, setIsCreating, activeNoteId, setActiveNoteId }) => {
  return (
    <div className='relative w-1/3 h-[calc(100vh-61px)] py-[20px] px-[10px] flex flex-col'>
      <div className='sticky top-0 z-10'>
        <button
          onClick={() => setIsCreating(true)}
          className='py-[5px] px-[10px] bg-white/25 backdrop-blur-md border border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] rounded-lg cursor-pointer hover:bg-white/35 transition-all'
        >
          ✚ 새로운 노트
        </button>
      </div>

      {/* 스크롤 되는 영역 */}
      <ul className='flex-1 overflow-y-auto py-[10px]'>
        {notes.map((note) => (
          <li key={note.id} className='border-b border-white/50'>
            <button
              onClick={() => {
                setActiveNoteId(note.id);
                setIsCreating(false);
              }}
              className={`${
                activeNoteId === note.id ? 'font-bold' : ''
              } w-full py-[10px] text-start cursor-pointer truncate text-lg hover:font-bold`}
            >
              {note.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
