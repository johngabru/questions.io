let resultados = [];
let nome = "";
let pontuacao = 0;
let atual = 0;

const perguntas = [
  { texto:'Por qual motivo rolou treta um dia antes do pré-Euforie?', op:['A) Porque o grupo dividiu opiniões sobre quem devia ficar','B) Porque removeram o Girafa','C) Porque trocaram os adms de membros'], correta:'b' },
  { texto:'Quem precisa de aviso prévio?', op:['A) Dreia','B) Andressa','C) Fane'], correta:'b' },
  { texto:'Por que John e Murilo vivem se implicando?', op:['A) Ti Dev e Ti Hardware','B) Intel e AMD','C) WhatsApp App e WhatsApp Web'], correta:'a' },
  { texto:'Qual foi o emoji que Toby sempre reage nas mensagens?', op:['A) ❤️','B) 🖕🏻','C) Ⓜ'], correta:'c' },
  { texto:'De onde surgiu a frase "saudavel foi matado"?', op:['A) Estavam zoando algúem que parou de ir pra academia','B) Estavam falando de um amigo que faleceu ','C) Foi depois que queimaram a salada na air fryer'], correta:'b' },
  { texto:'Qual foi o marketing que passou no grupo?', op:['A) Karol sendo assesora','B) A nova namorada da Dreia','C) Gabi e Murilo na esquina'], correta:'c' },
  { texto:'Quem nunca desistiu o grupo?', op:['A) John','B) Hugo','C) Girafa'], correta:'b' },
  { texto:'Por que o Murilo fica com raiva na amostra?', op:['A)Porque ele acha que os jurados têm favoritismo','B) Porque não gosta a avaliação em 7 dias ','C) Porque acha o grupo é perda de tempo'], correta:'b' },
  { texto:'O que a Dreia disse antes de falar “quero que coloque cogumelo na minha boca”?', op:['A) Fode com força no meu cu, minha buceta','B) Me chama de princesa','C) Abre mais que eu tô com fome'], correta:'a' },
  { texto:'Quem foi que disse “não posso, eu tenho família”?', op:['A) Jessie','B) Gabriella ','C) Theus'], correta:'c' },
  { texto:'Qual é o apelido da Ste?', op:['A) A menina do carro branco ','B) Os mil km rodados','C) A cadela poddle dourado'], correta:'c' },
  { texto:'O que RN sempre discorda?', op:['A) O pronunciamento da presidência','B) Os elogios','C) Os poderes do Goku '], correta:'b' },
  { texto:'Qual foi a pior contratação do grupo?', op:['A) Murilo contratou Taís','B) Vitor contratou Nicolly','C) Ste contratou Yuri'], correta:'c' },
  { texto:'Por que os meninos criaram Berinjela PLUS?', op:['A) Para falar mal das meninas','B) Defender o Yuri','C) Brotheragem'], correta:'b' },
  { texto:'Qual foi o motivo da primeira treta entre Dreia e Murilo?', op:['A) Porque a Dreia reagiu com “haha” numa mensagem séria','B) Porque o Murilo não quis concordar do DN.','C) só porque Dreia discordou o grande RN'], correta:'c' },
  { texto:'No final, a culpa sempre é de quem?', op:['A) Toby','B) Murilo','C) Dreia'], correta:'b' },
  { texto:'Quem é que sempre começa as tretas?', op:['A) Murilo','B) Karol','C) Acácio'], correta:'a' },
  { texto:'O que aconteceu no inicio do grupo?', op:['A) Nada','B) Treta da Ana Vitoria x Coelhinha','C) Homofobia'], correta:'b' },
  { texto:'Por que a Milena é odiada pelos meninos?', op:['A) Porque ela não dá atenção no grupo','B) Porque ela dá vacuo nos meninos','C) Porque ela nem abaixa'], correta:'c' },
  { texto:'Qual foi a drama do DJ Negrexx?', op:['A) Removeram ele do nosso grupo','B) Terminou o namoro ','C) Vazaram o nude dele'], correta:'a' },
  { texto:'Por qual motivo a gente ria dos videos da Layene?', op:['A) Roupa','B) Dança','C) Tablet'], correta:'c' },
  { texto:'Quase sempre sobra para quem?', op:['A) Ananda','B) Gabriel Azul','C) Dreia'], correta:'c' }
];

