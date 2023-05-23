/**
 * Bouwfase: reload automatisch lokale pagina (20230522)
 */ 

const itv = 5 * 1000;  
let timerId = setInterval(chkUpdate, itv);

function chkUpdate() {
  fetch("http://localhost:3000/reload").then((res) => {
    if (res.status == 200)
      document.location.reload();
    
  }).catch((err) => { // Geen localhost, publicatie-fase?
    clearTimeout(timerId);
  });
}
/**
 * Deze werkt niet, reageert te vroeg? (style en images moeten nog laden)
 */
document.addEventListener("DOMContentLoaded", function (event) {
  var scrollpos = localStorage.getItem('scrollpos');
  if (scrollpos) {
      window.scrollTo(0, scrollpos);
      localStorage.removeItem('scrollpos');
  }
});
document.addEventListener("beforeunload", function (e) {
  localStorage.setItem('scrollpos', window.scrollY);
});