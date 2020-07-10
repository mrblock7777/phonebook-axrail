import React, { useState, useEffect } from 'react'
import { Text, PrimaryButton, DetailsList, SelectionMode } from '@fluentui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../assets/css/List.css'


function ListTable({ phonebook }) {
    const columns = [
        {
            key: 'no',
            fieldName: 'no',
            name: 'No.',
            // minWidth: 50,
            maxWidth: 50,
        },
        {
            key: 'name',
            fieldName: 'name',
            name: 'Name',
            minWidth: 50,
            maxWidth: 1000,
            isResizable: true,
        },
        {
            key: 'number',
            fieldName: 'phone_number',
            name: 'Phone Number',
            isResizable: true,
        }
    ]
    return (
        <>
            <DetailsList
                selectionMode={SelectionMode.none}
                items={phonebook}
                columns={columns} />
        </>
    )
}
export default function List() {
    let [phonebook, setPhonebook] = useState([]);
    useEffect(() => {
        let source = axios.CancelToken.source();
        let isMounted = true;
        async function getPhonebook() {
            let response = await axios.get('api/list')
            if (isMounted) {
                let list = response.data.map((data, index) => {
                    data.no = index + 1;
                    return data
                })
                setPhonebook(response.data);
            }
        }
        if (isMounted) {
            getPhonebook();
        }
        return function () {
            source.cancel()
            isMounted = false;
        }
    })

    return (
        <div className="list-view">
            <Text variant="xxLarge">Phonebook List</Text>
            <div>
                <Link to="/create">
                    <PrimaryButton>Add Contact</PrimaryButton>
                </Link>
            </div>
            <div className="table">
                <ListTable phonebook={phonebook} />
            </div>
        </div>
    )
}
