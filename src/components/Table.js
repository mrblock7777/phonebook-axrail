import React from 'react'
import { DefaultButton } from '@fluentui/react'
import './css/Table.css';
function TableContent({ column, row }) {
    switch (column.type) {
        case 'action':
            return row[column.fieldName].map(action => (
                <DefaultButton onClick={() => action.action(row._id)} key={action.name} className={action.color}>
                    {action.name}
                </DefaultButton>
            ))
        default:
            return <>{row[column.fieldName]}</>
    }
}
export default function Table({ rows, columns }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column.key}>{column.name}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map(row => (
                    <tr key={row._id}>
                        {columns.map(column => (
                            <td key={column.key}>
                                <TableContent column={column} row={row}/>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
