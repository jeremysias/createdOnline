import React, {Component} from "react";

import SelectionButton from "./SelectionButton";
import Placement from "./Placement";
import ModalSignInForm from "./ModalSignInForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import TestEmail from './test-email';
//import DebugVariables from "./DebugVariables";
//import NonPlacement from "./NonPlacements";
import Start from "./Start";
import strings from "./Strings";
//import { timeout } from "q";

class Main extends Component{
    constructor(props){
        super(props);
        this.showGPA = this.showGPA.bind(this);
        this.showPlacement = this.showPlacement.bind(this);
        this.setGPA = this.setGPA.bind(this);
        
        this.goToQuestionSet = this.goToQuestionSet.bind(this);
        this.setESL = this.setESL.bind(this);
        this.setPerformance = this.setPerformance.bind(this);
        this.clearStartAt = this.clearStartAt.bind(this);
        this.setAssessmentTaken = this.setAssessmentTaken.bind(this);
        this.resetTool = this.resetTool.bind(this);
        this.printPage = this.printPage.bind(this);
        this.setStudentInfo = this.setStudentInfo.bind(this);
        this.signOut = this.signOut.bind(this);
        this.handleSignOutClose = this.handleSignOutClose.bind(this);
        this.handleSignOutOpen = this.handleSignOutOpen.bind(this);
        this.openSignInForm = this.openSignInForm.bind(this);
        this.closeSignInForm = this.closeSignInForm.bind(this);
        this.setPlacementSubmitted = this.setPlacementSubmitted.bind(this);
        this.setLanguage = this.setLanguage.bind(this);
        this.getLanguageStrings = this.getLanguageStrings.bind(this);
        this.state = {

            showPlacement: false,
            showStartingQuestion: true,
            showLoginForm: true,
            otherCollegePlacement: false,
            showNonPlacement: false,
            showStart: true,
            showSignOutWarning: false,
            gpa: '',
            performance: '',
            highMath: '',
            highMathGrade: '',
            calc: false,
            iep: false,
            path: '',
            apMath: false,
            apEnglish: false,
            fourYearTransfer: false,
            gradeLevel: '',
            resetGPAForm: false,
            esl: false,
            startAt: '',
            assessmentTaken: false,
            debugMode: false,
            signedIn: false,
            firstName: '',
            lastName: '',
            studentId: '',
            birthMonth: '',
            birthDay: '',
            birthYear: '',
            placementSubmitted: false,
            localMode: true,
            language: 'en'
            

        }
        this.url = "/whatsmyid/processAssessment";
    }
    setStudentInfo(student){
        this.setState({
            firstName: student.firstName,
            lastName: student.lastName,
            studentId: student.studentId,
            birthDay: student.birthDay,
            birthMonth: student.birthMonth,
            birthYear: student.birthYear,
            signedIn: true,
            showLoginForm: false
        });
    }
    setGspSource(source){
        this.setState({gspSource: source});
    }
    printPage(){
        window.print();
    }
    
    setLanguage(e){
        //const value = e.target.value;
        //var myStrings = this.getLanguageStrings(value);
        const value = e;
        this.setState({
            language: value,
            //myStrings: myStrings
        });
        var thisThing = this;
        setTimeout(function(){
            thisThing.setState({language: value});
        }, 200);
    }
    getLanguageStrings(){
        //var language = this.state.language;
        if(this.state.language === 'en'){
            return strings.en;
        }
        else if(this.state.language === 'sp'){
            return strings.sp
        }
        return strings.en;
    }

    setAssessmentTaken(myBoolean){
        this.setState({assessmentTaken: myBoolean});
    }
    setPerformance(performance){
        this.setState({performance: performance});
    }
    setGPA(gpa){
        this.setState({gpa: gpa});
    }
    setESL(myBoolean){
        this.setState({esl: myBoolean});
    }

    setHighMathGrade(value){
        this.setState({highMathGrade: value});
    }

    showGPA(){
        this.goToQuestionSet(4);
    }

