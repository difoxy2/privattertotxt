//convert web novel to string
    var text = "";
    var pages = document.getElementsByClassName("honbun").length;
    var novaltitle = document.getElementsByClassName("lead")[0].innerHTML.replace(/\p{Emoji}/gu, '');
    var authorname = document.getElementsByClassName("col-md-4")[0].children[1].children[1].children[1].innerHTML.replace(/\p{Emoji}/gu, '');
    var authortwitteracc = document.getElementsByClassName("col-md-4")[0].children[1].children[0].children[0].children[1].innerHTML;
    var defulttilename = novaltitle + " by " + authorname + authortwitteracc;
    var novaldesc = "";
    if(typeof document.getElementsByClassName("col-md-8")[0].children[2].children[1] !== 'undefined'){
          novaldesc = document.getElementsByClassName("col-md-8")[0].children[2].children[1].innerText + "\n\n\n";
    }
   
    

    console.log("there are " + pages + " pages");

    for(var i=0; i<pages; i++){
        //text += "page" + i + "\n\n";
        text += document.getElementsByClassName("honbun")[i].innerText;
    }


    //var textnobr = text.replace(/<br>/g, "");
    //var textnobrnobrcs = textnobr.replace(/<\/span>/g, "").replace(/<span class=".*?">/g, "");

    //console.log(text);  
    //console.log(textnobrnobrcs);
    

//create the save button
dddisplayboxxx = document.createElement("button");
dddisplayboxxx.id = "dddisplayboxxx";
dddisplayboxxx.innerHTML = "<b>Save</b>";
dddisplayboxxx.addEventListener("click", save, false);
dddisplayboxxx.style.position = "fixed";
dddisplayboxxx.style.top = "60px";
dddisplayboxxx.style.left = "10px";
dddisplayboxxx.style.padding = "10px 24px";
dddisplayboxxx.style.background = "#0378a6";
dddisplayboxxx.style.color = "white";
dddisplayboxxx.style.border = "none";
dddisplayboxxx.style.fontSize = "20px";
dddisplayboxxx.style.borderRadius = "24px";
dddisplayboxxx.style.fontFamily = "Book Antiqua";
document.body.appendChild(dddisplayboxxx);
console.log("displaybox Created!");



//create the Send button
dddisplayboxxx = document.createElement("button");
dddisplayboxxx.id = "dddisplayboxxx";
dddisplayboxxx.innerHTML = "<b>Send</b>";
dddisplayboxxx.addEventListener("click", send, false);
dddisplayboxxx.style.position = "fixed";
dddisplayboxxx.style.top = "120px";
dddisplayboxxx.style.left = "10px";
dddisplayboxxx.style.padding = "10px 24px";
dddisplayboxxx.style.background = "#0378a6";
dddisplayboxxx.style.color = "white";
dddisplayboxxx.style.border = "none";
dddisplayboxxx.style.fontSize = "20px";
dddisplayboxxx.style.borderRadius = "24px";
dddisplayboxxx.style.fontFamily = "Book Antiqua";
document.body.appendChild(dddisplayboxxx);
console.log("displaybox Created!");




//send .txt to kindle via email
function send(){
    
var blob = new Blob([novaltitle, "\n\n", novaldesc, text], {type: "text/plain"});
    console.log(blob.text());
var url = URL.createObjectURL(blob);
    console.log(url);
chrome.runtime.sendMessage({blobURL: url, blobURLtitle: defulttilename},function(){console.log("blobURL SENT to background.js., txt will arrive kindle soon");});
    
}


//download converted privatter novel as .txt file, 
function save(){

    var blob = new Blob([novaltitle, "\n\n", novaldesc, text], {type: "text/plain"});
    console.log(blob.text());
    var url = URL.createObjectURL(blob);
    console.log(url);
    var anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = defulttilename;
    anchor.click();
    
}



/*//save converted string as txt file
async function save(){
    
  const options = {
    startIn: 'downloads',
    suggestedName: defulttilename,
    types: [
      {
        description: 'Text Files',
        accept: {
          'text/plain': ['.txt'],
        },
      },
    ],
  };
  const fileHandle = await window.showSaveFilePicker(options);
  
    
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();
  // Write the contents of the file to the stream.
  await writable.write(text);
  // Close the file and write the contents to disk.
  await writable.close();

}
*/

