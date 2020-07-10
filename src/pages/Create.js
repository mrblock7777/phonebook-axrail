import React, { useState } from 'react'
import { Text, TextField, PrimaryButton, DefaultButton } from '@fluentui/react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import '../assets/css/Create.css';

export default function Create() {
    let [name, setName] = useState('');
    let [number, setNumber] = useState('');
    let [errorMessage, setErrorMessage] = useState('');
    let router = useHistory();

    const createPhonebook = async () => {
        let phonebook = {
            name: name,
            phone_number: number
        }
        try {
            await axios.post('api/create', phonebook);
            router.push('/')
        } catch (e) {
            setErrorMessage('Name and Phone Number are required')
        }

    }
    return (
        <div className="create-layout">
            <div className="card">
                <Text variant="xxLarge">Create Phonebook</Text>
                <div className="form">
                    <TextField label="*Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="*Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <p className="error-message">{errorMessage}</p>
                <div>
                    <PrimaryButton className="create-phonebook" onClick={createPhonebook}>Create Phonebook</PrimaryButton>
                    <Link to="/">
                        <DefaultButton>Cancel</DefaultButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