    clearStartAt(){
        this.setState({
            startAt: ""
        });
    }
    setFourYear(myBoolean){
        this.setState({fourYearTransfer: myBoolean});
    }
    setGradeLevel(value){
        this.setState({gradeLevel: value})
    }
    //hideGPA(){this.setState({showGPAQuestion: false});}
    showGenQuestions(){
        this.setState({
            showCalcQuestions: false,
            showGPAQuestion: false,
            showGenQuestions: true,
            showPlacement: false 
        });
    }
    //hideGenQuestions(){this.setState({showGenQuestions: false});}
    showPlacement(){
        this.goToQuestionSet(7);
    }
    showNonPlacement(){
        this.goToQuestionSet(8);
    }
    showGSP(){
        this.goToQuestionSet(10);
    }
    setPlacementSubmitted(b){ //b should be boolean
        this.setState({placementSubmitted: b})
    }
    //hidePlacement(){this.setState({showPlacement: false});}
    showCalcQuestions(){
        this.setState({
          showCalcQuestions: true,
          showGPAQuestion: false,
          showGenQuestions: false,
          showPlacement: false  
        });
    }

    goToQuestionSet(value){
        let trueFalse = [false, false, false, false, false, false, false, false, false, false, false];
        trueFalse[value] = true;
        //console.log("value:" + value + " " + trueFalse[1] + " " + trueFalse[2]);
        this.setState({
            showStartingQuestion: trueFalse[0],
            showHighSchoolQuestions: trueFalse[1],
            showGuidedQuestions: trueFalse[2],
            showCollegeQuestions: trueFalse[3],
            showGPAQuestion: trueFalse[4],
            showCalcQuestions: trueFalse[6],
            showPlacement: trueFalse[7],
            showNonPlacement: trueFalse[8],
            showStart: trueFalse[9],
            showSelfGuidedPlacement: trueFalse[10]
   
        });
    }
    resetTool(){
        
    

    const params = this.getParams(window.location.href);
        if(params["gsp"] === "true"){
            window.location = "./?gsp=true"
        }
        else{
            window.location = ".";
        }
    }



