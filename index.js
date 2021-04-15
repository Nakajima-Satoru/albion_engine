const fs = require("fs");

var albionEngine=function(html){

    this.setData=function(data){


    };

    this.convert=function(){

        var buff1=html.split("<?node");

        var sepalateBuffer=[];

        sepalateBuffer.push({
            type:"text",
            content:buff1[0],
        });

        buff1.shift();

        for(var n=0;n<buff1.length;n++){
            var buff1a=buff1[n].split("?>");
            sepalateBuffer.push({
                type:"script",
                content:buff1a[0],
            });
            sepalateBuffer.push({
                type:"text",
                content:buff1a[1],
            });               
        }

        var scriptString="";
        for(var n=0;n<sepalateBuffer.length;n++){
            var value=sepalateBuffer[n];

            if(value.type=="text"){
                var content=(Buffer.from(encodeURIComponent(value.content)).toString('base64'));
                scriptString+="echo64(\""+content+"\");\n";
            }
            else if(value.type=="script"){
                scriptString+=value.content+"\n";
            }

        }

        var str=this._eval(scriptString);

        return str;
    };


    this._eval=function(_string){

        var _str="";

        var echo=function(string){
            _str+=string;
        };
        var echo64=function(string){
            string=decodeURIComponent(Buffer.from(string, 'base64').toString());
            if(string){
                _str+=string;
            }
        };
        var include=function(path){
            if(!fs.existsSync(path)){
                throw new Error("Include File \""+path+"\" file not found.");
            }

            var includeString=fs.readFileSync(path).toString();

            var _b=new albionEngine(includeString);

            var string=_b.convert();

            _str+=string;
        }

        try{
            eval(_string);
        }catch(err){
            console.log(err);
        }

        return _str;
    };

    this.base64={
        encode:function(str){
            return (Buffer.from(encodeURIComponent(str)).toString('base64'));
        },
    
        decode:function(str){
            return decodeURIComponent(Buffer.from(str, 'base64').toString());
        },
    };
    

};

module.exports=albionEngine;