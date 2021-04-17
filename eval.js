const fs = require("fs");
const base64 = require("./base64.js");

const EngineEval = function(scriptString,data){

    var _______str_________="";

    const echo=function(string){
        _______str_________+=string;
    };
    const include=function(path){
        if(!fs.existsSync(path)){
            throw new Error("Include File \""+path+"\" file not found.");
        }

        var includeString=fs.readFileSync(path).toString();

        const albionEngine = require("./index.js");

        var _b=new albionEngine(includeString);

        var string=_b.convert();

        _______str_________+=string;
    }

    try{
        eval(scriptString);
    }catch(err){
        console.log(err);
    }

    this.getResponse=function(){
        return _______str_________;
    };

};
module.exports = EngineEval;