    getParams(url) {
        var params = {};
        var parser = document.createElement('a');
        parser.href = url;
        var query = parser.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < vars.length; i++) {
          var pair = vars[i].split('=');
          params[pair[0]] = decodeURIComponent(pair[1]);
        }
        return params;
      }
    componentDidUpdate(){
        if(this.state.showPlacement){
            document.getElementById("placementLabel").focus();
        }
    }

    userInfo(){

        const fullName = this.state.firstName + " " + this.state.lastName;


        return(
            <span className="font-weight-bold">{fullName}<br/><span className="float-right">{this.state.studentId}</span></span>
        )
    }

    componentWillMount(){
        if(window.sessionStorage.getItem('mc-placement-signedIn') === 'true'){
            console.log("signed in");
            this.setState({
                signedIn: true,
                showLoginForm: false,
                firstName: window.sessionStorage.getItem('mc-placement-firstName'),
                lastName: window.sessionStorage.getItem('mc-placement-lastName'),
                studentId: window.sessionStorage.getItem('mc-placement-studentId'),
                birthMonth: window.sessionStorage.getItem('mc-placement-birthMonth'),
                birthDay: window.sessionStorage.getItem('mc-placement-birthDay'),
                birthYear: window.sessionStorage.getItem('mc-placement-birthYear'),
            });
        }
    }
    signOut(){
        window.sessionStorage.clear();
        this.resetTool();
    }
    handleSignOutClose(){
        //console.log("closing");
        this.setState({showSignOutWarning: false})
    }
    handleSignOutOpen(){
        this.setState({showSignOutWarning: true})
    }
    openSignInForm(){
        this.setState(
            {showLoginForm: true}
        )
    }
    closeSignInForm(){
        this.setState(
            {showLoginForm: false}
        )
    }
    

    render(){
        const userData = {
            signedIn: this.state.signedIn,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            studentId: this.state.studentId,
            birthMonth: this.state.birthMonth,
            birthDay: this.state.birthDay,
            birthYear: this.state.birthYear,
        }
        const myStrings = this.getLanguageStrings();
        return(
            <div>
                <a aria-label="Skip to Main Content" tabIndex="0" className="skip sr-only sr-only-focusable" href="#main">Skip to Main Content</a>
                <header>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <a href="https://missioncollege.edu" title="Mission College Homepage">
                                    <img className="logo" src="https://web.wvm.edu/images/missioncollege.jpg" alt="Mission College - Link To Homepage"/>
                                </a>
                            <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse" data-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarToggler">
                                
                                
                                <ul className="navbar-nav ml-auto my-2 my-lg-0">
                                    <li className="nav-item">
                                            <a className="nav-link" href="https://missioncollege.edu/student_services/assessment/index.html">Placement and Assessment Services</a>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="https://missioncollege.edu/depts/counseling/default.html">Counseling Office</a>
                                        </li>
                                            
                                        
                                            
                                    
                                </ul>
                                <ul className="navbar-nav my-2 my-lg-0 ml-3">
                                    <li className="nav-item">
                                        <SelectionButton
                                            hide={false}
                                            className="btn btn-secondary"
                                            text="Reset Tool"
                                            onClick={this.resetTool}
                                        />
                                    </li>
                                </ul>
                                <ul className="navbar-nav my-2 my-lg-0 ml-3">
                                    <li className="nav-item">
                                        {this.state.signedIn? 
                                        <SelectionButton
                                            hide={false}
                                            className="btn btn-secondary"
                                            text="Sign Out"
                                            onClick={this.handleSignOutOpen}
                                        /> :
                                            <SelectionButton
                                            hide={false}
                                            className="btn btn-secondary"
                                            text="Sign In"
                                            onClick={this.openSignInForm}
                                        />
                                        }
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        
                    </header>
                <div className="jumbotron" role="main" id="main">
                    <div className="container">
                        
                        <div className="float-right">{this.state.signedIn ? this.userInfo() : "Not Signed in"}</div>
                        <h1 id="mainTitle" > ESL Guided Self-Placement</h1>
                        {(this.state.signedIn || this.state.localMode) ?
                        <Start 
                            show={this.state.showStart}
                            setAssessmentTaken={this.setAssessmentTaken}
                            goToGPA={this.showGPA}
                            setESL={this.setESL}
                            setTransferEnglish={this.setTransferEnglish}
                            setTransferMath={this.setTransferMath}
                            setApEnglish={this.setApEnglish}
                            setApMath={this.setApMath}
                            goToPlacement={this.showPlacement}
                            gpa={this.state.gpa}
                            highMath={this.state.highMath}
                            path={this.state.path}
                            setGPA={this.setGPA}
                            setHighMath={this.setHighMath}
                            setHighMathGrade={this.setHighMathGrade}
                            setPath={this.setPath}
                            setFourYear={this.setFourYear}
                            setPerformance={this.setPerformance}
                            setCalc={this.setCalc}
                            setIep={this.setIep}
                            goToGSP={this.showGSP}
                            setGspSource={this.setGspSource}
                            language={this.state.language}
                            setLanguage={this.setLanguage}
                            myStrings={myStrings}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            studentId={this.state.studentId}
                        />
                        :
                        <div>Please Sign in.</div>
                        }
                        <div id="placementLabel" aria-label="View placements, submit results, and print" tabIndex="-1" className="sr-only sr-only-focusable"></div>
                        {this.state.showPlacement ? 
                        <Placement
                            show={this.state.showPlacement}
                            resetToGPA={this.resetToGPA}
                            state={this.state}
                            resetTool={this.resetTool}
                            printPage={this.printPage}
                            goToGSP={this.showGSP}
                            
                            firstName={this.firstName}
                            lastName={this.lastName}
                            studentId={this.studentId}
                            birthMonth={this.birthMonth}
                            birthDay={this.birthDay}
                            birthYear={this.birthYear}
                            url={this.url}
                            submitted={this.state.placementSubmitted}
                            setSubmitted={this.setPlacementSubmitted}
    
                        />
                        : <div></div>
                        }
                        
                        

                        
                        
                    </div>
                </div>
                <ModalSignInForm 
                    show={this.state.showLoginForm}
                    setStudentInfo={this.setStudentInfo}
                    url={this.url}
                    open={this.openSignInForm}
                    close={this.closeSignInForm}
                    />

                <Modal show={this.state.showSignOutWarning} onHide={this.handleSignOutClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign Out?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="card">
                            <div className="card-body">
                        
                                <p>This will clear all data and reset your session.</p>
                                <p>This will <span className="font-italic">not</span> sign you out of Portal or other services.</p>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <Button variant="primary" onClick={this.signOut} block>
                                            OK
                                        </Button>
                                    </div>
                                    <div className="col-sm-4">
                                        <Button variant="secondary" onClick={this.handleSignOutClose} block>
                                            Cancel
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    
                </Modal>
            </div>
        );
    }
}
export default Main;

/*
Objects needed:
SelectionButton
SelectionDisplay
SelectionDisplayContainer
SelectionButtonContainer
SelectionContainer
SelectionInput
*/