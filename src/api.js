const BASE_URL = ' https://uikt6pohhh.execute-api.ap-northeast-2.amazonaws.com/dev/products'
export const GetList = async()=>{
    try{
        return await (await fetch(BASE_URL)).json
    }catch(error){
        console.log(error)
    }
}
export const GetItem = async (productId)=>{
    try{
        return await( await fetch(`${BASE_URL}/{productId}`)).json
    } catch (error){
        console.log(error)
    }
}