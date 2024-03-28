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

let fromText = document.querySelector("#fromText"),
    toText = document.querySelector("#toText"), 
    selectTag = document.querySelectorAll("select"),
    fromVoice = document.querySelector(".from")
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


fromText.addEventListener("keyup", () => {
  let inputValue = fromText.value.toLowerCase();
  if (inputValue.includes("alice")) {
      document.body.classList.add("alice-background");
  } else {
      document.body.classList.remove("alice-background");
  }
});

let recognition; 
let isRecording = false; 

function toggleRecording() {
    if (!isRecording) {
        startRecording();
        document.getElementById('toggleRecordingBtn').textContent = 'Parar Gravação';
    } else {
        stopRecording();
        document.getElementById('toggleRecordingBtn').textContent = 'Iniciar Gravação';
    }
    isRecording = !isRecording; 
}

function startRecording() {
    recognition = new webkitSpeechRecognition();
    recognition.lang = 'pt-PT';
    recognition.onresult = function(event) {
        let transcript = event.results[0][0].transcript;
        fromText.value = transcript;
        translateText(transcript);
    };
    recognition.start();
}

function stopRecording() {
    if (recognition) {
        recognition.stop();
    }
}

function reproduzirAudio() {
    let traducao = toText.value;
    let selectedLanguage = selectTag[1].value;

   
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(traducao);
        utterance.lang = selectedLanguage;
        window.speechSynthesis.speak(utterance);
    } else {
        console.error('API de Síntese de Fala não suportada neste navegador');
    }
}

fromText.addEventListener('input', function() {
    let inputValue = fromText.value.toLowerCase();
    if (inputValue.includes("nathalia")) {
        startRecording();
    } else {
        stopRecording();
    }
});


document.getElementById('toggleRecordingBtn').addEventListener('click', toggleRecording);
document.getElementById('reproduzirAudioBtn').addEventListener('click', reproduzirAudio); 