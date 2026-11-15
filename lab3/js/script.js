loadStates();

document.querySelector("#zip").addEventListener("change", displayCity);

document.querySelector("#username").addEventListener("change", checkUsername);

document.querySelector("#signupForm").addEventListener("submit", validateForm);

document.querySelector("#state").addEventListener("change", loadCounties);

document.querySelector("#password").addEventListener("focus", suggestedPassword);

async function displayCity() {

    // alert(document.querySelector("#zip").value);

  try {
      let zipCode = document.querySelector("#zip").value;

      let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;

      let response = await fetch(url);
      let data = await response.json();

      if (data === false) {

        document.querySelector("#zipError").textContent = "Zip code not found";
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
        return;
      }

      // To clear errors when input is valid
      document.querySelector("#zipError").textContent = "";


      document.querySelector("#city").textContent = data.city;
      document.querySelector("#latitude").textContent = data.latitude;
      document.querySelector("#longitude").textContent = data.longitude;

    } catch (error) {
      document.querySelector("#city").textContent = "Unable to retrieve city";
        console.error(error);
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
    let url = "https://csumb.space/api/allStatesAPI.php";
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

async function checkUsername() {
    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        return false;
    }

    let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
    let response = await fetch(url);
    let data = await response.json();

    if (data.available) {
        usernameError.textContent = "Username available!";
        usernameError.style.color = "green";
        return true;
    } else {
        usernameError.textContent = "Username taken";
        usernameError.style.color = "red";
        return false;
    }
}

async function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    let username = document.querySelector("#username").value;
    let usernameError = document.querySelector("#usernameError");

    let password = document.querySelector("#password").value;
    let passwordError = document.querySelector("#passwordError");

    let passwordAgain = document.querySelector("#passwordAgain").value;

    usernameError.textContent = "";
    passwordError.textContent = "";

    if (username.length === 0) {
        usernameError.textContent = "Username required";
        usernameError.style.color = "red";
        isValid = false;
    } else {
        let usernameAvailable = await checkUsername();

        if (usernameAvailable === false) {
            isValid = false;
        }
    }

    if (password.length < 6) {
      passwordError.textContent = "Passwords must be at least 6 characters.";
      passwordError.style.color = "red";
      isValid = false;
    } else if (password !== passwordAgain) {
      passwordError.textContent = "Passwords do not match.";
      passwordError.style.color = "red";
      isValid = false;
    }

     if (isValid) {
      document.querySelector("#signupForm").submit();
    }
}

async function loadCounties(){

  let countyMenu = document.querySelector("#county");
  let selectedState = document.querySelector("#state").value;

  countyMenu.textContent = "";

  if (selectedState === "") {
    return;
  }

  let url = `https://csumb.space/api/countyListAPI.php?state=${selectedState}`;
  let response = await fetch(url);
  let data = await response.json();


  for (let item of data) {
    let option = document.createElement("option");

    option.value = item.county;
    option.textContent = item.county;

    countyMenu.appendChild(option);
  }
}

async function suggestedPassword() {
  let url = "https://csumb.space/api/suggestedPassword.php?length=8";

  let response = await fetch(url);
  let data = await response.json();
  
  document.querySelector("#suggestedPassword").textContent = "Suggested Password: " + data.password;

}