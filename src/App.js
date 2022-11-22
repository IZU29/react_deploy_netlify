import React from 'react'
import apiReq from './apiReq'
import Add from './Add'
import Search from './Search'
import Content from './Content'
export default function App() {
  const [newitem , setNewitem] = React.useState('') 
  const[values , setValues]= React.useState([])
  const [search , setSearch] = React.useState('')
  const [loading , setLoading] = React.useState(true)
  const [fetchError , setFetch] = React.useState('')
  async function Delete (id){
    const List = values.filter(item => item.id !== id)
    setValues(List)
    const newitem = List.filter(item => item.id !== id)
    const deleteOptions = {
      method: 'DELETE',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(newitem)
    }
    const apiDel = `${Apis}/${id}`
    await apiReq(apiDel , deleteOptions)
  }
  const Apis = 'http://localhost:3500/items' 
  React.useEffect(
    () => {async function lists(){
      try{
      const res = await fetch(Apis)
      if (!res.ok) throw Error('Did not Work')
      const List = await res.json()
      setValues(List)
      
      }
      catch (err){
        setFetch(err.message)
      }
      finally{
        setLoading(false)
        
      }
    }
    setTimeout( lists() , 2000 ) } , []
  )
 
 async function change(id){
    const List = values.map(item => item.id === id ? {... item , checked : !item.checked} : item)
    setValues(List)
    const myitem = List.filter( item => item.id === id)
    const updateOp = {
      method: 'PATCH',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({checked : myitem[0].checked })
    }
    const apiCheck = `${Apis}/${id}`
    await apiReq(apiCheck , updateOp)
  }
 async function addItem(items){
    const id = values.length ? values[values.length - 1].id + 1 : 1
    const Newitem = {id , checked: false ,  value:items}
    const List = [...values , Newitem ]
    setValues(List)
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(Newitem)
    }
  await apiReq(Apis , postOptions)
  }
  function submit(e){
    e.preventDefault()
    if(!newitem) return;
    addItem(newitem)
    setNewitem('')
  }
  
  
  // function search(){
    
  // }
  return(
    <div className='grocery-list'>
      <div className='head'><p>Groceries-List</p></div>
      <Add 
      newitem = {newitem}
      setNewitem = {setNewitem}
      submit = {submit}
      />
      <Search 
      search = {search}
      setSearch = {setSearch}
      />
      {fetchError && <p style={{textAlign: "center" , margin: "auto" , fontWeight: '700' ,color : 'red'}}>{fetchError}</p>}
      {loading &&  <p style={{textAlign: "center" , margin: "auto" , fontWeight: '700'}}>Loading Items ... </p>}
      {values.length ? (<ul>
       
        <Content 
    setValues={setValues}
    values={values.filter(value => ((value.value).toLowerCase()).includes(search.toLowerCase())  ) }
    change={change}
    delete={Delete}
        /> 
       
      </ul>) :!loading && !fetchError && <p style={{textAlign: "center" , margin: "auto" , fontWeight: '700'}}>Your List Is Empty !!!</p>}
      <footer className='footer'>{values.length}List Items</footer>
    </div>
  )
}


