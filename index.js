//connect to our cohort workshop API_URL
const COHORT = "2309-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//establish state
const state = {
    events: [],
};

//set up references
//correct all names
const eventList = document.querySelector("#events");
const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvents);

//sync state with API and render
async function render() {
    await getEvents();
    renderEvents();
  }
render();

//update event list with API
async function getEvents(){
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
    } catch (error) {
        console.error(error);
    }
}

//render events from state
function renderEvents() {
    if (!state.events.length){
        eventList.innerHTML = `<li>No event information available.</li>`;
        return;
      }
      const eventInformations = state.events.map((event) => {
        const eventInfo = document.createElement("li");
        eventInfo.classList.add("event");
        eventInfo.innerHTML = `
          <h2>${event.name}</h2>
          <time datetime="${event.datetime}">
          <h3>${event.location}</h3>
          <p>${event.description}</p>
        `;
        return eventInfo;
      });
      eventList.replaceChildren(...eventInformations);
}

//ask API to create new event based on form data

//ask API to delete event based on button click