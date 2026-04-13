const statusText =
document.getElementById("status");

const responseBox =
document.getElementById("responseBox");

const API_KEY =
"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";

const recognition =
new(window.SpeechRecognition ||
window.webkitSpeechRecognition)();

recognition.lang = "pt-BR";

recognition.continuous = true;

function speak(text) {

const speech =
new SpeechSynthesisUtterance(text);

speech.lang = "pt-BR";

speechSynthesis.speak(speech);

}

function startListening() {

recognition.start();

statusText.innerText =
"Jarvis ouvindo...";

}

recognition.onresult =
async function(event) {

const transcript =
event.results[event.results.length - 1][0]
.transcript
.toLowerCase();

if (transcript.includes("jarvis")) {

statusText.innerText =
"Sim, chefe?";

speak("Sim, chefe?");

return;

}

if (transcript.includes("youtube")) {

window.open(
"https://youtube.com"
);

speak(
"Abrindo YouTube"
);

return;

}

if (transcript.includes("google")) {

window.open(
"https://google.com"
);

speak(
"Abrindo Google"
);

return;

}

await askJarvis(transcript);

};

async function askJarvis(question) {

statusText.innerText =
"Pensando...";

try {

const response =
await fetch(
"https://api.openai.com/v1/chat/completions",
{

method: "POST",

headers: {

"Content-Type":
"application/json",

"Authorization":
"Bearer " + API_KEY

},

body: JSON.stringify({

model: "gpt-4o-mini",

messages: [

{

role: "system",

content:
"Você é Jarvis, um assistente futurista que responde de forma educada e objetiva."

},

{

role: "user",

content: question

}

]

})

}

);

const data =
await response.json();

const reply =
data.choices[0]
.message
.content;

responseBox.innerText =
reply;

speak(reply);

statusText.innerText =
"Pronto.";

}

catch (error) {

speak(
"Erro ao conectar com a inteligência"
);

statusText.innerText =
"Erro.";

}

}