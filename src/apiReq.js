export default async function apiReq(api,optionObj,errMsg){
    try{
        const response = await fetch(api , optionObj)
        if(!response.ok) throw Error('Reload Page')
    }
    catch (err){
        errMsg = err.message
    }
    finally{
        return errMsg
    }
}