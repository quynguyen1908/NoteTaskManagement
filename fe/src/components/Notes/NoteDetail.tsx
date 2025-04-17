import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { getNoteById, updateNote, deleteNote } from "../../api/noteApi";
import { Note } from "../../types/Note";

const NoteDetail: React.FC = () => {
    const { id } = useParams();
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [status, setStatus] = useState<string>("pending");
    const [isChanged, setIsChanged] = useState<boolean>(false);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                if (id) {
                    const note = await getNoteById(id);
                    setNote(note);
                    setTitle(note.title);
                    setContent(note.content);
                    setStatus(note.status);
                }
            } catch (error) {
                console.error("Error fetching note:", error);
            }
            setLoading(false);
        };

        fetchNote();
    }, [id]);

    useEffect(() => {
        if (note) {
            setIsChanged(
                title !== note.title ||
                content !== note.content ||
                status !== note.status
            );
        }
    }, [title, content, status, note]);

    const handleSave = async () => {
        if (id && note) {
            try {
                await updateNote(id, title, content, status);
                navigate("/home/notes");
            } catch (error) {
                console.error("Error updating note:", error);
            }
        }
    };

    const handleDelete = async () => {
        if (id) {
            try {
                await deleteNote(id);
                navigate("/home/notes");
            } catch (error) {
                console.error("Error deleting note:", error);
            }
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
            <>
                <div className="font-bold text-4xl bg-gray-300 w-full h-1/5 flex justify-center items-center">
                    <input 
                        required
                        placeholder={note?.title}
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        maxLength={50}
                        className="h-20 w-full text-center"
                    />
                </div>
                <div className="flex flex-col items-center justify-center h-4/5">
                    <div className="w-full h-1/2 mb-4">
                        <textarea
                            required
                            placeholder={note?.content}
                            id="content"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            maxLength={100}
                            className="mt-1 ml-32 block w-5/6 h-full px-3 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl font-bold"
                        />
                    </div>
                    <div className="w-6/7 flex justify-between mt-10">
                        <div className="flex gap-4 items-center pl-9 w-auto">
                            <div className="text-xl font-bold">Status:</div>
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block px-3 py-2 border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-xl"
                            >
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-2 w-full">
                            <button 
                                id="btn-delete"
                                className="w-1/10 bg-red-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                                onClick={openModal}
                            >
                                Delete
                            </button>
                            <button 
                                id="btn-save"
                                className={`w-1/10 text-xl font-bold text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${isChanged ? 'bg-blue-700 hover:bg-blue-500 cursor-pointer' : 'bg-blue-300 cursor-not-allowed'}`}
                                onClick={handleSave}
                                disabled={!isChanged}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    contentLabel="Confirm Delete"
                    className="modal fixed inset-0 flex items-center justify-center"
                >
                    <div className="bg-white p-6 rounded-md shadow-lg border-2 border-gray-300">
                        <h2 className="text-2xl font-bold mb-4">Confirm Delete</h2>
                        <p className="mb-4">Are you sure you want to delete this note?</p>
                        <div className="flex justify-end gap-2">
                            <button 
                                id="btn-cancel-delete"
                                className="bg-gray-300 text-xl font-bold py-2 px-4 rounded-md hover:bg-gray-400"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button 
                                id="btn-confirm-delete"
                                className="bg-red-700 text-xl font-bold text-white py-2 px-4 rounded-md hover:bg-red-500"
                                onClick={() => {
                                    handleDelete();
                                    closeModal();
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            </>
        );
};

export default NoteDetail;