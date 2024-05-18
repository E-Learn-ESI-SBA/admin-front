
export const getRedirectUrl =async  () => {
    const res = await fetch("http://localhost:3000/api/permit")
    try {
        const body  = await res.json()
        return body as {url:string}
    }catch (e) {
        console.log("Error",e)
    }
}