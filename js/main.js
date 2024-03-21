function toggleDarkMode() {
    var body = document.body;
    var button = document.getElementById("button-modo");

    if (body.classList.contains("dark-mode")) {
        body.classList.remove("dark-mode");
        button.textContent = "Ativar Modo Claro"; 
    } else {
        body.classList.add("dark-mode");
        button.textContent = "Ativar Modo Escuro"; 
    }
}

const fromText = document.querySelector("#fromText"),
      toText = document.querySelector("#toText"), 
      selectTag = document.querySelectorAll("select"),
      translateBtn = document.querySelector("#translateBtn"); 


selectTag.forEach((tag, langs) => {
    for (let country_code in countries) {      
        let selected = langs == 0 ? country_code == "en-GB" ? "selected" : "" : country_code == "hi-IN" ? "selected" : "";
        let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

translateBtn.addEventListener("click", () => {
    let text = fromText.value.trim(),
        translateFrom = selectTag[0].value, 
        translateTo = selectTag[1].value; 
    if(!text) return;
    toText.setAttribute("placeholder", "Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res => res.json()).then(data => {
        toText.value = data.responseData.translatedText;
        data.matches.forEach(data => {
            if(data.id === 0) {
                toText.value = data.translation;
            }
        });
        toText.setAttribute("placeholder", "Translation");
    });
});
