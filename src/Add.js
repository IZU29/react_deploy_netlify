import react from 'react'
import { FaPlus } from 'react-icons/fa'
export default function Add(props){
    return(
        <form onSubmit={props.submit}>
        <div className='additem'>
            
            <input 
                type='text'
                className='add'
                placeholder='Add Item'
                value={props.newitem}
                onChange={(e) => props.setNewitem(e.target.value)}
            />
            <button>
            
            <FaPlus 
            className='plus'
            
            />
            </button>
        </div>
        </form>
    )
}