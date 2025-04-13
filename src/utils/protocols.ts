import { URL } from "url";

const protocolChecker = (url:URL) => {
    if(url.protocol==="https:" || url.protocol==="http:"){
        return true;
    }else{
        return false;
    }
};

export default protocolChecker;