import react from 'react'
import FaTrash, { FaTrashAlt } from 'react-icons/fa'
export default function Content(props){
    return (
        props.values.map(list => (<li
        key={list.id}
        className='list'
        >
        <input 
        className='check-box'
        type='checkbox'
        onChange={() => props.change(list.id)}
        />
        <label 
        onDoubleClick={() => props.change(list.id)}
        style={list.checked ? {textDecoration : 'line-through' } : null}>{list.value}</label>
        <FaTrashAlt
        className='trash'
        onClick={() => props.delete(list.id)}
        />

    </li>))
    )
}