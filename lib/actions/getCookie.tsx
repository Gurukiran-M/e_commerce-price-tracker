const getCookie = (name:string)=>{
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((row) => row.startsWith(name + "="));
    // return cookie ? cookie.split("=")[1] : null;
    if(cookie)
      return cookie.split("=")[1];
    else
      return "";
}

export default getCookie;