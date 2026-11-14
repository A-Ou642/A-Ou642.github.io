document.querySelector("#zip").addEventListener("change", displayCity);

function displayCity() {
  alert(document.querySelector("#zip").value);
}