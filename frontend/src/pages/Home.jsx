import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import NoteModel from "../components/NoteModel";
import NoteCard from "../components/NoteCard";
import axios from "axios";
import {toast} from 'react-toastify'

const Home = () => {
  const [isModelOpen, setModelOpen] = useState(false);
  const [filteredNotes, setFilterNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState(null);
  const [query,setQuery] = useState('');

  const fetchNotes = async () => {
    const token = localStorage.getItem("token");
    try {
      const { data } = await axios.get("http://localhost:5000/api/note",
        {headers:{
          Authorization: `Bearer ${token}`,
        }},
      );
      setNotes(data.notes);
    } catch (error) {
      console.log("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    setFilterNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase()) ||
        note.description.toLowerCase().includes(query.toLowerCase())
    )
    )
    
  }, [query,notes]);

  const closeModel = () => {
    setModelOpen(false);
    setCurrentNote(null); // Reset current note
  };

  const onEdit = (note) => {
    setCurrentNote(note);
    setModelOpen(true);
  };

  const addNote = async (title, description) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token missing");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
        toast.success('Note added successfully')  
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const deleteNote = async (id) =>{
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token missing");
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/note/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        toast.success('Note deleted successfully')
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  const editNote = async (id, title, description) => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Authorization token missing");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotes();
        closeModel();
        toast.success('Note edited successfully') 
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div>
      <Navbar setQuery={setQuery}/>

      <div className="px-4 pt-5 gap-6 grid grid-cols-1 md:grid-cols-4">
        {filteredNotes.length>0 ? filteredNotes.map((note) => (
          <NoteCard
            // key={note._id} // Added key prop for unique identification
            note={note}
            onEdit={onEdit}
            deleteNote={deleteNote}
          />
        )) : <p>No Notes</p>}
      </div>
      <button
        onClick={() => setModelOpen(true)}
        className="fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-3xl"
      >
        +
      </button>
      {isModelOpen && (
        <NoteModel
          closeModel={closeModel}
          addNote={addNote}
          currentNote={currentNote} // Pass currentNote to modal
          editNote={editNote}
        />
      )}
    </div>
  );
};

export default Home;
