 document.addEventListener("DOMContentLoaded", () => {
     const urlParams = new URLSearchParams(window.location.search);
     const isFromSaved = urlParams.get("saved");
     const btnSave = document.getElementById("save");
     if (isFromSaved) {
         btnSave.style.display = 'none';
         getSavedTeamById();
     } else {
         var item = getTeamById();
     }
     btnSave.onclick = () => {
         console.log("Tombol FAB di klik.");
         item.then(team => {
             saveForLater(team);
         });
     };
 });