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

const funTrac = async(text, l1, l2) => {
  const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=${l1}|${l2}`
  const response = await fetch(url)
  const data = await response.json()

  return data
}

const getTraduction = async() => {
  const text = document.getElementById('textareaFrom').value
  let langs = document.getElementById('langs').value

  const traducao = document.getElementById('textareaTo')
}



