var inputText = document.querySelector("#text-input");

var optionSelect = document.querySelector("#select-option");

var options = document.querySelectorAll('option');

var translateBtn = document.querySelector("#btn-translate");

var micBtn = document.querySelector("#btn-mic");

var outputText = document.querySelector("#output-text");

var voiceOption = document.querySelector("#voice-option")

var synth = window.speechSynthesis; 

voices = [];

optionSel = ["Thuum", "Morse", "Leetspeak", "Cheunh"]

var Url = ["https://api.funtranslations.com/translate/thuum.json", "https://api.funtranslations.com/translate/morse.json", "https://api.funtranslations.com/translate/leetspeak.json", "https://api.funtranslations.com/translate/cheunh.json"]


function contentUrl(text){
    var selectedOptions = optionSelect.selectedOptions[0].text
    for (i = 0; i < Url.length; i++){
        if (optionSel[i].toLowerCase() === selectedOptions.toLowerCase()){
            return Url[i] + "?text=" + text
            break;
        }
    }
}

function servererror(error){
    alert("Sorry :( server is down try after sometime")
    outputText.innerHTML = '';
}

function translation(){
    var selectedOptions = optionSelect.selectedOptions[0].text
    console.log("Option " + selectedOptions)
    for(i = 0; i < optionSel.length; i++ ){
        if (optionSel[i].toLowerCase() === selectedOptions.toLowerCase()){
            var translateText = inputText.value;

            fetch(contentUrl(translateText))
            .then(function responseHandler(response){
                return response.json()
            })
            .then(function json(json){
                var outputTranslate = json.contents.translated;
                outputText.innerText = outputTranslate;
                if(selectedOptions === "Morse"){
                    micBtn.style.display = "none";
                    outputTranslate = '';
                } else {
                    micBtn.style.display = "block";
                    function speakHandler(){
                        speak(outputTranslate)
                        outputTranslate = '';
                    }
                } 
                micBtn.addEventListener("click", speakHandler)
            })
            .catch(servererror);
        }
    }
    
}

function populatedVoices(){
    voices = synth.getVoices()
    var selectedIndex = voiceOption.selectedIndex < 0 ? 0 : voiceOption.selectedIndex;

    voiceOption.innerHTML = '';
    for(var i = 0; i < voices.length; i++){
        var options = document.createElement('option');
        options.textContent = voices[i].name  + "(" + voices[i].lang + ")"

        if (voices[i].default){
            options.textContent += "--DEFAULT" ; 
        }

        options.setAttribute('data-lang', voices[i].lang);
        options.setAttribute('data-name', voices[i].name);
        voiceOption.appendChild(options);

    }
}

populatedVoices();
if(speechSynthesis.onvoiceschanged !== undefined){
    speechSynthesis.onvoiceschanged = populatedVoices;
}

function speak(input){
    if(input !== ''){
        var uttherThis = new SpeechSynthesisUtterance(input)
        uttherThis.onerror = function(event){
            alert("Fail to translate");
        }

        var selectedOptionsVoice = voiceOption.selectedOptions[0].getAttribute('data-name');
        for(var i = 0; i < voices.length; i++){
            if(voices[i].name === selectedOptionsVoice){
                uttherThis.voice = voices[i]
                break;
            }
        }
        synth.speak(uttherThis);
    }
}


function clickHandler(){
    translation();
}
translateBtn.addEventListener("click", clickHandler)



