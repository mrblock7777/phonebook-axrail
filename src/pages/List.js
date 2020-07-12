import React, { useState, useEffect } from 'react'
import { Text, PrimaryButton, DefaultButton, DetailsList, SelectionMode, ShimmeredDetailsList, Dialog, DialogFooter, DialogType, Spinner, SpinnerSize } from '@fluentui/react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../assets/css/List.css'

function ButtonTypes({row}){
    switch(row.type){
        case 'link':
            return (
                <Link to={row.to}>
                    <DefaultButton>
                        {row.name}
                    </DefaultButton>
                </Link>
            )
        default:
            return(
                <DefaultButton onClick={() => row.action(row._id)} className={'btn btn-' + row.color}>
                    {row.name}
                </DefaultButton>
            )
    }
}
function renderItem(row, index, column) {
    switch (column.type) {
        case 'action':
            return row[column.fieldName].map(action => (
                <ButtonTypes row={action} key={action.name}/>
            ))
        default:
            return <>{row[column.fieldName]}</>
    }
}

function ListTable({ phonebook, isLoading }) {
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
            // minWidth: 50,
            maxWidth: 100,
            isResizable: true,
        },
        {
            key: 'number',
            fieldName: 'phone_number',
            name: 'Phone Number',
            maxWidth: 100,
            isResizable: true,
        },
        {
            key: 'action',
            type: 'action',
            fieldName: 'action',
            minWidth: 100,
            name: 'Action',
        },
    ]
    return (
        <>
            <ShimmeredDetailsList
                selectionMode={SelectionMode.none}
                onRenderItemColumn={renderItem}
                items={phonebook}
                columns={columns}
                enableShimmer={isLoading}
            />
        </>
    )
}
function DeletingState({ isDeleting }) {
    return isDeleting ? <Spinner size={SpinnerSize.small} /> : 'Delete'
}
function DeleteDialog({ dialogProps, closeDialog, action }) {
    let modalProps = {
        type: DialogType.normal,
        title: 'Delete Contact',
        subText: 'Are you sure you want to delete this contact?'
    }
    return (
        <Dialog
            hidden={!dialogProps.show}
            dialogContentProps={modalProps}
        >
            <DialogFooter>
                <PrimaryButton onClick={action} disabled={dialogProps.isLoading}>
                    <DeletingState isDeleting={dialogProps.isLoading} />
                </PrimaryButton>
                <DefaultButton onClick={closeDialog} disabled={dialogProps.isLoading}>Cancel</DefaultButton>
            </DialogFooter>
        </Dialog>
    )
}
export default function List() {
    let [phonebook, setPhonebook] = useState([]);
    let [loading, setLoading] = useState(false);
    let [currentId, setCurrentId] = useState('')
    let [dialog, setDialog] = useState({
        delDialog: {
            show: false,
            isLoading: false
        }
    });
    useEffect(() => {
        let source = axios.CancelToken.source();
        let isMounted = true;
        async function getPhonebook() {
            setLoading(true);
            let response = await axios.get('api/list')
            setLoading(false);
            if (isMounted) {
                let list = response.data.map((data, index) => {
                    data = {
                        ...data,
                        no: index + 1,
                        action: [
                            {
                                name: 'Delete',
                                color: 'danger',
                                type: 'button',
                                action: () => {
                                    setCurrentId(data._id);
                                    setDialog({ ...dialog, delDialog: { show: true } })
                                }
                            },
                            {
                                name: 'Edit',
                                type: 'link',
                                color: 'warning',
                                to: '/edit/' + data._id
                            }
                        ]
                    }
                    return data
                })
                setPhonebook(list);
            }
        }
        if (isMounted) {
            getPhonebook();
        }
        return function () {
            source.cancel()
            isMounted = false;
        }
    }, [])
    const deletePhonebook = async (id) => {
        setDialog({ ...dialog, delDialog: { isLoading: true } })
        await axios.delete('api/remove/' + id)
        let newPhonebook = phonebook.filter(contact => contact._id != id)
        setPhonebook(newPhonebook);
        setDialog({ ...dialog, delDialog: { show: false, isLoading: false } })
    }
    return (
        <div className="list-view">
            <Text variant="xxLarge">Phonebook List</Text>
            <div>
                <Link to="/create">
                    <PrimaryButton>Add Contact</PrimaryButton>
                </Link>
            </div>
            <div className="table">
                <ListTable phonebook={phonebook} isLoading={loading} />
            </div>
            <DeleteDialog
                dialogProps={dialog.delDialog}
                action={() => deletePhonebook(currentId)}
                closeDialog={() => setDialog({ ...dialog, delDialog: { show: false } })}
            />
        </div>
    )
}
