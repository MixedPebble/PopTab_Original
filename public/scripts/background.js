loadDefaultBackground();
document.getElementById("myDropdown").addEventListener("click",function(){
    chooseBackground();
});


function loadDefaultBackground() {
    var storageItems = browser.storage.local.get(null);
    storageItems.then((results) => {
        var bkg = results["defaultBackground"];
        if(bkg===null){
            setDefaultBackground("url('images/greyGrid.png')");            
        } else {
           document.body.style.background=bkg;
        }
    })
}

function setDefaultBackground(backgroundChoice) {
    let contentToStore = {};
    contentToStore["defaultBackground"] = backgroundChoice;
    browser.storage.local.set(contentToStore);
    console.log("default saved");
}

function chooseBackground() {
    var newBackground = document.getElementById("myDropdown").value;
    if (newBackground === 'grey'){
        setDefaultBackground("url('images/greyGrid.png')");
    } else if (newBackground ==='customImage') {
        customImage();
    } else if (newBackground === 'solidColor') {
        solidColor();
    } else {
        setDefaultBackground(newBackground);


    }
    loadDefaultBackground()
}


function customImage(){
    /*
        TODO: 
        Choose file pops up. 
        User chooses image. 
        Image loads into background
        Issue so far: Difficulties getting drop-down menu to allow this option
    */
}

function solidColor() {
    /*
    TODO:
    color picker pops up.
    User chooses color
    Color loads into background.
    Issue so far: Difficulties getting drop-down menu to allow this option
    */
}