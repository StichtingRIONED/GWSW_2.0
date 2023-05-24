/**
 * Bouwfase: reload automatisch lokale pagina (20230522)
 */ 
const itv = 10 * 1000;  

//if (localStorage.getItem('scrollpos'))
//  window.hidden = true;

let timerId = setInterval(chkUpdate, itv);
setTimeout(scrollIt, 500); // Vertraag: laat document volledig laden

function chkUpdate() {
  fetch("http://localhost:3000/reload").then((res) => {

    if (res.status == 200) {
      localStorage.setItem('scrollpos', window.scrollY);
      document.location.hash = ""; // Verwijder hst-link
      document.location.reload();
    }
    
  }).catch((err) => { // Geen localhost, publicatie-fase?
    clearTimeout(timerId);
  });
}
function scrollIt() {
  const y = 350; // offset bij scrolling

  var scrollpos = localStorage.getItem('scrollpos');
  if (scrollpos) {
    window.scrollTo({ top: scrollpos - y, left: 0, behavior: "instant" });
    localStorage.removeItem('scrollpos');
  }
  //window.hidden = false;
}
/**
 * Deze werkt niet, reageert te vroeg? (style en images moeten nog laden)
 */
//document.addEventListener("DOMContentLoaded", function (event) {
//  scrollIt();
//});

/* niet nodig
document.addEventListener("beforeunload", function (e) {
  localStorage.setItem('scrollpos', window.scrollY);
});*/