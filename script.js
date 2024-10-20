const questions = [
    {
        question: "1. Qual é a principal vantagem do PGBL em relação ao VGBL?",
        options: [
            "a) Maior rentabilidade",
            "b) Isenção de taxas administrativas",
            "c) Benefício fiscal na declaração de imposto de renda completa",
            "d) Liquidez diária"
        ],
        correctAnswer: "C"
    },
    {
        question: "2. Para quem é mais indicado o PGBL?",
        options: [
            "a) Para quem utiliza a declaração simplificada do imposto de renda",
            "b) Para quem utiliza a declaração completa do imposto de renda",
            "c) Para quem não paga imposto de renda",
            "d) Para quem possui um portfólio diversificado"
        ],
        correctAnswer: "B"
    },
    {
        question: "3. Qual é o limite de dedução do PGBL no imposto de renda?",
        options: [
            "a) Até 6% da renda bruta anual",
            "b) Até 10% da renda bruta anual",
            "c) Até 12% da renda bruta anual",
            "d) Até 15% da renda bruta anual"
        ],
        correctAnswer: "C"
    },
    {
        question: "4. O valor acumulado no PGBL é tributado em que momento?",
        options: [
            "a) No momento do aporte",
            "b) No momento da transferência entre planos",
            "c) No momento do resgate ou do recebimento da aposentadoria",
            "d) Mensalmente, de acordo com a rentabilidade"
        ],
        correctAnswer: "C"
    },
    {
        question: "5. Qual a tributação aplicada ao resgate de um PGBL?",
        options: [
            "a) Apenas sobre os rendimentos",
            "b) Apenas sobre o valor principal",
            "c) Sobre o valor total resgatado",
            "d) Sobre os rendimentos e o valor principal separadamente"
        ],
        correctAnswer: "C"
    },
    {
        question: "6. Quais são os regimes de tributação que podem ser escolhidos no PGBL?",
        options: [
            "a) Regressivo e Progressivo",
            "b) Fixo e Variável",
            "c) Simples e Composto",
            "d) Moderado e Agressivo"
        ],
        correctAnswer: "A"
    },
    {
        question: "7. Qual é a principal característica do regime de tributação regressivo no PGBL?",
        options: [
            "a) Alíquota de imposto aumenta com o tempo",
            "b) Alíquota de imposto diminui com o tempo",
            "c) Alíquota de imposto é fixa",
            "d) Alíquota de imposto depende do valor resgatado"
        ],
        correctAnswer: "B"
    },
    {
        question: "8. Se um investidor escolher o regime regressivo no PGBL, qual será a alíquota de imposto se o resgate for feito após 10 anos?",
        options: [
            "a) 15%",
            "b) 10%",
            "c) 20%",
            "d) 35%"
        ],
        correctAnswer: "B"
    },
    {
        question: "9. Qual é a principal diferença entre PGBL e VGBL em termos de tributação?",
        options: [
            "a) O PGBL é tributado apenas sobre os rendimentos",
            "b) O PGBL é tributado sobre o valor total acumulado no momento do resgate",
            "c) O VGBL é tributado sobre o valor total acumulado no momento do resgate",
            "d) O VGBL oferece dedução no imposto de renda"
        ],
        correctAnswer: "B"
    },
    {
        question: "10. O PGBL pode ser uma boa opção de investimento para:",
        options: [
            "a) Pessoas que desejam isenção fiscal imediata",
            "b) Investidores que buscam diversificação sem preocupação com impostos",
            "c) Contribuintes que utilizam a declaração simplificada do imposto de renda",
            "d) Contribuintes que utilizam a declaração completa e querem aproveitar benefícios fiscais a longo prazo"
        ],
        correctAnswer: "D"
    }
];
  // Continue com as outras perguntas...

let currentQuestionIndex = 0;
let correctAnswers = 0;
let isAnswered = false;

// Função para carregar a pergunta e opções
function loadQuestion() {
  const questionTitle = document.getElementById("question");
  const options = document.querySelectorAll(".option label");

  const currentQuestion = questions[currentQuestionIndex];
  questionTitle.textContent = currentQuestion.question;

  options.forEach((option, index) => {
      option.textContent = currentQuestion.options[index];
      option.style.backgroundColor = '#f0f4f8'; // Reseta o estilo de todas opções
  });

  document.querySelectorAll('input[name="answer"]').forEach(input => {
      input.checked = false;
      input.disabled = false; // Habilita novamente os inputs
  });

  const feedback = document.getElementById("feedback");
  feedback.textContent = "";
  feedback.classList.remove("correct", "incorrect");

  document.getElementById("next-btn").disabled = true; // Desabilita o botão 'Próxima' até o usuário responder
  isAnswered = false;

  updateProgressBar();
}

// Função para verificar a resposta
function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  const feedback = document.getElementById("feedback");
  const labels = document.querySelectorAll(".option label");

  if (!selectedOption || isAnswered) {
      return; // Sai da função se nenhuma opção foi selecionada ou já foi respondido
  }

  const correctAnswer = questions[currentQuestionIndex].correctAnswer;

  if (selectedOption.value === correctAnswer) {
      feedback.textContent = "Correto!";
      feedback.classList.add("correct");
      correctAnswers++;
      labels.forEach(label => {
          if (label.htmlFor === `option${correctAnswer}`) {
              label.style.backgroundColor = 'lightgreen'; // Destaca a resposta correta
          }
      });
  } else {
      feedback.textContent = `Incorreto! A resposta correta é: ${correctAnswer}.`;
      feedback.classList.add("incorrect");
      labels.forEach(label => {
          if (label.htmlFor === `option${correctAnswer}`) {
              label.style.backgroundColor = 'lightgreen'; // Destaca a resposta correta
          }
          if (label.htmlFor === selectedOption.id) {
              label.style.backgroundColor = 'lightcoral'; // Marca a incorreta
          }
      });
  }

  isAnswered = true; // Evita múltiplas respostas para a mesma pergunta

  // Desabilita as opções após a seleção
  document.querySelectorAll('input[name="answer"]').forEach(input => {
      input.disabled = true;
  });

  // Habilita o botão "Próxima"
  document.getElementById("next-btn").disabled = false;
}

// Função para avançar para a próxima pergunta
function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
      loadQuestion();
  } else {
      const feedback = document.getElementById("feedback");
      feedback.textContent = `Finalizado! Você acertou ${correctAnswers} de ${questions.length}.`;
      document.getElementById("next-btn").disabled = true; // Desabilita botão ao final
  }
}

// Atualiza a barra de progresso
function updateProgressBar() {
  const progressBar = document.getElementById("progress-bar");
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Carrega a primeira pergunta quando a página é carregada
window.onload = function() {
  loadQuestion();
  document.getElementById("next-btn").disabled = true; // Desabilita até que o usuário selecione uma resposta
};

// Evento de clique nas opções
document.querySelectorAll('input[name="answer"]').forEach(input => {
  input.addEventListener("change", checkAnswer);
});

// Evento de clique no botão "Próxima"
document.getElementById("next-btn").addEventListener("click", nextQuestion);
