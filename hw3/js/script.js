document.querySelector("#searchForm").addEventListener("submit", searchCharacter);



async function searchCharacter(event) {
    event.preventDefault();
    
    let characterName = document.querySelector("#characterName").value;

    if(characterName.trim() === "") {
        alert("Please enter the character name.");
        return;
    }

    let url = `https://rickandmortyapi.com/api/character/?name=${encodeURIComponent(characterName)}`;

    let response = await fetch(url);
    let data = await response.json();

    if(!response.ok) {
        document.querySelector("#results").textContent = 
            "No such character exists. Please try again."
        return;
    }

    console.log(data);
    document.querySelector("#results").innerHTML = `
        <h2>${data.results[0].name}</h2>
        <img src="${data.results[0].image}" alt="Character image">
        <p>Species: ${data.results[0].species}</p>
        <p>Status: ${data.results[0].status}</p>
    `;
}