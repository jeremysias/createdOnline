import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
class GuidedQuestions extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = this.initialState;
    }

    get initialState(){
        return{
            mode: "Student with HS transcripts - Future plans",
            modeNote: "",
            legendText: "Do you plan to transfer to a four-year university to earn a Bachelor's degree?",
            value: ["0","1","2","3","4","5"],
            buttonText: ["Yes", "No"],
            buttonDescription: ["","","","","","","",""],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "0"
        };
    }
    resetQuestions(){
        this.setState(this.initialState);
    }
    handleClick(e){
        const value = e.target.value;
        const currentQuestion = this.state.currentQuestion;
        if(currentQuestion === "0"){
            if(value === "0"){
                this.props.setFourYear(true);
            }
            else{
                this.props.setFourYear(false);
            }
            this.question1();
        }
        if(currentQuestion === "1"){
            if(value === "0"){
                this.props.goToBlue();
            }
            else if(value === "1"){
                this.americanSchoolQuestion();
            }
            else if(value === "2"){
                this.attendUSQuestion();
            }
            else if(value === "3"){
                this.props.setESL(true);
                //this.props.setHighMath("none");
                this.props.goToNonPlacement();
            }
        }
        if(currentQuestion === "attendUS"){
            if(value === "0"){
                this.props.goToGreen();
            }
            else{
                this.americanSchoolQuestion();
            }
        }
        if(currentQuestion === "americanSchool"){
            if(value === "0"){
                this.performanceQuestion();
            }
            if(value === "1"){
                this.troubleQuestion();
            }
        }
        if(currentQuestion === "trouble"){
            if(value === "0"){
                this.props.setESL(true);
                this.performanceQuestion();
            }
            else if(value === "1"){
                this.englishSubjectQuestion()
            }
        }
        if(currentQuestion === "englishSubject"){

            if(value === "1"){
                this.props.setESL(true);
            }
            this.performanceQuestion();
        }
        if(currentQuestion === "performance"){
            if(value === "0"){
                this.props.setPerformance("excellent");
            }
            else if(value === "1"){
                this.props.setPerformance("satisfactory");
            }
            else if(value === "2"){
                this.props.setPerformance("poor");
            }
            this.highMathQuestion();
        }
        if(currentQuestion === "highMath"){
            this.props.setHighMath(value);
            this.props.showPlacement();
        }
    }
    goToGPA(){
        this.props.showGPA();
    }

    question1(){
        const noTranscriptDescription = "Select if you graduated high school in the U.S., but do not have a transcript available.";
        const internationalDescription = "Select if you graduated from a high school or secondary school outside of the United States.";
        const eslDescription = "Select if you only wish to take English as a Second Language coursework.";
        const notGraduateDescription = "Select if you did not graduate high school or secondary school";

        this.setState({
            mode: "High School Education",
            
            legendText: "What is your level of high school education?",
            buttonText: ["Graduated high school in US","Graduated internationally","Did not graduate","Only taking ESL"],
            buttonDescription:[noTranscriptDescription,internationalDescription,notGraduateDescription,eslDescription],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left",
            currentQuestion: "1"

        });
    }
    americanSchoolQuestion(){
        this.setState({
            mode: "High School type",
            legendText: "Was your high school and American school or English based school system?",
            buttonText: ["Yes", "No"],
            buttonDescription: ["","","","","","",],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "americanSchool"
        });
    }
    troubleQuestion(){
        this.setState({
            mode: "Speaking English",
            legendText: "Do you have trouble expressing yourself in English?",
            buttonText: ["Yes", "No"],
            buttonDescription: ["","","","","","",],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "trouble"
        });
    }

    englishSubjectQuestion(){
        this.setState({
            mode: "English Program",
            legendText: "Did you take English subject in HS/college or enroll in an intensive English program?",
            buttonText: ["Yes", "No"],
            currentQuestion: "englishSubject"
        });
    }

    performanceQuestion(){
        this.setState({
            mode: "Performance",
            legendText: "Please rate your high school performance",
            buttonText: ["I am an excellent student", "I am an above average student", "I am an average student"],
            currentQuestion: "performance",
            colClassName: "col-md-4 col-sm-12 p-2",
            
        })
    }
    highMathQuestion(){
        const mathText = [ "Beginning Algebra","Intermediate Algebra","Pre-Calculus","Calculus"];
        this.setState({
            mode: "Math Experience",
            legendText: "Select the highest math class you have taken so far.",
            colClassName: "col-md-6 col-sm-12 p-2",
            buttonText: mathText,
            currentQuestion: "highMath"
        });
    }
    attendUSQuestion(){
        this.setState({
            mode: "High School attended",
            legendText: "Did you attend high school in the United States?",
            colClassName: "col-md-6 col-sm-12 p-2",
            buttonText: ["Yes", "No"],
            currentQuestion: "attendUS"
        });
    }
    render(){
        if(this.props.startAt === "purple"){
            this.props.clearStartAt();
            this.question1();
        }
        if(!this.props.show){
            return(
                <div></div>
            )
        }
        else{
            return(
                <div>
                    <h2>{this.state.mode}</h2>
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
                    />
                </div>
            )
        }
    }
}
export default GuidedQuestions;