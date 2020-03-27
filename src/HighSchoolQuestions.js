import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
class HighSchoolQuestions extends Component{
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
    get highSchoolRecordsNote(){
        return(
            <p>Using high school records for course placement is the strongest predictor of college success. Please have your high school transcript available before proceeding with this placement option. You need to submit your high school transcript at the end of the session. If you are a recent California high school graduate who has graduated after 2015, <strong>we may</strong> have your transcript on file. Please <strong>email</strong> or visit the Assessment Center with your Mission Student ID number.</p>
        )
    }
    get apDescription(){
        return(
            <span>Meeting <a href="http://www.missioncollege.edu/student_services/assessment/alternative_testing.html" target="_blank" rel="noopener noreferrer">minimum standards</a> of Advanced Placement (AP) and/or other external exam score in math and/or English to apply toward placement.</span>
        )
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
            else {
                this.props.setFourYear(false);
            }
            this.question1();
        }
        else if(currentQuestion === "1"){
            if(value === "0"){
                this.props.setGradeLevel("12");
                this.fourYearUSQuestion();
            }
            else if(value === "1"){
                this.props.setGradeLevel("12");
                this.apQuestion();
            }
            else if(value === "2"){
                this.concurrentQuestion1();
            }
        }
        else if(currentQuestion === "4Yr"){
            if(value === "0") this.goToGPA();
            else if(value === "1") {
                this.eslQuestion();
            }
        }
        else if(currentQuestion === "ap"){
            if(value === "0"){
                this.props.setApResult("english");
                this.goToGPA();
            }
            else if(value === "1"){
                this.props.setApResult("math");
                this.goToGPA();
            }
            else if(value === "2"){
                this.props.setApResult("both");
                //see Counselor - prereq clearance end
            }
            else if(value === "3"){
                this.props.setApResult("");
                this.fourYearUSQuestion();
            }
            
        }
        else if(currentQuestion === "cq1"){
            if(value === "0"){
                this.props.setGradeLevel("9");
                this.algebraQuestion();
            }
            else if(value === "1"){
                this.props.setGradeLevel("10");
                this.algebraQuestion();
            }
            else if(value === "2"){
                this.props.setGradeLevel("11");
                this.goToGPA();
            }
        }
        else if(currentQuestion === "alg"){
            if(value === "0"){
                this.goToGPA();
            }
            else if(value === "1"){
                //See Math dept Chair for Math Placement
                this.props.setHighMath("0");
                this.props.showPlacement();
            }
        }
        else if(currentQuestion === "esl"){
            if(value === "0"){
                this.props.setESL(true);
                this.goToGPA();
            }
            else if(value === "1"){
                this.goToGPA();
            }
        }
    }
    question1(){
        const firstTimeDescription = "(In last semester of 12th grade High School and applying to Mission for summer - fall term or after leaving a U.S. high school)";

        this.setState({
            mode: "Choose one of the following",
            modeNote: this.highSchoolRecordsNote,
            legendText: "Please select one of the following options to determine your placement in transfer level courses in English and Math.",
            buttonText: ["First-time student in college","Meeting minimum standards of AP","Enrolling in high school and college at the same time."],
            buttonDescription:[firstTimeDescription,this.apDescription,""],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left",
            currentQuestion: "1"

        });
    }
    fourYearUSQuestion(){
        this.setState({
            mode: "High School in the US?",
            legendText: "Did you attend all four years of U.S. high school?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "4Yr",
            buttonDescription: ["","","",""]

        });
    }
    apQuestion(){
        this.setState({
            mode: "AP Test Results",
            legendText: "Which AP and/or CLEP results will you be submitting?",
            buttonText: ["English", "Math", "Both", "Neither"],
            buttonDescription: ["","","",""],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "ap"

        });
    }
    concurrentQuestion1(){
        this.setState({
            mode: "Concurrent Enrollment Question 1",
            legendText: "Select the highest grade level completed.",
            buttonText: ["Grade 9", "Grade 10", "Grade 11"],
            buttonDescription:["","","",],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "cq1"

        });
    }
    algebraQuestion(){
        this.setState({
            mode: "Intermediate Algebra",
            legendText: "Did you complete Algebra II with a grade of C or higher?",
            buttonText: ["Yes", "No"],
            buttonDescription: ["",""],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "alg"
        });
    }
    eslQuestion(){
        this.setState({
            mode: "ESL",
            legendText: "During your last year of high school, were you enrolled in ESL?",
            buttonText: ["Yes", "No"],
            buttonDescription: ["","","","",""],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "esl"
        });
    }
    goToGPA(){
        this.props.showGPA();
    }
    render(){
        if(this.props.startAt === "blue"){
            this.fourYearUSQuestion();
            this.props.clearStartAt();
        }
        else if(this.props.startAt === "green"){
            this.concurrentQuestion1();
            this.props.clearStartAt();
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
                    <div>{this.state.modeNote}</div>
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
export default HighSchoolQuestions;