const container = document.getElementById('quiz-container');
const resultadoDiv = document.getElementById('resultado');
const historicoDiv = document.getElementById('historico');
const startScreen = document.getElementById('start-screen');
const progressBar = document.getElementById('progress-bar');

document.getElementById('startBtn').addEventListener('click', () => {
  const input = document.getElementById('nomeInput');
  nome = input.value.trim() || "Visitante";
  startScreen.style.display = "none"; 
  container.style.display = "block";   
  mostrarPergunta();
});

function mostrarPergunta() {
  const q = perguntas[atual];
  const percentual = ((atual) / perguntas.length) * 100;
    progressBar.style.width = `${percentual}%`;

  container.innerHTML = `
    <div class="question animate">
      <p><strong>Pergunta ${atual + 1} de ${perguntas.length}</strong></p>
      <p>${q.texto}</p>
      ${q.op.map(op => `<button class="quiz-btn" onclick="responder('${op[0].toLowerCase()}', this)">${op}</button>`).join('')}
      <div class="feedback" id="feedback"></div>
    </div>
  `;
}

function responder(resposta, btn) {
  const feedbackDiv = document.getElementById('feedback');
  if(resposta === perguntas[atual].correta){
    pontuacao++;
    btn.classList.add('correct');
    feedbackDiv.textContent = "✔ Acertou!";
  } else {
    btn.classList.add('wrong');
    feedbackDiv.textContent = "✖ Errou!";
  }

  document.querySelectorAll(".quiz-btn").forEach(b => b.disabled = true); 

  setTimeout(() => {
    atual++;
    if(atual < perguntas.length) mostrarPergunta();
    else mostrarResultado();
  }, 900);
}

function mostrarResultado() {
  resultados.push({nome: nome, pontuacao: pontuacao});
  container.innerHTML = '';
  progressBar.style.width = '100%';

  let mensagem = '';
  let cor = '';
  
  if(pontuacao === perguntas.length){
    mensagem = `🔥PARABÉNS ${nome}! Você é o MESTRE BERINJELENSE SUPREMO! 🍆👑`;
    cor = '#8b2fd0';
  } else if (pontuacao>= 15) {
    mensagem = `✅${nome}, aprovado! Você acertou ${pontuacao} de ${perguntas.length} 🎉`;
    cor = '#6a0dad';
  } else {
     mensagem = `❌${nome}, reprovado... só ${pontuacao} de ${perguntas.length} 😅`;
    cor = '#ff4444';
  }

  resultadoDiv.innerHTML = `${mensagem}<br><br><button id="refazer" onclick="reiniciarQuiz()">Refazer Quiz</button>`;
  resultadoDiv.style.color = cor;

  let lista = resultados.map(r => `${r.nome}: ${r.pontuacao}/${perguntas.length}`).join('<br>');
  historicoDiv.innerHTML = `<br><h3>Resultados anteriores:</h3>${lista}`;

fetch("https://script.google.com/macros/s/AKfycbyIYNx4KocG3jpYs67p2a6fGy1G7F2-LsJweic33K4x5_d9bf5TDljXpGFpBkhUHxIH/exec", {
  method: "POST",
  headers: { "Content-Type": "application/x-www-form-urlencoded" },
  body: `nome=${encodeURIComponent(nome)}&pontuacao=${encodeURIComponent(pontuacao)}`
})
.then(res => console.log("Enviado!"))
.catch(err => console.error("Erro ao enviar", err));
}

function reiniciarQuiz() {
  pontuacao = 0;
  atual = 0;
  resultadoDiv.textContent = '';
    progressBar.style.width = '0%';
  container.style.display = "block";
  mostrarPergunta();
}