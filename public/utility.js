// sidenav menu stuff
function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
    document.getElementById("content").style.marginLeft = "250px";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("content").style.marginLeft= "0";
    document.body.style.backgroundColor = "cornflowerblue";
  }

// modal logic for whiteboard images
function wbModal(imgId){
    const modal = document.getElementById('wb-img-modal');
    const img = document.getElementById(imgId);
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt;
}

// closing modal logic 
function closeWbModal(){
    const modal = document.getElementById('wb-img-modal');
    modal.style.display = "none";

}