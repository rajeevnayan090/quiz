const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Javascript is __________ language.',
        answers: [
            {
                text: 'Application',
                correct: false
            },
            {
                text: 'Programming',
                correct: false 
            },
            {
                text: 'Scripting',
                correct: true
            },
            {
                text: 'None of these',
                correct: false
            }
        ]
    },
    {
        question: 'Javascript Code is written inside file having extension __________.',
        answers: [
            {
                text: '.jsc',
                correct: false
            },
            {
                text: '.javascript',
                correct: false
            },
            {
                text:  '.js',
                correct: true
            },
            {
                text: '.jvs',
               correct: false }
        ]
    },
    {
        question: 'Javascript is __________ Side Scripting Language.',
        answers: [
            {
                text: 'ISP',
                correct: false
            },
            {
                text: 'None of these',
                correct: false
            },
            {
                text: 'Server',
                correct: false
            },
            {
                text: 'Browser',
                correct: true}
        ]
    },
    {
        question: 'Which of the following attribute is used to include external JS code inside your HTML Document - ',
        answers: [
            {
                text: 'ext',
                correct: false
            },
            {
                text: 'link',
                correct: false
            },
            {
                text: 'script',
                correct: false
            },
            {
                text: 'src',
                correct: true
            }
        ]
    }
]