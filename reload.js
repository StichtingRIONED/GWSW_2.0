/**
 * Bouwfase: reload automatisch lokale pagina (20230522)
 */
const itv = 2 * 1000; // Frequentie check op aanpassingen
const port = 3010; // Sync met server

let body = document.getElementById("body");
let timerId = setInterval(chkUpdate, itv);

if (localStorage.getItem('scrollpos')) {
  if (body) body.hidden = true; // Voorkom onrustige opbouw
  setTimeout(scrollIt, 500); // Vertraag: laat document volledig laden
}
function chkUpdate() {
  fetch(`http://localhost:${port}/reload`).then((res) => {

    if (res.status == 200) {
      localStorage.setItem('scrollpos', window.scrollY);
      document.location.hash = ""; // Verwijder hst-link
      document.location.reload();
    }

  }).catch((err) => { // Geen localhost, publicatie-fase? Stop update-check
    clearTimeout(timerId);
  });
}
function scrollIt() {
  const y = 0;  //350; // offset bij scrolling (bij hidden-body offset niet meer nodig)
  var scrollpos = localStorage.getItem('scrollpos');
  if (body) body.hidden = false; // Nu zichtbaar maken, anders werkt scroll niet
  window.scrollTo({ top: scrollpos - y, left: 0, behavior: "instant" });
  localStorage.removeItem('scrollpos');
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