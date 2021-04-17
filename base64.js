const base64 ={
    encode:function(str){
        return (Buffer.from(encodeURIComponent(str)).toString('base64'));
    },
    
    decode:function(str){
        return decodeURIComponent(Buffer.from(str, 'base64').toString());
    },

};
module.exports = base64;