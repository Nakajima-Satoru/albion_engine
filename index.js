const fs = require("fs");
const EngineEval = require("./eval.js");
const base64 = require("./base64.js");

var daggerEngine=function(html){

    var tagStart="<%";

    var tagEnd="%>";

    this.setData=function(data){


    };

    this.convert=function(){

        var buff1=html.split(tagStart);

        var sepalateBuffer=[];

        sepalateBuffer.push({
            type:"text",
            content:buff1[0],
        });

        buff1.shift();

        for(var n=0;n<buff1.length;n++){
            var buff1a=buff1[n].split(tagEnd);
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
                // var content=(Buffer.from(encodeURIComponent(value.content)).toString('base64'));
                var content = base64.encode(value.content);
                scriptString+="echo(base64.decode(\""+content+"\"));\n";
            }
            else if(value.type=="script"){
                scriptString+=value.content+"\n";
            }

        }

        var _eval = new EngineEval(scriptString);

        var str=_eval.getResponse();

        return str;
    };

};

module.exports=daggerEngine;