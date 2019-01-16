document.getElementById("openSettings").addEventListener("click",function(){
    openNav();
});
document.getElementById("closeSettings").addEventListener("click",function(){
    closeNav();
});
function openNav(){
    document.getElementById("mySettings").style.width = "325px";
}

function closeNav(){
    document.getElementById("mySettings").style.width = "0";
}
