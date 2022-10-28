let searchBar = document.getElementById("searchBar");
let bodyEl = document.querySelector("body");
let dropDownEpisode = document.getElementById("dropDown-episodes");
let dropDownShow = document.getElementById("dropDown-shows");

let allEpisodes;
let allShows;

function setup(){
  allShows = getAllShows();
  const showList = allShows.sort((showA, showB) =>{
    return showA.name < showB.name ? -1 : 1;
  });
  differentShowPopulate(showList);
  populateAllCards(showList);
}

window.onload = setup;

//level400 

 async function populateEpisodes(showId){
  let currentShowUrl = `https://api.tvmaze.com/shows/${showId}/episodes`;
  const response = await fetch(currentShowUrl);
   if (response.ok) {
     return response.json();
   }
   throw `${response.status} ${response.statusText}`;
}
//




//header 
function countShows(search){
  let countEpisodes = document.getElementById("count");
  let episodeList = all.Episodes.length;
  let searchLenght = search.length;
  countEpisodes.innerText = `showed ${searchLenght} / ${episodeList} Episodes`;
  return countEpisodes;
}
 function removeCountShow(){
  let countEpisodes = document.getElementById("count");
  countEpisodes.innerHTML = "";
  return countEpisodes;
 }

 // Seasons and Episodes  

 function displayEpisodes(episode){
  let episodeNumber = episode.number;
  let seasonNumber = episode.season;
  let episodeName = episode.name;

  if (episodeNumber < 10){
    episodeNumber = `0${episode.number}`;
  }
  if (seasonNumber < 10){
    seasonNumber = `0${episode.season}`;
  }
  if (episodeNumber || seasonNumber){
    return `S${seasonNumber} E${episodeNumber} -${episodeName}`;
  }else{
    return episodeName;
  }
 }

// Search Bar

searchBar.addEventListener("input", (e) => {
  e.preventDefault();
  let searchText = e.target.value.toLowerCase();
  let filteredShows = countEpisodes(searchText, allEpisodes);

  populateAllCards(filteredShows);
  countShows(filteredShows);
});

// Episode counter
function countEpisodes(searchInput, allEpisodes) {
  let totalEpisodesLength = allEpisodes.filter((episode) => {
    if (episode.summary != undefined){
      return(
        episode.name.toLowerCase().includes(searchInput) ||
        episode.summary.toLowerCase().includes(searchInput)
      );
       } else {
      return episode.name.toLowerCase().includes(searchInput)
    }
  });
  return totalEpisodesLength;
}

//level 300

// for single show
function singleShowPopulate(show){
  let options = document.createElement("option");
  options.setAttribute("value", show.id);

  options.innerHTML = show.name;
  return options;
}

// for all shows
function differentShowPopulate(allShows) {
  dropDownShow.appendChild(
    singleShowPopulate({name: "All-shows", id: "All-shows"})
  );
  allShows.forEach((show) => {
    let showSelection = singleShowPopulate(show);
    dropDownShow.appendChild(showSelection);
  });
}

// dropDown for show
dropDownShow.addEventListener("change", (e) => {
  let showValue = e.target.value;
  if(showValue === "All-shows"){
    populateAllCards(allShows);
    removeCountShow();
    differentEpisodePopulate([
      {
        name: "Selection required for show",
        id: "Selection required for show",
      },
    ]);
    searchBar.disabled = true;
    searchBar.Placeholder = "To enable search please select a show";

  }else{
    populateEpisodes(showValue).then((data) => {
      allEpisodes = data;

      populateAllCards(allEpisodes);
      countShows(allEpisodes);
      differentEpisodePopulate(allEpisodes);
      searchBar.disabled = false;
      searchBar.Placeholder = "";
    });
  }
});

// for single Episode
 function singleEpisodePopulate(episode){
  let options = document.createElement("options");
  options.setAttribute("value", episode.id);
  let title = displayEpisodes(episode);
  options.innerHTML = title;
  return options;
 }

// for different episodes 
 function differentEpisodePopulate(episode) {
  dropDownEpisode.innerHTML = ""

  allEpisodes.forEach((episode) => {
    let episodeSelection = singleEpisodePopulate(episode);
    dropDownEpisode.appendChild(episodeSelection);
  });
 }

//make another function. add eventlistener

//dropdown for episodes
dropDownEpisode.addEventListener("change", (e) => {
let episodeValue = e.target.value;
location.href = `#${episodeValue}`;
let value = document.getElementById(episodeValue);
value.classList.add("selectedItem");
setTimeOut(() => {
  value.classList.remove("selectedItem");

},1100);
})






 // Single Card
 function populateCard(element){
  let cardList = document.createElement("li");
  let cardTitle = document.createElement("h2");
  let cardImage = document.createElement("img");
  let pElement = document.createElement("p");
  let link = document.createElement("a");
  cardList.setAttribute = ("id", "element.id");
  cardList.setAttribute = ("class", "single-card");
  cardTitle.setAttribute = ("class", "card-title");
  cardTitle.innerHTML = displayEpisodes(element);
  cardImage.setAttribute = ("class","card-picture");
  cardImage.src = element.image ? element.image.medium : "";
  cardImage.alt  = `${element.name} cover picture`;
  pElement.setAttribute = ("class", "card-detail");
  pElement.innerHTML = element.summary;
  link.setAttribute = ("class", "pageLink");
  link.href = element.url;
  link.target = "_blank";
  link.innerHTML = "click to watch";
   cardList.appendChild(cardTitle);
   cardList.appendChild(cardImage);
   cardList.appendChild(link);
   cardList.appendChild(pElement);

return cardList;
 }

 function emptyCards(cardElement){
  cardElement.innerHTML = "";
 }

 //

 function populateAllCards(arr){
  let cardElement = document.getElementById("all-cards");
  emptyCards(cardElement);
  arr.forEach((element) =>{
    let li = populateCard(element);
    cardElement.appendChild(li);
  });
  cardElement.addEventListener("onClick", (e) => {
    console.log(e.target);
  });
 }