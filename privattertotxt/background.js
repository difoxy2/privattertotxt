var currentSessionAccessToken;


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
            
        if(request.blobURL){
            console.log("received!");
            console.log(request.blobURL);
            
            //begin GmailAPI?? GoogleAPI??? gais??? authorizing stuff, generate an access token
            chrome.identity.getAuthToken({ 'interactive': true }, function(token,grantedScopes) {
            console.log(token);
            console.log(grantedScopes);
            chrome.storage.local.set({oauth2token: token}, function() {});
            var currentSessionAccessToken = token;
            var x = new XMLHttpRequest();
            x.open('GET','https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + currentSessionAccessToken);
            x.onload = function() {
                    console.log(x.response);
            };
            x.send();
            //end of begin authorizing stuff
                
                    
            //get book content as an arraybuffer via XMLHttpRequest GET from the book's blob link, then, pass arraybuffer to email sending function
            blobreq = new XMLHttpRequest;
            blobreq.open("get",request.blobURL);
            blobreq.responseType = 'arraybuffer';
            blobreq.onload = function() {           
                                //console.log(blobreq.response);
                                sendemail(blobreq.response, request.blobURLtitle, token);
                                };
            blobreq.send();   
                   
            })
            //end of begin arraybuffer, emailing stuff
    
        };  
        return true; //prevent some kind of garbage value error I don't understand
    }
    
);




//XMLHttpRequest POST request to GmailAPI
//Send email [or the email raw so to say] via a XMLHttpRequest POST request to GmailAPI
function sendemail(attachmentinbufferarray, attachmentfilename, accesstoken){
    
    var emailraw = makeemailraw(arrayBufferToBase64(attachmentinbufferarray), attachmentfilename);
    
    var z = new XMLHttpRequest();
    z.open(
        'POST',
        'https://gmail.googleapis.com/gmail/v1/users/me/messages/send?alt=json&access_token=' + accesstoken,
         {"raw": emailraw}
    );
    z.setRequestHeader('Authorization', 'Bearer/' + accesstoken);
    z.setRequestHeader('Accept', 'application/json');
    z.setRequestHeader('Content-Type', 'application/json');
    z.onload = function() {
        console.log(z.response);
     };
    z.send(JSON.stringify({"raw": emailraw}));
    
}



// making the email 'raw', contains email file attachment with a file name
// email 'raw' is a base64url encoded string of a MIME message
function makeemailraw(attahcmentinbase64, attachmentfilename) {
    var mime = 
    'MIME-Version: 1.0' + '\n' +
    'To: bigdk0900jp_63e9fe@kindle.com, bigdk0900@gmail.com' + '\n' +
    'Content-Type: multipart/mixed; boundary="00000000000026929205dc33b098"' + '\n' + '\n' +

    '--00000000000026929205dc33b098' + '\n' +
    'Content-Type: multipart/alternative; boundary="00000000000026929005dc33b096"' + '\n' + '\n' +

    '--00000000000026929005dc33b096' + '\n' +
    'Content-Type: text/plain; charset="UTF-8"' + '\n' + '\n' + 

    '\n' + '\n' +  
        
    '--00000000000026929005dc33b096'+ '\n' + 
    'Content-Type: text/html; charset="UTF-8"'+ '\n' + '\n' + 

    '<div dir="ltr"></div>'+ '\n' + '\n' + 

    '--00000000000026929005dc33b096--'+ '\n' + 
    '--00000000000026929205dc33b098'+ '\n' + 
    'Content-Type: text/plain; charset="UTF-8"; name="' + attachmentfilename + '.txt"'+ '\n' + 
    'Content-Disposition: attachment; filename="' + attachmentfilename + '.txt"'+ '\n' + 
    'Content-Transfer-Encoding: base64'+ '\n' + 
    'X-Attachment-Id: f_l1rjf52n0'+ '\n' + 
    'Content-ID: <f_l1rjf52n0>'+ '\n' + '\n' + 

    attahcmentinbase64 + '\n' + 
    '--00000000000026929205dc33b098--'
    
    return btoa(unescape(encodeURIComponent(mime)));
    }


function arrayBufferToBase64(buffer) {
    var binary = ''
    var bytes = new Uint8Array(buffer)
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[ i ])
    }
    return window.btoa(binary);
    }
    
    

