import React, { useState, useEffect } from 'react'
import { Text, TextField, PrimaryButton, DefaultButton } from '@fluentui/react'
import { Link, useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

export default function Edit() {
    let [name, setName] = useState('');
    let [number, setNumber] = useState('');
    let [errorMessage, setErrorMessage] = useState('');
    let router = useHistory();
    let { id } = useParams();
    useEffect(() => {
        let isMounted = true
        async function getContact() {
            let response = await axios.get('api/retrieve/' + id);
            console.log(response);
            if (isMounted) {
                setName(response.data.name);
                setNumber(response.data.phone_number);
            }
        }
        if (isMounted) {
            getContact()
        }
        return function (){
            isMounted = false
        }
    }, [])
    const updatePhonebook = async () => {
        let phonebook = {
            name: name,
            phone_number: number
        }
        try {
            await axios.patch('api/update/' + id, phonebook);
            router.push('/')
        } catch (e) {
            setErrorMessage('Name and Phone Number are required')
        }

    }
    return (
        <div className="create-layout">
            <div className="card">
                <Text variant="xxLarge">Edit Phonebook</Text>
                <div className="form">
                    <TextField label="*Name" value={name} onChange={(e) => setName(e.target.value)} />
                    <TextField label="*Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} />
                </div>
                <p className="error-message">{errorMessage}</p>
                <div>
                    <PrimaryButton className="create-phonebook" onClick={updatePhonebook}>Update Phonebook</PrimaryButton>
                    <Link to="/">
                        <DefaultButton>Cancel</DefaultButton>
                    </Link>
                </div>
            </div>
        </div>
    )
}
