const textareaFrom = document.querySelector('#textareaFrom')
const textareaTo = document.querySelector('#textareaTo')
const bntTranslate = document.querySelector('#bntTranslate')
const selects = document.querySelectorAll('select')


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

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
     "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português",
}

selects.forEach((tag) => {
    for (let country in countries) {
        let selected
        if(tag.className.includes('selectFrom') && country == 'pt-BR' ) {
            selected = 'selected'
        } else if (tag.className.includes("selectTo") && country == 'en-GB') {
            selected = 'selected'
    }

    const option = `<option value="${country}" ${selected}>${countries[country]}</option>`

    tag.insertAdjacentHTML("beforeend", option)
    }   
})

bntTranslate.addEventListener("click", () => {
    if (textareaFrom.value) {
      loadTranslation()
    } else {
      textareaTo.value = ""
    }
  })

  function loadTranslation() {
    fetch(
      `https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`
    )
      .then((res) => res.json())
      .then((data) => {
        textareaTo.value = data.responseData.translatedText;
      })
  }