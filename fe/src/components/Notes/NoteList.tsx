import React, { useEffect, useState } from 'react';
import { getAllNotes } from '../../api/noteApi';
import { Note } from '../../types/Note';
import { NavLink } from 'react-router-dom';

const NoteList: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const notes = await getAllNotes();
                setNotes(notes);
            } catch (error) {
                console.error('Error fetching notes:', error);
            };
            setLoading(false);
        };

        fetchNotes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
    const getNoteBackgroundColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-red-100';
            case 'completed':
                return 'bg-green-100';
            default:
                return 'bg-gray-100';
        }
    };
    return (
        <>
            <div className="font-bold text-4xl bg-gray-300 w-full h-1/5 flex justify-center items-center">YOUR NOTES</div>
            <div className="bg-white flex h-4/5 overflow-x-auto">
                <ul id='note-list' className='flex w-full py-20 pl-20'>
                    {notes.map((note) => (
                        <li 
                        className={`${getNoteBackgroundColor(note.status)} rounded-lg p-4 m-4 w-[200px] flex-shrink-0`}
                        key={note._id}
                        >
                            <NavLink to={`/notes/${note._id}`} className='flex flex-col gap-10 h-full'>
                                <div className='font-bold text-xl text-center overflow-hidden truncate'>
                                    {note.title}
                                </div>
                                <p className='text-xl flex-1 overflow-hidden line-clamp-9' style={{ whiteSpace: 'pre-wrap' }} >
                                    {note.content}
                                </p>
                            </NavLink>
                        </li>
                    ))}
                    <li className='flex-shrink-0 w-[80px]'></li> {/* Add an empty li to provide padding at the end */}
                </ul>
            </div>
        </>
    );
};

export default NoteList;