import { Component, OnInit } from '@angular/core';
import quizz_questions from '../../../assets/data/quizz_questions.json'

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css', './quizz.component.mq.css']
})
export class QuizzComponent implements OnInit {
  
  //aqui eu crio as variaveis
  title:string = ''
  
  questions:any
  questionSelected:any

  answers:string[] = []
  answersSelected:string = ''

  questionIndex:number = 0;
  questionMaxIndex:number = 0;

  finished:boolean = true


  constructor() { }

  ngOnInit(): void {

    //aqui eu atribuo valor dizendo de onde elas vêm
    if(quizz_questions){
      this.finished = false 
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionMaxIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

    }
  }

  //guardando resposta marcada e o seu alias
  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
    
  }

  //mudança de questão
  async nextStep() {
    this.questionIndex +=1

    if(this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer: string = await this.checkResult(this.answers)
      this.finished = true
      this.answersSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results] //isso é pra dizer que o finalAnswer sera uma string como o quizz_questions.results
    }
  }

  //verificar qual ALIAS(A ou B) vencedor
  async checkResult (answers:string[]) {

    const result = answers.reduce((previous, current, i, array) => {
        if(array.filter(item => item === previous).length >
           array.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }
  
}
