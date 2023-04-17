import { Component } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent {
constructor(private _questionsService:QuestionService,private _searchService:SearchService){}
questions:any=[]
ngOnInit(){
  this.Show_Questions()
}
Search:any
ItemShowTagwise:any=[]
Search_In_All_Product(data:any){
  this.ItemShowTagwise=[]
  this._searchService.getSearchQuery().subscribe((query) => {
    console.log("Query",query)
    this.Search=query
    if(query){

      for(let item of data){
        console.log("data",data)
        console.log("item",item)
        console.log("tags",item.tags)
        let filteredTags = item.tags.find((book:any) =>
        book.name.toLowerCase().includes(this.Search.toLowerCase())
        );
        if(filteredTags){
          console.log("filteredTags",filteredTags)
          this.ItemShowTagwise.push(item)
          
          // this.ItemShowTagwise.filter((item,
          //       index) => this.ItemShowTagwise.indexOf(item) === index);
        }
      }

    }
  })
}
Show_Questions(){

this._questionsService.get_Question_data().subscribe({next:(get_question_res:any)=>{
  if(get_question_res){
    this.questions=get_question_res
    console.log("get_question_res",get_question_res)
    this.Search_In_All_Product(get_question_res)
    // for(let i=0;i<this.questions.length;i++){
    //   let arr=this.questions[i].title.split(" ")
    //   for(let item of arr){
    //     let Array=[]
    //     let Arrr=Array.push(item)
    //     console.log("Arrr",Array)
    //   }
    // }
  }
},error:(get_question_error)=>{
  console.log("get_question_error",get_question_error)
}})
  }
}
