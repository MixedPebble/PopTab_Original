
//save();
//browser.storage.local.clear();
//retrieve();


function Note (title, context){
    this.title = title;
    this.context = context;
}




function save(){
    //This overrides whatever was in userNotes
    usersNotes = [];
    var noteA = new Note("Delete Button", "See if I can find the documentation for this notes thing. Use it to get the delete button to work");
    var noteB = new Note("try 3", "try 4");
    
    usersNotes.push(noteA);
    usersNotes.push(noteB);
    browser.storage.local.set({usersNotes});
}


function retrieve(){
    //"usersNotes"
    var storageItems = browser.storage.local.get(null);//Promise pending
    storageItems.then((database) => { //promise fufilled
        console.log(storageItems);//Promise
        console.log(database);//Database (consisting solely of usersNotes because of the .get("usersNotes);)
        console.log(database.usersNotes);//Array with Note objects
        console.log(database.usersNotes[0]);//Array at position 0
        console.log(database.usersNotes[0].title);//Array at 0 title
        console.log(database.usersNotes[0].context);//Array at 0 context
        console.log(database.usersNotes[1].title);//Array at 1 title
        console.log(database.usersNotes[1].context);//Array at 1 context
    })

}