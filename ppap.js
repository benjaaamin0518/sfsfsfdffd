$( async function(){

    let _date;
    let _url;
    let n=0; 
    let _url2;
    let bool
    let r_length;
    let uuu;
    let title;
    let _title;
let flg=0;
//日付オブジェクトを作成する
let dd = new Date();
//「年」を取得する
let YYYY = dd.getFullYear();
//「月」を取得する
let MM = dd.getMonth()+1;
//「日」を取得する
    let _select;

 async function evo(){
    chrome.storage.sync.get(['date'], function (value) {
        value=value.date||[];
        console.log(value);
        _date=value;
      });
      chrome.storage.sync.get(['select'], function (value) {
        value=value.select||[];
        console.log(value);
        _select=value;

       });
           chrome.storage.sync.get(['url'], function (value) {
        value=value.url||[];
        console.log(value);
        _url=value;
        r_length=_url.length;
       });
       chrome.storage.sync.get(['title'], function (value) {
        value=value.title||[];
        console.log(value);
        _title=value;
       });


         ele = document.getElementById("holi");
         while (ele.firstChild) {
             ele.removeChild(ele.firstChild);
         }
         async function useURLFunc() {
            let sendMsgFunc = () => {
                return new Promise(resolve => {
                    chrome.runtime.sendMessage({ greeting: 'url' }, response => {
                        resolve([response.farewell,response.title]);
                    });
                });
            };
            let url = await sendMsgFunc();
            uuu=url[0];
            title=url[1];
        
        }
        await useURLFunc();

         
           const url=uuu;

         bool = _url.indexOf(url);
        //  alert(uuu);

         _url2 = url;
         let DD = dd.getDate();
         if (bool == -1) {
             if (url == "chrome://extensions/") {
                 $('#holi').append(` <br>
<div id="click-this0" data-url="${url}" >
<a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
${title}
  </a></div>`);
             }
             else {

                 $('#holi').append(` <br>
        <div id="click-this0" data-url="${url}" >
        <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> new &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${YYYY + "/" + MM + "/" + DD}</div>
        ${title}
          </a></div>`);
             }
         }
         else {
             flg = 1;
             let date = _date[bool];
             if (url == "chrome://extensions/") {
                let vx = "";
                switch (_select[bool]) {
                    case '0': vx = "とてもいい"; break;
                    case '1': vx = "いい"; break;
                    case '2': vx = "わっるい"; break;
                    case '3': vx = "とてもわっるい"; break;
                }

                 $('#holi').append(`<br>
        <div id="click-this0" data-url="${url}">
        <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple  horizontal label">${date}</div>
        ${_title[bool]}
          </a></div>`);
                 $(`input[value="${_select[bool]}"]`).prop('checked', true);
             } else {
                 let vx = "";
                 switch (_select[bool]) {
                     case '0': vx = "とてもいい"; break;
                     case '1': vx = "いい"; break;
                     case '2': vx = "わっるい"; break;
                     case '3': vx = "とてもわっるい"; break;
                 }
                 $('#holi').append(`<br>
        <div id="click-this0" data-url="${url}" >
        <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${date}</div>
        ${_title[bool]}
          </a></div>`);
                 $(`input[value="${_select[bool]}"]`).prop('checked', true);

             }
         }
 
}




  evo();

document.getElementById("hora").onclick=function(){
    //日付オブジェクトを作成する
let dd = new Date();
//「年」を取得する
let YYYY = dd.getFullYear();
//「月」を取得する
let MM = dd.getMonth()+1;
let DD = dd.getDate();
let year=YYYY-3;
let limit=new Date( year+ "/" + MM + "/" + DD);
let date;

    $(".message").show();
var foo_val = $("input[name='example1']:checked").val();
if(foo_val!=null){
    if(flg){
        _select[bool]=foo_val;
         date=new Date(_date[bool]);

        
    }else{
        _select[_select.length]=foo_val;
        _date[_date.length]= YYYY + "/" + MM + "/" + DD;
        _url[_url.length]=_url2;
        _title[_title.length]=title;
         date=new Date(YYYY + "/" + MM + "/" + DD);

        
    }
console.log(_select);
console.log(_date);
console.log(_url);
console.log(_title);

chrome.storage.sync.set({'select':_select} , function () {
});
chrome.storage.sync.set({'date':_date} , function () {
});
chrome.storage.sync.set({'url':_url} , function () {
});
chrome.storage.sync.set({'title':_title} , function () {
});
evo();
}
else{
    alert("正しく入力されていません");
}
$("#message").hide();
$("#success_message").show();
$("#success_message").fadeOut(4000);
let date_flg=0;
if(limit.getTime()>=date.getTime()){
date_flg=1;
}
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
        val:foo_val,date:date_flg
    },
    function(msg) {
//              console.log("result message:", msg);
    });
});

}
$('#search').on('input',function(){
    let res_url=[];
    n=0;
   let  ela = document.getElementById("hono");
    while (ela.firstChild) {
        ela.removeChild(ela.firstChild);
    }
	let value=$("#search").val();
    let vg=value.match(/^とてもいい\//);
    let g=value.match(/^いい\//);
    let b=value.match(/^わっるい\//);
    let vb=value.match(/^とてもわっるい\//);
    let ll=0;
    let vbn=-1;
    let pattern;
    let bcv;
    if(vg){
        bcv=value.replace(/^とてもいい\//,'');

        pattern= new RegExp(bcv, "gi");

        console.log(bcv);
        _title.forEach(ele=>{
            if(pattern.test(ele)&&_select[ll]==0){
                console.log(ele,pattern);
                vbn++;
                res_url[vbn]=_url[ll];
            }
            ll++;
        });
        
    }
    else if(g){
        bcv=value.replace(/^いい\//,'');

        pattern= new RegExp(bcv, "gi");


        _title.forEach(ele=>{
            if(pattern.test(ele)&&_select[ll]==1){
                console.log(ele,pattern);
                vbn++;
                res_url[vbn]=_url[ll];
            }
            ll++;
        });

    }
    else if(b){
        bcv=value.replace(/^わっるい\//,'');

        pattern= new RegExp(bcv, "gi");


        _title.forEach(ele=>{
            if(pattern.test(ele)&&_select[ll]==2){
                console.log(ele,pattern);
                vbn++;
                res_url[vbn]=_url[ll];
            }
            ll++;
        });

    }
    else if(vb){
        bcv=value.replace(/^とてもわっるい\//,'');

        pattern= new RegExp(bcv, "gi");


        _title.forEach(ele=>{
            if(pattern.test(ele)&&_select[ll]==3){
                console.log(ele,pattern);
                vbn++;
                res_url[vbn]=_url[ll];
            }
            ll++;
        });

    }
    else{
        pattern= new RegExp(value, "gi");

        _title.forEach(ele=>{
            if(pattern.test(ele)){
                console.log(ele,pattern);
                vbn++;
                res_url[vbn]=_url[ll];
            }
            ll++;
        });
    }
    let vl="";
res_url.forEach(e=>{

    let it=1;
let x=0;
    console.log(e);
    let vbf=0;
while(vbf==0){

    let i="click-this";
let vn=0;
    let vx="";
    switch(_select[x]){
        case '0':vx="とてもいい";break;
        case '1':vx="いい";break;
        case '2':vx="わっるい";break;
        case '3':vx="とてもわっるい";break;
    }
    if(r_length<x){
        vbf++;
    }
    else if((bool==x&&flg==1)||e!==_url[x]){
    
    }

    else{
     
        if(_url[x]=="chrome://extensions/"){
        vl+=`<br>
        <div id="${i+it}" data-url="${_url[x]}" >
        <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple horizontal label">${_date[x]}</div>
        ${_title[x]}
          </a></div>`;
          vbf++;
 it++;
    }
    else{
        vl+=`<br>
        <div id="${i+it}" data-url="${_url[x]}" style="">
        <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${_date[x]}</div>
        ${_title[x]}
          </a></div>`;
          vbf++;
 it++;
    }
    }
   x++;

}
n++;

          
  

});

$('#hono').append(vl);

let i="click-this";
	
        let set=document.getElementById("click-this"+n.toString());
        console.log(set);
        console.log(n);
        if(set!=='undefined'||set!==null){
    
            clearInterval(set_interval_id2);

            for(let v=0;v<=n;v++){
                let set=document.getElementById("click-this"+v.toString());

                    // console.log("#click-this"+v);    console.log(bool);
            $("#click-this"+v).on("click", function () {
                window.open(set.dataset.url);
     
    
            });
        }
        
      

    
        }});
var set_interval_id2;
var set_interval_id = setInterval(findTargetElement, 300);
function findTargetElement(){


let i="click-this0";

    let set=document.getElementById("click-this0");
    if(r_length){

        clearInterval(set_interval_id);
        console.log(r_length);   

        let vl="";
        // if(flg==1){
            let x=0;
        while(x<r_length){
            console.log(_url[x]);
            let i="click-this";
            let vx="";
            switch(_select[x]){
                case '0':vx="とてもいい";break;
                case '1':vx="いい";break;
                case '2':vx="わっるい";break;
                case '3':vx="とてもわっるい";break;
            }
            if(bool==x&&flg==1){
        
            }
            else{
                let it=x+1;
                if(_url[x]=="chrome://extensions/"){
                vl+=`<br>
                <div id="${i+it}" data-url="${_url[x]}" >
                <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui purple horizontal label">${_date[x]}</div>
                ${_title[x]}
                  </a></div>`;
            }
            else{
                vl+=`<br>
                <div id="${i+it}" data-url="${_url[x]}" style="">
                <a class="ui label" style="width:96vw;  overflow-wrap:break-word;"><i class="info circle icon"></i> ${vx} &nbsp;&nbsp;&nbsp;&nbsp; <div class="ui red horizontal label">${_date[x]}</div>
                ${_title[x]}
                  </a></div>`;
            }
            }
            x++;
            n++;
        
        }
        
        $('#hono').append(vl);
        
            set_interval_id2 =findTargetElement2();
          
        
    }
    else{


        

    }
}

function findTargetElement2(){


    let i="click-this";

        let set=document.getElementById("click-this"+n.toString());
        console.log(set);
        console.log(n);
        if(set!=='undefined'||set!==null){
    
            clearInterval(set_interval_id2);

            for(let v=0;v<=n;v++){
                let set=document.getElementById("click-this"+v.toString());

                    // console.log("#click-this"+v);    console.log(bool);
            $("#click-this"+v).on("click", function () {
                window.open(set.dataset.url);
     
    
            });
        }
        
    
    
        }
        else{
    
    
            
    
        }
    }   

});

