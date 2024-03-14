// const axios = require("axios");
// const qs=require("qs");

// let button = document.getElementById("runBtn");
// const handleClick = ()=>{
//     console.log("Button was clicked");
//     let editor = document.getElementById("realTimeEditor");
//     let codeWritten = editor.getValue();
//     let option = document.getElementById("langSelect").value;
//     let input = document.getElementById("inputText").getValue();
//     let output = document.getElementById("outputText");

//     let data = qs.stringify({
//         "code":{codeWritten},
//         "language":{option},
//         "input":{input}
//     });

//     let config = {
//         method:'POST',
//         url:"https://api.codex.jaagrav.in",
//         headers:{
//             'Content-Type':'application/x-www-form-urlencoded'
//         },
//         data:data
//     };
//     axios(config).then(function(res){
//         output.setValue(JSON.stringify(res.data.output));;
//     }).catch(function(err){
//         console.log("Some error occured");
//     });
// }

// export default handleClick;