//connect to our cohort workshop API_URL
const COHORT = "2309-FTB-ET-WEB-PT";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

//establish state
const state = {
    events: [],
};

//set up references
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
          <time datetime ="${new Date(event.date).toString()}"></>
          <h3>Location: ${event.location}</h3>
          <h3>Date/Time: ${new Date(event.date).toString()}</h3>
          <p>${event.description}</p>
        `;
        //add delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        eventInfo.append(deleteButton);
        //add event listener for button click
        deleteButton.addEventListener("click", () =>{
            deleteEvent(event.id)
        });
        addEventForm.reset();
        return eventInfo;
      });
      eventList.replaceChildren(...eventInformations);
}

//ask API to create new event based on form data
async function addEvents(e) {
    e.preventDefault();
    try{
      const response = await fetch (API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({ 
          name:addEventForm.name.value,
          description: addEventForm.description.value,
          date: new Date(addEventForm.date.value).toISOString(),
          location: addEventForm.location.value,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to locate event.");
      }
  
      render();
  
    } catch(error) {
      console.error(error);
    }
  
  }

//ask API to delete event based on button click
async function deleteEvent(id) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to locate event.");
          }

        render();
    } catch(error) {
      console.error(error);
    }
}