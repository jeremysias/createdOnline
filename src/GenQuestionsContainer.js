import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
class GenQuestionsContainer extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = this.initialState;
    }

    get initialState(){
        return{
            mode: "Welcome",
            legendText: "Mission College is committed to helping you successfully transition to our college. This Self-Placement Tool will ask you a series of questions which will take you about 5 minutes to complete to help you determine your Math and English classes.",
            value: ["0","1","2","3","4","5"],
            buttonText: ["Next"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "0"
        };
    }
    resetGenQuestions(){
        this.setState(this.initialState);
    }

    goToGPA(){
        this.props.showGPA();
    }
    handleClick(e){
        //console.log(e.target.value);
        const value = e.target.value;
        const currentQuestion = this.state.currentQuestion;
        if(currentQuestion === "0") this.question1();    
        else if(currentQuestion === "1") this.answerQuestion1(value);
        else if(currentQuestion === "hs1") this.answerQuestionHS1(value);
        else if(currentQuestion === "hs1alt") this.answerQuestionHS1Alt(value);
        else if(currentQuestion === "politeExit") this.resetGenQuestions();
        else if(currentQuestion === "hs2") this.answerQuestionHS2(value);
        else if(currentQuestion === "hs3") this.answerQuestionHS3(value);
        else if(currentQuestion === "hs3Alt")this.answerQuestionHS3Alt(value);
        else if(currentQuestion === "rg1") this.answerQuestionRG1(value);
        else if(currentQuestion === "rg1Alt") this.answerQuestionRG1Alt(value);
        else if(currentQuestion === "rg2") this.answerQuestionRG2(value);
        else if(currentQuestion === "rg2Alt") this.answerQuestionRG2Alt(value);
        else if(currentQuestion === "rg3") this.answerQuestionRG3(value);
        else if(currentQuestion === "rg4") this.answerQuestionRG4(value);
        else if(currentQuestion === "rg4Alt") this.answerQuestionRG4Alt(value);
        else if(currentQuestion === "awd1") this.answerQuestionAWD1(value);
        else if(currentQuestion === "referToDESP") this.referToDESPClick(value);
        else if(currentQuestion === "referToESL") this.referToESLClick(value);
        else if(currentQuestion === "meetCounselorExit") this.meetCounselorClick(value);
    }
    answerQuestion1(value){
        if(value === "0") this.questionHS1();
        else if(value === "1") this.questionRG1();
        else if(value === "2") this.questionAWD1();
        else if(value === "3") this.referToESL();
        else if(value === "4") this.politeExit();
    }
    answerQuestionHS1(value){
        if(value === "0")this.questionHS2();
        else if(value === "1")this.questionHS1Alt();
    }
    answerQuestionHS1Alt(value){
        if(value === "0")this.goToGPA();
        else if(value === "1")this.politeExit();
      //  else if(value === "2")this.politeExit();
    }
    answerQuestionHS2(value){
        if(value === "0"){
            this.referToESL();
        }
        if(value === "1"){
            this.questionHS3();
        }
    }
    answerQuestionHS3(value){
        if(value === "0"){
            this.questionHS3Alt();
        }
        if(value === "1"){
            this.goToGPA();
        }
    }
    answerQuestionHS3Alt(value){
        if(value === "0")this.referToDESP();
        else if(value === "1")this.goToGPA();
        
    }
    answerQuestionRG1(value){
        if(value === "0") this.questionRG2();
        else if(value === "1") this.questionRG1Alt();
    }
    answerQuestionRG1Alt(value){
        if(value === "0")this.questionRG2();
        else if(value === "1")this.politeExit();
    }
    answerQuestionRG2(value){
        if(value === "0") this.questionRG3();
        else if(value === "1") this.questionRG2Alt();
    }
    answerQuestionRG2Alt(value){
        if(value === "0") this.questionRG3();
        else if(value === "1") this.referToESL();
    }
    answerQuestionRG3(value){
        if(value === "0")this.referToESL();
        else if(value === "1") this.questionRG4();
    }
    answerQuestionRG4(value){
        if(value === "0")this.questionRG4Alt();
        else if(value === "1") this.goToGPA();
    }
    answerQuestionRG4Alt(value){
        if(value === "0") this.referToDESP();
        else if(value === "1") this.goToGPA();
    }
    answerQuestionAWD1(value){
        if(value === "0") this.questionRG2();
        else if(value === "1") this.meetCounselorExit();
    }
    referToESLClick(value){
        if(value === "0")window.location = "http://www.westvalley.edu/academics/language_arts/esl/";
        else if(value === "1")this.resetGenQuestions();
    }
    referToDESPClick(value){
        if(value === "0")window.location = "https://www.westvalley.edu/services/academic-success/desp/index.html";
        else if(value === "1")this.resetGenQuestions();
    }
    meetCounselorClick(value){
        if(value === "0")window.location = "http://www.westvalley.edu/services/academic-success/counseling/index.html";
        else if(value === "1")this.resetGenQuestions();
    }

    question1(){
        this.setState({
            mode: "Question 1:",
            legendText: "I am currently a(n)...",
            buttonText: [
                "High School Student",
                "Recent High School Graduate (or currently enrolled in grade 12)",
                "Adult Wanting to Earn a Degree or Transfer",
                "Adult Seeking only ESL",
                "Adult seeking Enrichment Classes, such as World Language, Yoga or Art"
            ],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left whitespace-normal",
            currentQuestion: "1"
        });
    }
  
    questionHS1(){
        this.setState({
            mode: "High School Student",
            legendText: "Are you enrolling full time at Mission College?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "hs1"
        });
    }


    questionHS1Alt(){
        this.setState({
            mode: "Not Full Time Student?",
            legendText: "Please select the type of class you plan to take:",
            buttonText: ["English and/or Math", "All Other Subjects"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "hs1alt"
        });
    }
    questionHS2(){
        this.setState({
            mode: "ESL Student?",
            legendText: "Are you currently enrolled in an ESL (English as a Second Language) or ELD (English Language Development) class? (A class to help non-native English speakers)",
            buttonText: ["Yes", "No"],
            currentQuestion: "hs2"
        });
    }
    questionHS3(){
        this.setState({
            mode: "DESP?",
            legendText: "Do you have an IEP or a 504 plan?",
            buttonText: ["Yes", "No"],
            currentQuestion: "hs3"
        });
    }
    questionHS3Alt(){
        this.setState({
            mode: "DESP",
            legendText: "Do you plan to seek support through our DESP (Disability and Educational Support Program) regarding the help you received with your IEP/504 plan?",
            buttonText: ["Yes", "No"],
            currentQuestion: "hs3Alt"
        });
    }
    questionRG1(){
        this.setState({
            mode: "Recent Graduate",
            legendText: "Are you enrolling full time at Mission College?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg1"
        });
    }
    questionRG1Alt(){
        this.setState({
            mode: "Recent Graduate - Not Full Time",
            legendText: "Do you plan to take a Math or English class at Mission College?",
            buttonText: ["Yes", "No"],
            currentQuestion: "rg1Alt"
        });
    }
    questionRG2(){
        this.setState({
            mode: "Full Time Student",
            legendText: "Did you attend high school in the United States?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg2"
        });

    }
    questionRG2Alt(){
        this.setState({
            mode: "Full Time Student",
            legendText: "Was your high school an American school or English based school system, located overseas?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg2Alt"
        });

    }
    questionRG3(){
        this.setState({
            mode: "Attended High School in United States",
            legendText: "During your last year in high school, were you enrolled in an ESL (English as as Second language) or ELD (English Language Development) class? (A class to help non-native English speakers)",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg3"

        });
    }
    questionRG4(){
        this.setState({
            mode: "Not enrolled in ESL",
            legendText: "While in school, did you have an IEP or a 504 plan?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg4"

        });
    }
    questionRG4Alt(){
        this.setState({
            mode: "Has IEP or 504 plan",
            legendText: "Do you plan to seek support through our DESP (Disability & Educational Support Program) program regarding the help you received with your IEP/504 plan?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "rg4Alt"
        });
    }
    questionAWD1(){
        this.setState({
            mode: "Adult wanting to earn degree or transfer",
            legendText: "Have you attended high school in the past 10 years?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "awd1"
        });
    }

    politeExit(){
        this.setState({
            mode: "No Math or English Placement Required",
            legendText: "Thank you for choosing to take classes at Mission College!  Since you are not currently planning to take English  or Math classes, you are finished with this guided self-placement tool.  Have a great semester!",
            buttonText: ["Reset Placement Tool"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-secondary",
            currentQuestion:"politeExit"
        });
    }

    meetCounselorExit(){
        this.setState({
            mode: "Meet with a Counselor",
            legendText: "We recommend you set up an appointment to meet with a counselor to further discuss your Math/English pathway. You can call the counseling office at 408-855-5034. A counselor will be happy to help you determine your classes for the upcoming semester.",
            buttonText: ["Mission College Counseling Office", "Reset Placement Tool"],
            colClassName: "col-md-6 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-secondary",
            currentQuestion: "meetCounselorExit"
        });
    }
    referToESL(){
        this.setState({
            mode: "Refer to the ESL Department",
            legendText: "For information on assessment testing for the ESL department, please use the link below.",
            buttonText: ["Go to ESL Program", "Reset Placement Tool"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-secondary",
            currentQuestion: "referToESL"
        });
    }

    referToDESP(){
        this.setState({
            mode: "Refer to DESP",
            legendText: "Our DESP Counselors will assist you further with your placement. Please call 408-741-2010 or go to the DESP Site to receive additional support.",
            buttonText: ["Go to DESP Site", "Reset Placement Tool"],
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-secondary",
            currentQuestion: "referToDESP"
        });
    }
    

    render(){
        //const showGPA = this.props.showGPA;
        if(this.props.showGenQuestions){
            return (
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
                    ></SelectionButtonContainer>
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }
}
export default GenQuestionsContainer;