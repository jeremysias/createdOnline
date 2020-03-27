import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
class StartingQuestion extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = this.initialState;
    }
    /*
    showStartingQuestion: trueFalse[0],
    showHighSchoolQuestions: trueFalse[1],
    showGuidedQuestions: trueFalse[2],
    showCollegeQuestions: trueFalse[3],
    showGPAQuestion: trueFalse[4],
    showCalcQuestions: trueFalse[6],
    showPlacement: trueFalse[7],
    */
    get initialState(){
        const hsDescription = "For students who will graduate or have graduated from a high school in the United States and have transcript available to submit.";
        const selfPlaceDescription = "For students who graduated high school without transcript available, who graduated high school or secondary school internationally, who did not graduate high school, or who seek English as a Second language (ESL) only.";
        const colRecordsDescription = "For students who have college coursework, who have Mission College’s old English and Math placement test scores prior to February 15, 2019";
        const assessmentScoresDescription = "For students who completed the Assessment Test at Mission College prior to February 15, 2019";
        return{
            mode: "Welcome",
            legendText: "To determine my Math, English or ESL placements, I am using…",
            value: ["1","2","3","4"],
            buttonText: ["U.S. High School Records", "Guided Self-Placement", "College Records From other Institutions", "Assessment Test Scores at Mission College"],
            buttonDescription: [hsDescription, selfPlaceDescription, colRecordsDescription, assessmentScoresDescription],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left whitespace-normal",
            currentQuestion: "0"
        };
    }

    handleClick(e){
        let value = e.target.value;
        if(value === "4"){
            this.props.setAssessmentTaken(true);
            value = "3";
        }
        this.props.goToQuestionSet(value)
    }
    render(){
        if(!this.props.show){
            return (<div></div>)
        }
        else{
            return(
                <div>
                    <h2>Welcome</h2>
                    <p>Assessment for placement is one of the critical steps to help students start on a successful pathway in college. It is also critical that you understand your placement options, and your rights to access transfer level coursework. Please choose an option below to get started.</p>
                    
                    <SelectionButtonContainer
                    colClassName={this.state.colClassName}
                            className={this.state.btnClassName}
                            show={true}
                            id="myButton"
                            legend={this.state.legendText}
                            onClick={this.handleClick}
                            text={this.state.buttonText}
                            value={this.state.value}
                            buttonDescription={this.state.buttonDescription}
                    ></SelectionButtonContainer> 
                    
                </div>
            )
        }
    }
}
export default StartingQuestion;