//convert web novel to string
    var text = "";
    var pages = document.getElementsByClassName("honbun").length;
    var novaltitle = document.getElementsByClassName("lead")[0].innerHTML;
    var authorname = document.getElementsByClassName("col-md-4")[0].children[1].children[1].children[1].innerHTML;
    var authortwitteracc = document.getElementsByClassName("col-md-4")[0].children[1].children[0].children[0].children[1].innerHTML;
    var defulttilename = novaltitle + " by " + authorname + authortwitteracc;
    

    console.log("there are " + pages + " pages");

    for(var i=0; i<pages; i++){
        //text += "page" + i + "\n\n";
        text += document.getElementsByClassName("honbun")[i].innerText;
    }


    //var textnobr = text.replace(/<br>/g, "");
    //var textnobrnobrcs = textnobr.replace(/<\/span>/g, "").replace(/<span class=".*?">/g, "");

    console.log(text);  
    //console.log(textnobrnobrcs);
    

//create the save button
dddisplayboxxx = document.createElement("button");
dddisplayboxxx.id = "dddisplayboxxx";
dddisplayboxxx.innerHTML = "<b>Save</b>";
dddisplayboxxx.addEventListener("click", save, false);
dddisplayboxxx.style.position = "fixed";
dddisplayboxxx.style.top = "60px";
dddisplayboxxx.style.right = "10px";
dddisplayboxxx.style.padding = "10px 24px";
dddisplayboxxx.style.background = "#0378a6";
dddisplayboxxx.style.color = "white";
dddisplayboxxx.style.border = "none";
dddisplayboxxx.style.fontSize = "20px";
dddisplayboxxx.style.borderRadius = "24px";
dddisplayboxxx.style.fontFamily = "Book Antiqua";
document.body.appendChild(dddisplayboxxx);
console.log("displaybox Created!");




//download converted string as .txt file
function save(){
var blob = new Blob([text], {type: "text/plain"});
var url = URL.createObjectURL(blob);
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

