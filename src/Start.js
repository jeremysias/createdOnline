import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
import WritingSample from "./WritingSample";
import WritingComparison from './WritingComparison';
import Results from './Results';
import strings from "./Strings";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleUp, faArrowCircleDown, faSmile } from '@fortawesome/free-solid-svg-icons'



import $ from "jquery";
import Placement from "./Placement";
const arrowUp = <FontAwesomeIcon icon={faArrowCircleUp} />
const arrowDown = <FontAwesomeIcon icon={faArrowCircleDown} />
const smile = <FontAwesomeIcon icon={faSmile} />


//import Modal from 'react-bootstrap/Modal';
class Start extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleGPAChange = this.handleGPAChange.bind(this);
        this.counselorExit = this.counselorExit.bind(this);
        this.onSampleChange = this.onSampleChange.bind(this);
        this.timeSpentWriting = this.timeSpentWriting.bind(this);
        this.writingComplete = this.writingComplete.bind(this);
        //this.state = this.initialState;
        this.myStrings = this.props.myStrings;
        this.state = {
            mode: "Welcome",
            modeNote: "",
            legendText: this.myStrings.q0.q,
            value: ["0","1","2","3","4","5"],
            buttonText: [this.myStrings.q0.a1, this.myStrings.q0.a2],
            buttonDescription: ["","","","",""],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "0",
            language: this.props.language,
            gpaValid: false,
            showGPA: false,
            showQuestion: true,
            readingLevel: 0,
            writingLevel: 0,
            listenSpeakLevel: 0,
            showWritingSample: false,
            showWritingComparison: false,
            promptNumber: 0,
            writingSample: "",
            timeSpentWriting: 0,
            showResults: false
        }
        this.eslCount = 0;
        this.submitGPA = this.submitGPA.bind(this);
        
    }

    getLevelText(level){
        switch (level){
            case 940:
            return "Low Intermediate";
            case 950:
                return "Intermediate";
            case 960:
                return "High Intermediate";
            case 970:
                return "Advanced";
            default:
                return "Something went wrong";

        }
        
    }

    onSampleChange(e){
        this.setState({
            writingSample: e.target.value
        })
    }

    timeSpentWriting(time){
        this.setState({timeSpentWriting: time});
    }
    

    getParams(url) {
        let params = {};
        let parser = document.createElement('a');
        parser.href = url;
        let query = parser.search.substring(1);
        let vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
          let pair = vars[i].split('=');
          params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
      }
    
    goToQuestion(){
        this.setState({
            showGPA: false,
            showQuestion: true
        });
             
    }

    incrementESL(){         
        const increment = this.state.eslCount + 1;
        this.setState({eslCount: increment});
    }

    resetQuestions(){
        this.setState(this.initialState);
    }

    handleClick(e){
        const value = e.target.value;
        const currentQuestion = this.state.currentQuestion;

        

        if(currentQuestion === "0"){ //something
            if(value === "0"){ //degree
                //this.grade11Question();
            }
         
            else if(value === "1"){
                this.creditLevel();
            }
        }
        if(currentQuestion === "creditLevel"){
            if(value === "0"){
                this.readingLevel(940);
            }
            else if(value === "1"){
                this.readingLevel(950);
            }
            else if(value === "2"){
                this.readingLevel(960);
            }
            else if(value === "3"){
                this.readingLevel(970);
            }
            else if(value === "4"){
                this.readingLevel(980);
            }
        }
        if(currentQuestion === "readingLevel"){
            let level = this.state.readingLevel;
            //console.log(value);
            if(value === "0"){
                if(level > 940){
                    level = level - 10;
                }
                this.readingLevel(level);
            }
            else if(value === "1"){
                this.listenSpeakLevel();
            }
            else if(value === "2"){
                if(level < 970){level = level + 10;}
                
                    this.readingLevel(level);
            }
            
        }
        if(currentQuestion === "listenSpeakLevel"){
            let level;
            switch(value){
                case "0": level = 940; break;
                case "1": level = 950; break;
                case "2": level = 960; break;
                case "3": level = 970; break;
                case "4": level = 980; break; 
                default: level = 10;
            }
            this.setState({listenSpeakLevel: level});
            this.writeEssay();
        }
        if(currentQuestion === "writeEssay"){
            this.writingComparison();
        }
        if(currentQuestion === "writingComparison"){
            let level = this.state.writingLevel;
            switch(value){
                case "0":
                    if(level > 940){
                        level = level - 10;
                        this.setState({writingLevel: level})
                    } 
                    break;
                case "1":
                    this.showResults();
                    break;
                case "2":
                    if(level < 980){
                        level = level + 10;
                        this.setState({writingLevel: level})
                    }
                    break;
                default:
            }
        }

 
       // if(this.state.showQuestion){
         //   document.getElementById("instructions").focus();
        //      }
        
    }
    showResults(){
        this.setState({
            showWritingComparison: false,
            showResults: true
        })
    }

    getRandomEssayPromptNumber(){
        const min = 1;
        const max = 3;
        let rand = min + Math.floor(Math.random() * (max - min));
        if(rand === 3) rand = 2;
        return rand;
    }

    writingComplete(time){
        this.setState({
            timeSpentWriting: time
        })
        this.writingComparison();
    }
    writingComparison(){
        
        this.setState({
            
            showWritingSample: false,
            showWritingComparison: true,
            currentQuestion: "writingComparison"
        })
    }

    writeEssay(){
        const str = strings.en.write_essay;
        const rand = this.getRandomEssayPromptNumber();
        this.setState({
            promptNumber: rand,
            legendText: str.q,
            questionNote: str.prompt1,
            showQuestion: false,
            showWritingSample: true,
            currentQuestion: "writeEssay"
        })
    }

    listenSpeakLevel(){
        const str = strings.en.listen_speak_level;
        const levelString = this.getLevelText(this.state.readingLevel);
        const note = <span>You chose Reading Level: <strong>{levelString}</strong>. (Most student choose the same level for Listening and Speaking)</span>;
        this.setState({
            legendText: str.q,
            currentQuestion: "listenSpeakLevel",
            buttonText: [str.a1,str.a2,str.a3,str.a4],
            colClassName: "col-sm-12 p-2",
            questionNote: note 
        })
    }
    creditLevel(){
        const str = strings.en.credit_level;
        this.setState({
            legendText: str.q,
            currentQuestion: "creditLevel",
            buttonText: [str.a1,str.a2,str.a3,str.a4],
            questionNote: str.des
        })
    }
    readingLevel(level){
        
        const str = strings.en.reading_level;
        let sample;
        let buttons = [<span>{str.a1} {arrowDown}</span>,<span>{str.a2} {smile}</span>,<span>{str.a3} {arrowUp}</span>];
        switch(level){
            case 940:
                sample = str.sample_940; 
                buttons = ["-",<span>{str.a2} {smile}</span>,<span>{str.a3} {arrowUp}</span>];
                break;
            case 950:
                sample = str.sample_950; break;
            case 960:
                sample = str.sample_960; break;
            case 970:
                sample = str.sample_970; 
                buttons = [<span>{str.a1} {arrowDown}</span>,<span>{str.a2} {smile}</span>,"-"];
                break;
            case 980:
                sample = str.sample_980;
                buttons = [<span>{str.a1} {arrowDown}</span>,<span>{str.a2} {smile}</span>,"-"];
                break;
            default:
                sample = "Something went wrong";
        }
        this.setState({
            legendText: str.q,
            currentQuestion: "readingLevel",
            questionNote: sample,
            buttonText: buttons,
            btnClassName: "btn btn-lg btn-block btn-primary",
            colClassName: "col-md-4",
            readingLevel: level,
            writingLevel: level
        })

    }


    iepQuestion(){
        this.setState({
            legendText: "Have you ever had an IEP, 504 placement, doctor's diagnosis, or outside assessment for a disability or learning challenge?",
            currentQuestion: "iepQuestion",
            buttonText: ["Yes", "No"]
        });
    }

    noNeedExit(){
        this.setState({
            legendText: "You do not need to use this placement tool. You may enroll in courses for which you have met any prerequisites.",
            currentQuestion: "noNeedExit",
            buttonText: ["View Schedule of classes", "Start Over"],
            colClassName: "col-md-4 col-sm-12",
            btnClassName: "btn btn-lg btn-primary btn-block"
        });
    }

    otherCollege(){
        this.setState({
            legendText: "Have you taken English or Mathematics coursework at another college?",
            buttonText: ["Yes", "No"],
            currentQuestion: "otherCollege",
            btnClassName: "btn btn-block btn-lg btn-primary whitespace-normal"
        });
    }

    counselorExit(){
        this.setState({
            legendText: "Please consult with a counselor. Currently this placement tool cannot provide proper placements for you.",
            buttonText: ["Consult with a counselor", "Start Over"],
            currentQuestion: "counselorExit",
            btnClassName: "btn btn-lg btn-primary btn-block",
            colClassName: "col-md-4",
            showGPA: false,
            showQuestion: true
        });
    }

    eslExit(){
        this.setState({
            legendText: "Mission College offers many English as a Second Language programs. Visit our ESL webpage for information about enrollment and placement.",
            buttonText: ["Visit our ESL website", "Start Over"],
            currentQuestion: "eslExit",
            btnClassName: "btn btn-lg btn-block btn-primary",
            colClassName: "col-md-4",
        });
    }

    counselorExit2(){
        this.setState({
            legendText: "Please consult with a counselor as you may have equivalent coursework from other educational institutions which may make you eligible for higher course placement.",
            buttonText: ["Consult with a counselor", "Start Over"],
            currentQuestion: "counselorExit",
            btnClassName: "btn btn-lg btn-primary btn-block",
            colClassName: "col-md-4"
        });
    }

    concurrentExit(){
        this.setState({
            legendText: "Concurrently enrolled high school students do not need to complete this placement tool. You should make your course selections with the assistance of your high school counselor.",
            buttonText: ["Find more information here", "Start Over"],
            currentQuestion: "concurrentExit",
            btnClassName: "btn btn-lg btn-primary btn-block",
            colClassName: "col-md-4"
        });
    }
    calculusQuestion(){
        this.setState({
            legendText: "Did you enroll in a calculus course in high school or secondary school?",
            buttonText: ["Yes", "No"],
            currentQuestion: "calc"
        });
    }

   

    nativeLanguageQuestion(){
        this.setState({
            legendText: "Is English your native (primary) language?",
            currentQuestion: "native",
           
        });
    }

    expressQuestion(){
        this.setState({
            legendText: "Do you have difficulty expressing yourself in written and spoken English?",
            currentQuestion: "express"
        });
    }

    enrichPlanQuestion(){
        this.setState({
            legendText: "Are you planning to take courses in mathematics or English composition?",
            currentQuestion: "enrichPlan",
            buttonText: ["Yes", "No"],
            btnClassName: "btn btn-block btn-lg btn-primary",
            colClassName: "col-md-3 p-2"
        });
    }

    questionZero(){
        const esl = "I am seeking instruction in English as a Second Language for personal, professional, or academic improvement.";
        const degree = "I seek to take courses to earn a certificate, degree, or to transfer to another college.";
        const enrich = "I am a student taking courses for personal enrichment.";
        const concurrent = "I wish to take college courses while still enrolled in high school";
        this.setState({
            mode: "Welcome",
            modeNote: "",
            legendText: "What is your current educational goal?",
            value: ["0","1","2","3","4","5"],
            buttonText: [degree,esl,enrich,concurrent],
            buttonDescription: ["","","","",""],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary whitespace-normal text-left",
            currentQuestion: "0",
        });
    }

    gradQuestion(){
        this.setState({
            mode: "Graduation Status",
            legendText: "Will you have graduated from high school or secondary school when you begin at Mission College?",
            buttonText: ["Yes", "No",""],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "grad",
            buttonDescription: ["","","",""]

        });
    }
    USStudentQuestion(){
        this.setState({
            mode: "American student?",
            legendText: "Did you attend all four years of US high school?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "us",
            buttonDescription: ["","","",""]

        });
    }
    inHighSchoolQuestion(){
        this.setState({
            mode: "High School Student?",
            legendText: "Are you currently a high school student?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "hs",
            buttonDescription: ["","","",""]

        });
    }
    grade11Question(){
        this.setState({
            mode: "Grade Level",
            legendText: "Have you completed 11th grade or its equivalent at high school or a secondary school?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "gr11",
            buttonDescription: ["","","",""]

        });
    }
    grade11Question2(){
        this.setState({
            mode: "Grade Level",
            legendText: "Will you have completed grade 11 by the time you enroll in college courses?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "gr11-2",
            buttonDescription: ["","","",""]

        });
    }
    estimateGPAQuestion(){
        this.setState({
            mode: "GPA",
            legendText: "Are you able to report your high school grade point average (GPA) on a 4.0 scale?",
            buttonText: ["Yes", "No", "Help with GPA"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "gpa",
            buttonDescription: ["","","",""]
        });
    }

    performanceQuestion(){
        this.setState({
            mode: "Performance",
            legendText: "Please rate your high school performance",
            buttonText: ["My overall grades in high school were above average.", "My overall grades in high school were average.", "My overal grades in high school were below average."],
            currentQuestion: "performance",
            colClassName: "col-md-4 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary whitespace-normal"
            
        })
    }

    

    prevAssessQuestion(){
        this.setState({
            mode: "Past Assessments",
            legendText: "Do you have previously established assessment test scores at Mission College?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "prevAssess",
            buttonDescription: ["","","",""]
        });
    }

    courseWorkQuestion(){
        this.setState({
            mode: "College History",
            legendText: "Have you completed a transfer-level English or Math course?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "courseWork",
            buttonDescription: ["","","",""]
        });
    }

    completedCourseWorkQuestion(){
        this.setState({
            mode: "College History",
            legendText: "Which of the following have you completed?",
            buttonText: ["English 1A or higher", "Transfer-level Math or higher", "Both English 1A and Transfer-level Math"],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left",
            currentQuestion: "completedCourseWork",
            buttonDescription: ["","","",""]
        });
    }

    apGeneralQuestion(){
        this.setState({
            mode: "Advance Placement",
            legendText: "Have you taken the AP test for English or Math?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "apGeneral",
            buttonDescription: ["","","",""]
        })
    }


    apEnglishQuestion(){
        this.setState({
            mode: "Advance Placement",
            legendText: "Did you score 3 or higher on the AP English Test?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "apEnglish",
            buttonDescription: ["","","",""]
        })
    }

    apMathQuestion(){
        this.setState({
            mode: "Advance Placement",
            legendText: "Did you score 3 or higher on Math AB or Math BC?",
            buttonText: ["Yes", "No"],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "apMath",
            buttonDescription: ["","","",""]
        })
    }

    handleGPAChange(e){
        const newGpa = e.target.value;
        this.props.setGPA(newGpa);
        //this.setState({gpa: newGpa});
        //const regex1 = RegExp('^[0-3].[0-9]$|^[4].[0]$');
        const regex1 = RegExp('^[0-4]\\.[0-9]{1,2}$');
        if( regex1.test(newGpa) ){
            
            //this.calculusQuestion();
            //this.goToQuestion();
            this.setState({gpaValid: true});
            //this.setState({goToQuestion: true, gpaValid: true});
        }
        else{
            this.setState({gpaValid: false});
        }
        
    }

    submitGPA(){
        if(this.state.gpaValid === true){
            this.calculusQuestion();
            this.goToQuestion();
        }
    }

    highMathQuestion(){
        this.setState({
            mode: "Mathematics",
            legendText: "What is the highest math course that you have taken or are currently taking?",
            buttonText: ["Algebra I, Geometry, Integrated Math I, Integrated Math II or lower", "Algebra II or Integrated Math III", "College Algebra (Advanced Algebra)", "Pre-Calculus", "Calculus"],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary text-left",
            currentQuestion: "highMath",
            buttonDescription: ["","","","","",""]
        })
    }

    highMathGradeQuestion(){
        this.setState({
            mode: "Mathematics",
            legendText: "Please estimate your grade in your highest math course.",
            buttonText: ["A", "B", "C", "D", "F"],
            colClassName: "col-md-2 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "highMathGrade",
            buttonDescription: ["","","","","",""]

        })
    }

    transfer4YearQuestion(){
        this.setState({
            mode: "Future plans",
            modeNote: "",
            legendText: "Do you plan to transfer to a four-year university to earn a Bachelor's degree?",
            buttonText: ["Yes", "No"],
            buttonDescription: ["","","","","","","",""],
            colClassName: "col-md-3 col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            currentQuestion: "transfer4Year"
        })
    }

    pathQuestion(){
        this.setState({
            mode: "Path",
            legendText: "Currently, which path are you considering?",
            buttonText: ["BSTEM: Business, Science Technology, Engineering, or Math", "Liberal Arts and Non-Stem Majors"],
            colClassName: "col-sm-12 p-2",
            currentQuestion: "path"
        })
    }

    modeNote(){
        return(<div className="pb-4">{this.state.modeNote}</div>);
    }

    componentDidUpdate(){
        if(this.state.showQuestion){
            document.getElementById("instructions").focus();
        }  
    }
    render(){
        console.log("Testing Changes");
        
        if(!this.props.show){
            return null;

        }
        else{
            return(
                <div>
                    {(this.state.modeNote === "")? null: this.modeNote()}
                    <span tabIndex="0" className="sr-only sr-only-focusable" id="instructions" aria-label="Next Question"></span>
                    {this.state.showQuestion ? 
                        <SelectionButtonContainer
                            colClassName={this.state.colClassName}
                            className={this.state.btnClassName}
                            show={this.state.showQuestion}
                            id="myButton"
                            legend={this.state.legendText}
                            onClick={this.handleClick}
                            text={this.state.buttonText}
                            value={this.state.value}
                            buttonDescription={this.state.buttonDescription}
                            questionNote={this.state.questionNote}
                        /> : null
                    }
                    {(this.state.showWritingSample === true) ? 
                        <WritingSample
                            promptNumber={this.state.promptNumber}
                            legend={this.state.legendText}
                            questionNote={this.state.questionNote}
                            getWritingSample={this.getWritingSample}
                            onSampleChange={this.onSampleChange}
                            handleClick={this.handleClick}
                            writingComplete={this.writingComplete}
                        />: null}
                    {(this.state.showWritingComparison === true) ? 
                        <WritingComparison
                            writingSample={this.state.writingSample}
                            otherSampleNumber={this.state.writingLevel}
                            handleClick={this.handleClick}
                            arrowUp={arrowUp}
                            arrowDown={arrowDown}
                            smile={smile}
                        />: null}
                    {(this.state.showResults) ?
                        <Results
                            firstName={this.props.firstName}
                            lastName={this.props.lastName}
                            studentId={this.props.studentId}
                            promptNumber={this.state.promptNumber}
                            writingSample={this.state.writingSample}
                            timeSpentWriting={this.state.timeSpentWriting}
                            readingLevel={this.state.readingLevel}
                            writingLevel={this.state.writingLevel}
                            listenSpeakLevel={this.state.listenSpeakLevel}
                        />: null
                    }
                </div>
            );
        }
    }

}
export default Start;