document.addEventListener("DOMContentLoaded", loadStates);

document.querySelector("#zip").addEventListener("change", displayCity);

async function displayCity() {

    // alert(document.querySelector("#zip").value);



  try {
      let zipCode = document.querySelector("#zip").value;

      let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

      let response = await fetch(url);
      let data = await response.json();

      if (data === false) {
        document.querySelector("#city").textContent = "Zip code not found";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        return;
      }

      document.querySelector("#city").textContent = data.city;
      document.querySelector("#latitude").textContent = data.latitude;
      document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
      document.querySelector("#city").textContent = "Unable to retrieve city";
        onsole.error(error);
    }

}

async function loadStates(){
  let stateMenu = document.querySelector("#state");

  stateMenu.textContent = "";

  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  stateMenu.appendChild(defaultOption);

  try {
    let url = "http://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    for(let items of data) {
      let option = document.createElement("option");
      option.value = items.usps;
      option.textContent = items.state;
      stateMenu.appendChild(option);
    }
  } catch (error){
    console.error(error);

    stateMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load states";
    stateMenu.appendChild(errorOption);
  }

}