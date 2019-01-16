var inputTitle = document.querySelector('.new-note input');
var inputBody = document.querySelector('.new-note textarea');
var noteContainer = document.querySelector('.note-container');
var clearBtn = document.querySelector('.clear');
var addBtn = document.querySelector('.add');

addBtn.addEventListener('click',makeNewNote);
initialize();

function Note (title, context){
  //Note object to be stored and retreived from local database
  this.title = title;
  this.context = context;
}



function initialize(){
  //when the page loads, this will show all the notes in the DB
  let storageItems = browser.storage.local.get("usersNotes");
  storageItems.then((database) =>{
      for(let note of database.usersNotes){
        displayNote(note);

      }
  }, onError)
}

function rightClickNewNote(title,context){
  /*Same as makeNewNote() except:
    this does not invoke .then(displayNote(newNote));
    takes input from external source
   */


  //When the user adds a new note, this makes a new note then adds it to the database
  if (title.length<1 && context.length<1){
    //Don't make a new note if the user gave a blank input
    return;
  }
  let newNote = new Note(title,context);
  let storageItems = browser.storage.local.get("usersNotes");
  storageItems.then((database)=>{
    let usersNotes = database.usersNotes;
    usersNotes.push(newNote);
    browser.storage.local.set({usersNotes});
  }, onError).then(displayNote(newNote));
}


function makeNewNote(){
  //When the user adds a new note, this makes a new note then adds it to the database
  let title = inputTitle.value;
  let context = inputBody.value;
  if (title.length<1 && context.length<1){
    //Don't make a new note if the user gave a blank input
    return;
  }
  let newNote = new Note(title,context);
  let storageItems = browser.storage.local.get("usersNotes");
  storageItems.then((database)=>{
    let usersNotes = database.usersNotes;
    usersNotes.push(newNote);
    browser.storage.local.set({usersNotes});
  }, onError).then(displayNote(newNote));
}

function deleteNoteByPosition(pos){
  let storageItems = browser.storage.local.get("usersNotes");
  storageItems.then((database)=>{
    let usersNotes = database.usersNotes;
    //usersNotes.push(newNote);
    console.log(usersNotes);
    usersNotes.splice(pos,1);
    console.log(usersNotes);

    browser.storage.local.set({usersNotes});
  }, onError);
}

function onError(error) {
    console.log(error);
}

function displayNote(userNote){
  //I can probably use AngularJS here

  /* create note display box */
  var note = document.createElement('div');
  var noteDisplay = document.createElement('div');
  var noteH = document.createElement('h2');
  var notePara = document.createElement('p');
  var deleteBtn = document.createElement('button');
  var clearFix = document.createElement('div');

  note.setAttribute('class','note');

  noteH.textContent = userNote.title;
  notePara.textContent = userNote.context;
  deleteBtn.setAttribute('class','delete');
  deleteBtn.textContent = 'Delete note';
  clearFix.setAttribute('class','clearfix');

  deleteBtn.addEventListener('click',(e)=> {
    const evtTgt = e.target;
    var x = noteContainer.childElementCount;

    var c = noteContainer.children;
    for(i = 0;i<c.length;i++){

      if (c[i].textContent==evtTgt.parentNode.parentNode.textContent){
        //console.log(i);
        deleteNoteByPosition(i);
        evtTgt.parentNode.parentNode.parentNode.removeChild(evtTgt.parentNode.parentNode);
      }

    }
    //deleteBtn's parent is noteDisplay. noteDisplay's parent is note. note's parent is noteContainer.
  })


  noteDisplay.appendChild(noteH);
  noteDisplay.appendChild(notePara);
  noteDisplay.appendChild(deleteBtn);
  noteDisplay.appendChild(clearFix);

  note.appendChild(noteDisplay);
  noteContainer.appendChild(note);

  /* set up listeners for the update functionality */
  }
