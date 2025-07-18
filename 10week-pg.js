"use strict";

// function for our list view
async function getAllRecords() {
  let getResultElement = document.getElementById("content");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pateLlLL3Evj5n668.64959c94a1466678bd5b8bc0f9dbaba961781766c4b2095e6364552540d9b739`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app9L5qBODy38EOQj/10-week-coding?&view=order`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      getResultElement.innerHTML = ""; // clear brews

      let newHtml = "";

      for (let i = 0; i < data.records.length; i++) {
        let deck = data.records[i].fields["Deck"]; // here we are getting column values
        let name = data.records[i].fields["Name"];
        let thumbnail = data.records[i].fields["Thumbnail"];
        let homework = data.records[i].fields["Homework"];
        let articles = data.records[i].fields["Articles"];
        let embedDeck = data.records[i].fields["EmbedDeck"];
        let disabled = data.records[i].fields["Disabled"];

        newHtml += `
        <div class="carousel-item">
        
         <div class="card weeks mx-auto">
${
  thumbnail
    ? `<img class="card-img-top thumbs" alt="${deck}" src="${thumbnail[0].url}">`
    : ``
}  
        
        <div class="card-body">
    <h5 class="card-title time">${deck}</h5>
    <p class="card-text"><i class="fa-solid fa-file-code fa-2x"></i></p>
    <a href="10week-pg.html?id=${
      data.records[i].id
    }" class="btn btn-primary hovered ${disabled}">${name}</a>
</div>
</div>        
     </div> 
    
    
        `;
      }

      getResultElement.innerHTML = newHtml;
    });
}

// changes the comma in the string into a list item <li>
function formattedString(value) {
  return value.split(",").join("<li>");
}

// function to remove carousel in detail view
function myFunction() {
  let x = document.getElementById("hide");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

//function for the dropdown menu
async function dropdown() {
  let dropdown = document.getElementById("menu");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pateLlLL3Evj5n668.64959c94a1466678bd5b8bc0f9dbaba961781766c4b2095e6364552540d9b739`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app9L5qBODy38EOQj/10-week-coding?&view=order`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is an object w/ .records array

      dropdown.innerHTML = "";

      let otherHtml = "";
      for (let i = 0; i < data.records.length; i++) {
        let name = data.records[i].fields["Name"];
        let disabled = data.records[i].fields["Disabled"];

        otherHtml += `
    <li>
                <a
                  class="dropdown-item ${disabled}"
                  <a href="10week-pg.html?id=${data.records[i].id}">&lt; ${name} &gt;</a
                >
              </li>
               <li><hr class="dropdown-divider" /></li>
    `;

        dropdown.innerHTML = otherHtml;
      }
    });
}

// function for our detail view
async function getOneRecord(id) {
  let getResultElement = document.getElementById("curriculum");

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer pateLlLL3Evj5n668.64959c94a1466678bd5b8bc0f9dbaba961781766c4b2095e6364552540d9b739`,
    },
  };

  await fetch(
    `https://api.airtable.com/v0/app9L5qBODy38EOQj/10-week-coding/${id}`,
    options
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // response is a single object

      let thumbnail = data.fields["Thumbnail"];
      let name = data.fields["Name"];
      let deck = data.fields["Deck"];
      let embedDeck = data.fields["EmbedDeck"];
      let homework = data.fields["Homework"];
      let resources = data.fields["Resources"];

      let newHtml = `
        <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
     <i class="fa-solid fa-folder-open fa-2x"></i> &nbsp &nbsp <strong>  ${name} - ${deck}</strong> 
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body top">
       ${embedDeck}
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      <i class="fa-solid fa-laptop-code fa-2x"></i> &nbsp &nbsp <strong>Homework</strong> 
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body hw">
        ${formattedString(homework)}
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      <i class="fa-solid fa-folder-plus fa-2x"></i> &nbsp &nbsp <strong>Additional Resources</strong>
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body hw">
        ${formattedString(resources)}
      </div>
    </div>
  </div>
</div>
      `;

      getResultElement.innerHTML = newHtml;
    });
}

// look up window.location.search and split, so this would take
// https://dmspr2021-airtable-app.glitch.me/index.html?id=receHhOzntTGZ44I5
// and look at the ?id=receHhOzntTGZ44I5 part, then split that into an array
// ["?id=", "receHhOzntTGZ44I5"] and then we only choose the second one
let idParams = window.location.search.split("?id=");
if (idParams.length >= 2) {
  // call function to hide carousel in detail view
  myFunction();
  // call function for the dropdown menu
  dropdown();
  // has at least ["?id=", "OUR ID"]
  getOneRecord(idParams[1]); // create detail view HTML w/ our id
} else {
  // call function for the dropdown menu
  dropdown();
  // call function to display list view
  getAllRecords(); // no id given, fetch summaries
}
