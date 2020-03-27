import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
class CalcQuestionsContainer extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            mode: "Calculus - Precalculus Questions",
            legendText: '',
            value: ["0","1","2","3","4","5"],
            buttonText: ["A", "B", "C", "D", "F"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "mathGrade"
        };
    }

    get apQuestion(){
        return{
            mode: "Calculus - Precalculus Questions",
            legendText: "Will you have completed the AP Calculus exam before your first semester at West Valley begins?",
            value: ["0","1","2","3","4","5"],
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "ap"
        };
    }
    get apQuestion2(){
        return{
            legendText: "Please choose your anticipated or final AP Calculus result.",
            colClassName: "col-sm-12 p-2",
            buttonText: ["2 or lower on Math AB or Math BC", "3 or higher on Math AB", "3 on Math BC", "4 or 5 on Math BC", "I don't know"],
            currentQuestion: "ap2"
        };
    }
    


    resetCalcQuestions(){
        this.setState(this.initialState);
    }

    goToFinalPlacement(){
        this.props.showPlacement();
    }
    handleClick(e){
        //console.log(e.target.value);
        const value = e.target.value;
        const currentQuestion = this.state.currentQuestion;
        switch(currentQuestion){
            case "mathGrade": this.handleMathGrade(value); break;
            case "ap": this.handleApClick(value); break;
            case "ap2": this.handleAp2Click(value); break;
            default: this.setState(this.gradeQuestion);
        }
    }
    handleMathGrade(value){
        this.props.setHighMathGrade(value);
        this.setState(this.apQuestion);
    }
    handleApClick(value){
        if(value === "0"){
            this.setState(this.apQuestion2);
        }
        else if(value === "1"){
            this.goToFinalPlacement();
        }
    }
    handleAp2Click(value){
        this.props.setApResult(value);
        this.goToFinalPlacement();
    }

    render(){
        if(this.props.show){
            console.log(this.props.mathClass);
            console.log(this.props.highMathGrade);
            let legend;
            if(!this.state.legendText){
                legend = "What is your grade in " + this.props.mathClass + "?";
            }
            else{
                legend = this.state.legendText;
            }
            //console.log(getMathClassText());
            return( <div>
                <h2>{this.state.mode}</h2>
                <SelectionButtonContainer
                colClassName={this.state.colClassName}
                        className={this.state.btnClassName}
                        show={true}
                        id="myButton"
                        legend={legend}
                        onClick={this.handleClick}
                        text={this.state.buttonText}
                        value={this.state.value}
                ></SelectionButtonContainer>
            </div>);
        }
        else{
            return(<div></div>);
        }
    }
    question1(){
        this.setState({
            legendText: "Please select your AP test result below.",
            buttonText: ["2 or lower on Math AB or BC", "3 or higher on Math AB", "3 on Math BC", "4 or 5 on Math BC"],
            colClassName: "col-sm-12 p-2",
            currentQuestion: "1"
        });
    }
}
export default CalcQuestionsContainer;