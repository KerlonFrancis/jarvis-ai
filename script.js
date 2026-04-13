const statusText =
document.getElementById("status");

const responseText =
document.getElementById("response");

const button =
document.getElementById("start-btn");

// Criar reconhecimento
const recognition =
new (window.SpeechRecognition ||
window.webkitSpeechRecognition)();

recognition.lang = "pt-BR";

// Função para falar
function speak(text) {

    const utterance =
    new SpeechSynthesisUtterance(text);

    utterance.lang = "pt-BR";

    const voices =
    speechSynthesis.getVoices();

    const ptVoice =
    voices.find(v =>
        v.lang === "pt-BR"
    );

    if (ptVoice) {
        utterance.voice = ptVoice;
    }

    speechSynthesis.speak(utterance);
}

// Quando clicar no botão
button.onclick = () => {

    try {

        statusText.innerText =
        "Ouvindo...";

        // Primeiro fala
        speak("Sim, chefe?");

        // Espera um pouco
        setTimeout(() => {

            recognition.start();

        }, 1500);

    }

    catch (e) {

        statusText.innerText =
        "Erro ao iniciar.";

    }

};

// Quando ouvir comando
recognition.onresult = async (event) => {

    const command =
    event.results[0][0].transcript;

    responseText.innerText =
    "Você disse: " + command;

    // Resposta simples
    speak("Executando comando");

};
