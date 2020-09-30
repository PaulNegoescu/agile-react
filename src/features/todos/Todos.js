import React, { useContext, useEffect, useState } from 'react'
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { useForm } from '../../hooks';
import { AuthContext } from '../auth/AuthContext';

const initialFormValues = {todo: ''};


export default function Todos() {
    const [todos, setTodos] = useState([]);
    const { bindInput, values } = useForm(initialFormValues);
    const { user } = useContext(AuthContext);
    const db = firebase.firestore();

    useEffect(() => {
        if(user) {
            db.collection("todos")
                .where("user", "==", user.uid)
                .onSnapshot((docs) => {
                    const todos = [];
                    docs.forEach((doc) => {
                        const todo = {...doc.data(), id: doc.id}
                        todos.push(todo);
                    });
                    setTodos(todos);
                    console.log(todos)
                });   
        }     
    }, [db, user]);

    async function handleClick() {
        try {
            const docRef = await db.collection("todos").add({
                title: values.todo,
                status: 'NOT_COMPLETED',
                user: user.uid,
            });
            
            console.log("Document written with ID: ", docRef.id);
        } catch(error) {
            console.warn("Error adding document: ", error);
        };
    }

    async function handleChange(todoId) {
        const todo = todos.find(todo => todo.id === todoId);
        const todoRef = db.collection("todos").doc(todoId);
        
        todo.status = todo.status === 'NOT_COMPLETED' ? 'COMPLETED' : 'NOT_COMPLETED'
        
        try {
            await todoRef.update({
                status: todo.status
            });

            console.log("Document successfully updated!");
        } catch(error) {
            // The document probably doesn't exist.
            console.warn("Error updating document: ", error);
        };

        setTodos([...todos]);
    }

    return (
        <div>
            <h1>Todos</h1>
            <div >
                <input className="form-control" {...bindInput('todo')} />
                <button className="btn btn-primary" onClick={handleClick}>Add Todo</button>
            </div>
            <br />
            { todos.map(todo => (
                <p key={todo.id}>
                    <label>
                        <input type="checkbox" checked={ todo.status === 'COMPLETED' } onChange={ () => handleChange(todo.id) } />
                        { todo.title }
                    </label>
                </p>
            )) }
        </div>
    )
}
