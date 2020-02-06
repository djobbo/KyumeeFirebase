import React, { useState, useEffect } from 'react';
import db from './firebase';

export default () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        db.collection('users').onSnapshot(snap => setUsers(snap.docs.map(doc => ({id: doc.id, ...doc.data()}))));
        db.collection('events').onSnapshot(snap => {
            debugger;
            setEvents(snap.docs.map(doc => ({id: doc.id, ...doc.data()})))
        });
    })
    
    return (
    <>
        <div>
            <h1>Users</h1>
            { users.map(user => (
                    <div key={user.id}>
                        <h2>{user.name}</h2>
                    </div>
                ))}
        </div>

        <div>
            <h1>Events</h1>
            { events.map(event => (
                    <div key={event.id}>
                        <h2>{event.name}</h2>
                    </div>
                ))}
        </div>
    </>
    )
}