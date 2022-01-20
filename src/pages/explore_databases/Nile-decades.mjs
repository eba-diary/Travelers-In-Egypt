/**
 * @fileoverview decades-list.js shows a list of decades and the publications detailing travels starting in those decades
 */
 import checkStatus from "./check-status.mjs";

 init();

 /**
  * Initialize the page by populating search options and activating the form
  */
 function init() {
   fetch("/api/decades")
     .then(checkStatus)
     .then(res => res.json())
     .then(decades => showDecades(decades));
 }

 /**
  * Show a list of decades and their publications. Each decade has its own table of publications.
  * @param {Object[]} decades decades to show
  */
 function showDecades(decades) {
   let allDecades = document.getElementById("decades");
   for (let decade of decades) {
     let decadeDisplay = document.getElementById("decade").content.cloneNode(true);
     let publicationTable = decadeDisplay.querySelector(".publications");

     let year = decade.decade;
     let decadeName = year + "0s";
     let decadeNameDisplay = decadeDisplay.querySelector(".decade-name");
     if (year === null) {
       decadeName = "Travel years unknown";
       publicationTable.querySelector("thead").remove();
     } else {
       let anchorName = "decade-" + decadeName;
       decadeNameDisplay.id = anchorName;
       let anchor = document.createElement("a");
       anchor.textContent = decadeName;
       anchor.href = "#" + anchorName;
       anchor.classList.add("index-link");
       document.getElementById("index").appendChild(anchor)
     }
     decadeNameDisplay.textContent = decadeName;

     addPublications(decade.publications, publicationTable);
     allDecades.appendChild(decadeDisplay);
   }
   document.getElementById("loadingmsg").remove();
 }

 /**
  * Shows a list of publications in a table
  * @param {Object[]}          publications  list of publications to add to the table
  * @param {HTMLTableElement}  table         table to add publications to
  */
 function addPublications(publications, table) {
   let tableBody = table.querySelector("tbody");
   for (let publication of publications) {
     let row = document.getElementById("publication").content.cloneNode(true);

     let title = row.querySelector(".title");
     title.href = "/publication?id=" + publication.id;
     title.textContent = publication.title;

     if (publication.canread === 1) row.querySelector(".readable").classList.remove("d-none");

     let authorList = row.querySelector(".author");
     for (let traveler of publication.travelers) {
       let author = document.createElement("li");
       author.textContent = traveler.name +
         (traveler.type === "Author" ? "" : ` (${traveler.type})`);
       authorList.appendChild(author);
     }

     row.querySelector(".travel-dates").textContent = publication.travel_dates;

     tableBody.appendChild(row);
   }
 }