var inputText = document.querySelector("#text-input");

var optionSelect = document.querySelector("#select-option");

var options = document.querySelectorAll('option');

var translateBtn = document.querySelector("#btn-translate");

var micBtn = document.querySelector("#btn-mic");

var outputText = document.querySelector("#output-text");

voices = [];

optionSel = ["Morse", "Thuum", "Leetspeak", "Wow", "Test"];

var Url = ["https://api.funtranslations.com/translate/morse.json", "https://api.funtranslations.com/translate/thuum.json", "https://api.funtranslations.com/translate/leetspeak.json", "https://api.funtranslations.com/translate/wow.json", "https://lessonfourapi.virendrawadher.repl.co/translate/yoda.json"]


function contentUrl(text){
    var selectedOptions = optionSelect.selectedOptions[0].text
    for (i = 0; i < Url.length; i++){
        if (optionSel[i].toLowerCase() === selectedOptions.toLowerCase()){
            return Url[i] + "?text=" + text
            break;
        }
    }
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
            })
        }
    }
}


function clickHandler(){
    translation();
}
translateBtn.addEventListener("click", clickHandler)

