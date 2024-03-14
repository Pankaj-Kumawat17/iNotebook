import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "6593dcd861100936f685ee35",
            "user": "659320b492b15607f21cfba6",
            "title": "My first note",
            "description": "Hello, this is my first note",
            "tag": "Special",
            "date": "2024-01-02T09:52:24.259Z",
            "__v": 0
        },
        {
            "_id": "65944b675f58795aff20f7d7",
            "user": "659320b492b15607f21cfba6",
            "title": "My second note",
            "description": "Hello, this is my second note",
            "tag": "Special",
            "date": "2024-01-02T17:44:07.936Z",
            "__v": 0
        },
        {
            "_id": "65944b725f58795aff20f7d9",
            "user": "659320b492b15607f21cfba6",
            "title": "My third note",
            "description": "Hello, this is my third note",
            "tag": "Special",
            "date": "2024-01-02T17:44:18.217Z",
            "__v": 0
        },
        {
            "_id": "65944b725f58795af20f7d9",
            "user": "659320b492b15607f21cfba6",
            "title": "My third note",
            "description": "Hello, this is my third note",
            "tag": "Special",
            "date": "2024-01-02T17:44:18.217Z",
            "__v": 0
        },
        {
            "_id": "65944b725f8795aff20f7d9",
            "user": "659320b492b15607f21cfba6",
            "title": "My third note",
            "description": "Hello, this is my third note",
            "tag": "Special",
            "date": "2024-01-02T17:44:18.217Z",
            "__v": 0
        },
        {
            "_id": "65944b725f58795aff2f7d9",
            "user": "659320b492b15607f21cfba6",
            "title": "My third note",
            "description": "Hello, this is my third note",
            "tag": "Special",
            "date": "2024-01-02T17:44:18.217Z",
            "__v": 0
        }
    ]

    const host = "https://inotebook-backend-9isk.onrender.com";

    const [notes, setnotes] = useState(notesInitial);

    //Get all notes
    const getNotes = async () => {
        // TODO: API CALL

        const response = await fetch(`${host}/api/notes/fetchAllNotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },

        });
        const json = await response.json();
        console.log(json);
        setnotes(json);
        // setNotes()
    }


    //Add a note
    const addNote = async (title, description, tag) => {
        // TODO: API CALL
        console.log("adding a new note");
        const response = await fetch(`${host}/api/notes/addNote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')

            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        setnotes(notes.concat(note));
        
        
    }

    //Delete a note
    const deleteNote = async (id) => {
        // TODO: API CALL

        const response = await fetch(`${host}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = response.json();
        console.log(json);
        console.log("Deleting the node");
        const newNotes = notes.filter((note) => { return note._id !== id });
        setnotes(newNotes);

    }

    //Edit a note
    const editNote = async (id, title, description, tag) => {
        // API CALL
        const response = await fetch(`${host}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        // LOGIC TO EDIT IN CLIENT
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }

        }
        setnotes(newNotes);
    }


    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    );

}

export default NoteState;