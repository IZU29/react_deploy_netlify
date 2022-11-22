import react from 'react'
export default function Search(props){
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
            <input 
            className="search"
            placeholder='Search'
            onChange={(e) => props.setSearch(e.target.value)}
            /> 
            </form>
        </div>
    )
}