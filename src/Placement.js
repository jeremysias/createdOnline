import React, {Component} from "react";
import SelectionButton from "./SelectionButton";
import ModalSubmitForm from "./ModalSubmitForm";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
//import {renderToStaticMarkup} from 'react-dom/server';
import $ from "jquery";
//const mathText = [ "Algebra I, Geometry, or lower","Algebra II","Pre-Calculus","Calculus"];
//const pathText = ["STEM","Liberal Arts (Non STEM)", "Business Major"];
class Placement extends Component{
    constructor(props){
        super(props);

        //this.iepAlert = this.iepAlert.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            showOptOutEnglish: false,
            showOptOutMath: false,
            mathPlacement: '',
            englishPlacement: '',
            acceptOrDeclineEnglish: '',
            acceptOrDeclineMath: '',
            printClass: "btn btn-primary btn-block",
            printText: '',
            pageState: "",
            autoSubmit:{
                submitted: false,
                status: "idle",
                show: false
            }
            
        }
        this.formData= {
            command: 'report-result',
            campus: 'mission',
            firstName: this.props.state.firstName,
            lastName: this.props.state.lastName,
            studentId: this.props.state.studentId,
            birthMonth: this.props.state.birthMonth,
            birthDay: this.props.state.birthDay,
            birthYear: this.props.state.birthYear,
            englishPlacement: null,
            mathPlacement: null,
            calcReport: null,
            formState: 'form',
            response: '',
            iep: null
        }
        this.mathPlacement = '';
        this.finalMathPlacement = '';
        this.englishPlacement = '';
        this.finalEnglishPlacement = '';
        this.ENGLISH1A = "ENG 001A";
        this.ENGLISH1AX = "ENG 001AX";
        this.ESL = "ESL";
        this.setPrintClass = this.setPrintClass.bind(this);
        this.messages = {
            misc:{
                optOut: "Students have the right to opt out of the recommended placement. Click Decline below to access a standard transfer level course.",
                attention: "Attention! You can only submit the acceptance of placement once. If you have questions about your placement result, please consult with a counselor before submitting your acceptance.",
                declineInFavor: "I decline this placement in favor of:",
                na: "Not Applicable"

            },
            english:{
                oneA:{
                    title: "ENG 001A",
                    description: "English Composition",
                    ap: "Due to AP results, you may be eligible for a higher English course. Please consult with a counselor to detrmine how your AP test scores will apply toward placement or academic credit."
                },
                oneAX:{
                    title: "ENG 001AX",
                    description: "Intensive English Composition",
                    info: "ENG 001AX is a 5-unit transfer level English class with additional support included.",
                    decline: "I understand I am currently placed into a course that gives me the highest probability of success, based on research about student high school grade point average and college course success."
                },
                esl:{
                    title: "ESL",
                    description: "English as a Second Language",
                    info: "Your answers indicate you may benefit from ESL coursework prior to enrollment in transfer-level English composition.",
                    accept: "Please submit your results, then visit the Assessment Center webpage for information on ESL placement testing.",
                    decline: "I understand that this recommendation gives me the highest probability of success, based on research about student high school grade point average and college course success."
                }
            },
            math:{
                ten: {
                    title: "MAT 010",
                    description: "Elementary Statistics",
                    support: {
                        title: "MAT 910X",
                        description: "Math Skills for Success in Statistics"
                    }
                },
                twelve: {
                    title: "MAT 012",
                    description: "Calculus for Business",
                    support: {
                        title: "MAT 912X",
                        description: "Math Skills for Success in Calculus for Business"
                    }
                },
                g:{
                    title: "MAT 000G",
                    description: "Mathematics for the Liberal Arts Student"
                },
                n0n:{
                    title: "MAT 909",
                    description: "Integrated Statistics I"
                },
                nine:{
                    title: "MAT 009",
                    description: "Integrated Statistics II"
                },
                one:{
                    title: "MAT 001",
                    description: "College Algebra",
                    support: {
                        title: "MAT 901X",
                        description: "Math Skills for Success in College Algebra"
                    }
                },
                d:{
                    title: "MAT 000D",
                    description: "Trigonometry",
                    support: {
                        title: "MAT 900DX",
                        description: "Math Skills for Success in Trigonometry"
                    }
                },
                two:{
                    title: "MAT 002",
                    description: "Pre-Calculus Algebra and Trigonometry"
                }

            }
        }
        
    }

    handleClose(){
        var obj = {
            submitted: this.state.autoSubmit.submitted,
            status: this.state.autoSubmit.status,
            show: false
        }
        this.setState({
            autoSubmit: obj
        });
    }
    setPrintClass(className){
        this.setState({printClass: className});
    }

    setFinalMathPlacement(value){
        this.finalMathPlacement = value;
    }
    setFinalEnglishPlacement(value){
        this.finalEnglishPlacement = value;
    }

    otherCollegePlacement(){
        return(
            <div className="card">
                <div className="card-header"><strong>Apply Placement from other college</strong></div>
                    <p card-text>You can apply placement results from other colleges by submitting your official placement results with your Mission Student ID number via <a href="mailto:assessment.center@missioncollege.edu?subject=Do%20you%20have%20my%20transcript%20on%20file%3F" title="Email the assessment center">email</a> or visit the Assessment Center.</p>
                    <p>If you have equivalent coursework from other educational institutions, <a href="http://www.missioncollege.edu/admissions/prerequisites.html" target="_blank" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>
                    <p>Please <a href="https://esars.wvm.edu/eSARS/MC-Counseling/eSARS.asp?WCI=Init&WCE=Settings" target="_blank" rel="noopener noreferrer">consult with a counselor</a> to determine the most appropriate courses for your educational goals and request an educational plan.</p>
                    <p>Remember! Bring your unofficial transcripts from previously attended college(s) when meeting a counselor.</p>


                </div>
        )
    }

    haveAssessmentOnFile(){
        return(
            <div className="card">
                <div className="card-header"><strong></strong></div>
            </div>
        )
    }

    noMathRequired(){
        return(
            <div>
                <p className="card-title"><strong>Completed Transfer-level Math</strong></p>
                <p>You may be eligible for a higher course placement because you have indicated that you passed Transfer-level Math. If you have equivalent coursework from other educational institutions, <a href="http://www.missioncollege.edu/admissions/prerequisites.html" target="_blank" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>
                <p>Please <a href="https://esars.wvm.edu/eSARS/MC-Counseling/eSARS.asp?WCI=Init&WCE=Settings" target="_blank" rel="noopener noreferrer">consult with a counselor</a> to determine the most appropriate courses for your educational goals and request an educational plan.</p>
                <p>Remember! Bring your unofficial transcripts from previously attended college(s) when meeting a counselor.
                </p>
            </div>
        )

    }
    noEnglishRequired(){
        return(
            <div>
                <p className="card-title"><strong>Completed Transfer-level English</strong></p>
                <p>You may be eligible for a higher course placement because you have indicated that you passed Transfer-level English. If you have equivalent coursework from other educational institutions, <a href="http://www.missioncollege.edu/admissions/prerequisites.html" target="_blank" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>
                <p>Please <a href="https://esars.wvm.edu/eSARS/MC-Counseling/eSARS.asp?WCI=Init&WCE=Settings" target="_blank" rel="noopener noreferrer">consult with a counselor</a> to determine the most appropriate courses for your educational goals and request an educational plan.</p>
                <p>Remember! Bring your unofficial transcripts from previously attended college(s) when meeting a counselor.
                </p>
            </div>
        )

    }
    optOutEnglish(){
        return(
            <div>

            </div>
        )
    }
    optOutMath(){
        return(
            <div></div>
        )
    }

    //ENGLISH Placements
    
    english1A(){
        this.englishPlacement = this.messages.english.oneA.title;
        return(
            <div>
                
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <strong>{this.messages.english.oneA.title}: </strong>{this.messages.english.oneA.description}
                    </li>
                </ul>
            </div>
        )
    }
    english1Ax(){
        //this.setState({showOptOutEnglish: true});
        this.englishPlacement = this.messages.english.oneAX.title;
        return(
            <div>
                <ul className="list-group-flush">
                    <li className="list-group-item">
                        <strong>{this.messages.english.oneAX.title}: </strong>{this.messages.english.oneAX.description}
                    </li>
                    
                </ul>
            </div>
        )
    }

    esl(){
        return(
            <div>
                <ul className="list-group-flush">
                    <li className="list-group-item">{this.messages.english.esl.info}</li>
                    <li className="list-group-item"><a href="https://missioncollege.edu/depts/ESL" target="_blank" rel="noopener noreferrer">Find information about our ESL programs and placement procedures here</a></li>
                </ul>
            </div>
        )
    }
    eslOnly(){
        //this.setState({showOptOutEnglish: true});
        this.englishPlacement = this.ESL;
        return(
            <div>
                <p><strong>{this.messages.english.esl.title}</strong> - {this.messages.english.esl.description}</p>
                <p>{this.messages.english.esl.info}</p>
                <p>For information to place you into your ESL courses, please <a href="http://www.missioncollege.edu/student_services/assessment/esl.html" target="_blank" rel="noopener noreferrer">click here for ESL testing requirements</a></p>
                <p>Thank you for choosing to take classes at Mission College! Since you are choosing to take ESL subject only and not currently planning on taking English or Math courses, you are not required to complete the Placement Assistant tool. However, if you plan to take Math or a course that requires an English or Math prerequisite* at a later date, you can then complete the Placement Assistant Tool.</p>
                <p>If you have equivalent coursework from other educational institutions, <a href="http://www.missioncollege.edu/admissions/prerequisites.html" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>

            </div>
        )
    }



    getEnglishPlacement(){
        
        if(this.props.state.esl === true){
            this.englishPlacement = this.messages.english.esl.title;
            return 5;
        }

        if(this.props.state.hasTransferEnglish === true){
            this.englishPlacement = 'NA - refer to prerequisite clearance';
            return 0;
        }

        if(this.props.state.apEnglish === true){
            this.englishPlacement = this.messages.english.oneA;
            return 4;
        }

        const gpa = this.props.state.gpa;
        //const performance = this.props.state.performance;
        if(gpa >= '2.6'){
            return 1;
        }
        else {
            return 2;
        }
        


    }
    getEnglishMessage(x){
        if(x === 0){
            return(
            <div>
                {this.noEnglishRequired()}
            </div>
            )
        }
        if(x === 1){
            
                return(
                    <div>{this.english1A()}</div>
                );
            
        }
        if(x === 2){    
            return(
                <div>
                    {this.english1Ax()}
                </div>
            )
        }
        
        if(x === 4){
            return(
                <div>
                    <p><strong>{this.messages.english.oneA.title}</strong> - {this.messages.english.oneA.description}</p>
                    <p>{this.messages.english.oneA.ap}</p>
                </div>
            )
        }
        if(x === 5){
            return(
                <div>
                    {this.esl()}
                </div>
            )
        }
    }

    defaultEnglishMessage(){
        return(
            <div>
                <p>No English Placement available</p>
            </div>
        )
    }
    defaultMathMessage(){
        return(
            <div>
                <p>No Math Placement available</p>
            </div>
        )
    }

    

    getMathMessage(x){
        const math = this.messages.math;
        if(x === 1){//lib arts 3.0 or higher
            this.mathPlacement = 'MAT 010 or MAT 000G';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description}</li>
                        <li className="list-group-item"><strong>{math.g.title}:</strong> {math.g.description}</li>
                    </ul>
                </div>
            )
        }
        else if(x === 2){//lib arts 2.9 or lower
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'Math 010 with MAT 910X';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description} <span className="font-italic">with</span> <strong>{math.ten.support.title}:</strong> {math.ten.support.description}</li>
                        
                        <li className="list-group-item"><strong>{math.g.title}:</strong> {math.g.description}</li>
                        <li className="list-group-item"><strong>{math.n0n.title}:</strong> {math.n0n.description} <span className="font-italic">followed by</span> <strong>{math.nine.title}:</strong> {math.nine.description}</li>
                    </ul>
                    
                </div>
            )
        }
        /*
        else if(x === 3){//lib arts 2.2 or lower
            return(
            <div>
                <p><strong>Math 8, 10, 14, or G</strong></p>
                <p>Math 10C is <strong>strongly recommended</strong> when taking Math 10.</p> 
            </div>
            )
        }
        */
        else if(x === 4){//10 and 12 without support
            this.mathPlacement = 'MAT 012';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description}</li>
                        <li className="list-group-item"><strong>{math.twelve.title}:</strong> {math.twelve.description}</li>
                    </ul>
                </div>
            )
        }
        else if(x === 5){//10 with support and 12 without
            
            this.mathPlacement = 'MAT 012 with MAT 012C';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.twelve.title}:</strong> {math.twelve.description}</li>
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description} <span className="font-italic">with</span> <strong>{math.ten.support.title}:</strong> {math.ten.support.description}</li>
                        
                    </ul>
                </div>
            )
        }
        else if(x === 6){//12 with support nad 10 without
            
            this.mathPlacement = 'MAT 010';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        
                        <li className="list-group-item"><strong>{math.twelve.title}:</strong> {math.twelve.description} <span className="font-italic">with</span> <strong>{math.twelve.support.title}:</strong> {math.twelve.support.description}</li>
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description}</li>
                    </ul>
                    
                </div>
            )
        }
        else if(x === 7){//10 with support and 12 with support
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 010 with MAT 010X';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        
                        <li className="list-group-item"><strong>{math.twelve.title}:</strong> {math.twelve.description} <span className="font-italic">with</span> <strong>{math.twelve.support.title}:</strong> {math.twelve.support.description}</li>
                        <li className="list-group-item"><strong>{math.ten.title}:</strong> {math.ten.description} <span className="font-italic">with</span> <strong>{math.ten.support.title}:</strong> {math.ten.support.description}</li>
                    </ul>
                </div>
            )
        }
        else if(x === 8){//bus 2.5 or lower with Pre-Calculus
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 010 with MAT 10X and MAT 012 with MAT 12X';
            return(
                <div>
                    <p><strong>Math 10 and Math 12</strong></p>
                    <p>Math 10C is recommended when taking Math 10</p>
                    <p>Math 12C is recommended when taking Math 12</p>
                </div>
            )
        }
        else if(x === 9){//bus 2.5 or lower with no Pre-Calculus
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 010 with MAT 910X and MAT 012 with MAT 912X';
            return(
                <div>
                    <p><strong>Math 10 and Math 12</strong></p>
                    <p>Math 10C is <strong>strongly</strong> recommended when taking Math 10</p>
                    <p>Math 12C is <strong>strongly</strong> recommended when taking Math 12</p>
                </div>
            )
        }
        else if(x === 10){//bus and has not taken Algebra 2
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 106 with MAT 106C';
            return(
                <div><p>It is highly recommended to begin with Math 106 and Math 106C together before taking Math 10 and Math 12.</p></div>
            )
        }
        else if(x === 11){//stem and 3 or higher on AP Calculus
            this.mathPlacement = 'NA - AP';
            return(
                <div>
                    <p>Please meet with a counselor to discuss college credit, enrollment, and transferability of your AP tests.</p>
                    
                </div>
            )
        }
        else if(x === 12){//Pre-Calc or Calc with C or better
            this.mathPlacement = 'MAT 003A';
            return(
                <div>
                    <p><strong>MAT 003A</strong></p>
                </div>
            )
        }
        else if(x === 13){//STEM and (GPA 3.4 or higher OR GPA 2.6 or higher and took Calculus)
            this.mathPlacement = 'MAT 001, MAT 000D, MAT 002, MAT 012';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.one.title}:</strong> {math.one.description}</li>
                        <li className="list-group-item"><strong>{math.d.title}:</strong> {math.d.description}</li>
                        <li className="list-group-item"><strong>{math.two.title}:</strong> {math.two.description}</li>
                    </ul>
                </div>
            )
        }
        else if(x === 14){//STEM GPA less than 3.4 and no precalc
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 001 with 901X, MAT 000D with 90DX, MAT 012 with 912X - co-requisites recommended';
            return(
                <div>
                    <div className="card-title">Select from these courses:</div>
                    <ul className="list-group-flush">
                        <li className="list-group-item"><strong>{math.one.title}:</strong> {math.one.description} <span className="font-italic">with</span> <strong>{math.one.support.title}:</strong> {math.one.support.description}</li>
                        <li className="list-group-item"><strong>{math.d.title}:</strong> {math.d.description} <span className="font-italic">with</span> <strong>{math.d.support.title}:</strong> {math.d.support.description}</li>
                        
                    </ul>
                </div>
            )
        }
        else if(x === 15){//BSTEM GPA below 2.6 and has not taken Pre-Calculus
            //this.setState({showOptOutMath: true});
            this.mathPlacement = 'MAT 001 with 901X, MAT 00D with 900DX, MAT 012 with 912X - co-requisites required';
            return(
                <div>
                    <p>Take one of the following courses with the <strong>required</strong> co-requisite</p>
                    <p><strong>MAT 001</strong> <span className="font-italic">with</span> co-requisite <strong>MAT 901X</strong></p>
                    <p><strong>MAT 000D</strong> <span className="font-italic">with</span> co-requisite <strong>MAT 900DX</strong></p>
                    <p><strong>MAT 012</strong> <span className="font-italic">with</span> co-requisite <strong>MAT 912X</strong></p>
                </div>
            )
        }
        else if(x === 16){ //AP Math
            this.mathPlacement = 'MAT 003A - AP';
            return(
                <div>
                    <p><strong>Math 3A</strong></p>
                    <p>Due to your AP results, you may be eligible for a higher Math course. Please meet with a counselor.</p>
                </div>
            )
        }
        else if(x === 17){//has Transfer Math
            this.mathPlacement = 'NA - refer to prerequisite clearance';
            return(
                <div>
                    <div>
                   {this.noMathRequired()}
                </div>
                </div>
            )
        }
        else if(x === 18){
            return(
                <div>
                    <p></p>
                </div>
            )
        }
        else if(x === 19){
            return(
                <div>
                    <p></p>
                </div>
            )
        }
        else if(x === 20){
            return(
                <div>
                    <p></p>
                </div>
            )
        }
        else if(x === 21){
            return(
                <div>
                    <p></p>
                </div>
            )
        }
        else if(x === 10){
            return(
                <div>
                    <p></p>
                </div>
            )
        }
        /*
        else if(x === 4){
            return(
                <div>
                    <p><strong>Math 1,2, or D</strong></p>
                    <p>Bring your academic transcript to the counseling office if you wish to take Calculus or higher.</p>
                </div>
            )
        }
        else if(x === 5){
            return(
                <div>
                <p><strong>Math 1,2, or D</strong></p>
                <p>Additional academic support recommended</p>
                </div>
            )
        }
        else if(x === 6){
            return(
                <div>
                <p><strong>Math 1,2, or D</strong></p>
                <p>Additional academic support strongly recommended</p>
                </div>
            )
        }
        */
        else{
            return(<div></div>);
        }
    }

    getLibArtsPlacemement(){
        const gpa = this.props.state.gpa;
        if(gpa >= 3.0){
            return 1;
        }
        else{
            return 2;
        }
    }
    
    getStemPlacement(){
        const gpa = this.props.state.gpa;
        const calc = this.props.state.calc;
        if(gpa >= 3.4){
            return 13;
        }
        else if(gpa >= 2.6 && calc === true){
            return 13;
        }
        else{
            return 14;
        }
    }

    getBusCalcPlacement(){
        const gpa = this.props.state.gpa;
        const calc = this.props.state.calc;
        if(gpa >= 3.4){
            return 1;
        }
        else if(gpa >= 2.6 && calc === true){
            return 1;
        }
        else{
            return 2;
        }
        
    }

    getStatsPlacement(){
        const gpa = this.props.state.gpa;
        if(gpa >= 3.0){
            return 1;
        }
        else{
            return 2;
        }
    }
    getBusPlacement(twelve, ten){
        if(twelve === 1){
            if(ten === 1){
                return 4;
            }
            if(ten === 2){
                return 5;
            }
        }
        else if(twelve === 2){
            if(ten === 1){
                return 6;
            }
            if(ten === 2){
                return 7;
            }
        }

    }

    
    getScore(){
        const gpa = this.props.state.gpa;
        
        let score = Math.round(gpa * 100);
        if(score < 100){
            score = 100;
        }

        //console.log("score: " + score);
        return score;
    }

    
    showFormButton(){

    }

    iepAlert(){
        return (
            <div className="alert alert-danger">Below are your English and math placements. However, your answers indicate that you may benefit from meeting with our <a className="btn btn-link" href="https://missioncollege.edu/depts/disability-support-programs/" target="_blank" rel="noopener noreferrer">Disability Support Programs and Services counselor</a> to help identify the best placement options for you.</div>
        )
    }

    submitResults(){
       
        const params = this.formData;
        //console.log(this.state);
        //this.setState({formState: "spinner"});
        const thisThing = this;
        const url = this.props.url;
        var jqxhr = $.post(url, params, function(){
            //console.log("success");
            
        })
        .done(function(data){
            //console.log("second success");
            //console.log(data);
            thisThing.setState(
                {
                    formState: "response", 
                    response: data,
                    autoSubmit:{
                        submitted: true,
                        status: "submitted",
                        show: true
                    }
                }
            );
            if(thisThing.state.response === "complete")
            {
                thisThing.setState({
                    printText: "Results have been submitted and email sent. Print your results and bring to counseling session."
                })

            }
            else if(thisThing.state.response === "past history found"){
                thisThing.setState({
                    printText: "Results have already been submitted, but you may print and use this result instead."
                })
            }
            else {
                thisThing.setState({
                    printText: "Print your results."
                })
            }
        })
        .fail(function(error){
            console.log("error");
            //console.log(error.responseText);
            thisThing.setState(
                {
                    formState: "response", 
                    response: "error",
                    
                }
            );
        })
        .always(function(){
            //console.log("finished");
        })
        jqxhr.always(function(){
            //console.log("second finished");
        })
    }

    spinner(){
        return(
            <div className="modal-body d-flex justify-content-center">
                <div className="spinner-grow spinner-grow-lg text-primary m-5" role="status">
                    <span className="sr-only">Please Wait...</span>
                </div>
            </div>
        );
    }

    handleResponse(){
        //console.log(this.state.response);
        //console.log(this.state);
        if(this.state.response === "complete" || this.state.response === "placement complete"){
            
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                            <div className="alert alert-info">Your results have been submitted. Please print your results and take them with you to orientation.</div>
                        </div>
                    </div>
                </div>
            );
        }
        else if(this.state.response === "past history found"){
            //this.props.setPrintClass("btn btn-primary btn-block");
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           <div className="alert alert-info">Records indicate the your results have already been submitted.  You are now able to register for transfer-level Math and English courses.  Please see a counselor for additional guidance or you may choose to use the Guided Self-Placement tool to explore the full-range of English and Math course offerings before making a course selection.</div> 
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.response === "previous placement found"){
            //this.props.setPrintClass("btn btn-primary btn-block");
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           <div className="alert alert-info">Records indicate that your GPA-based placement has already been submitted. Please <strong>see a counselor</strong> for additional guidance or see <strong>Other Course Options</strong> to explore the full-range of English and Math course offerings before making a course selection.</div> 
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.response === "no match"){
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           <div className="alert alert-danger">Information submitted does not match our records. Please verify your birthdate and student id, then try again. If it still does not work, please notify the admissions office. </div>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={this.showForm}>OK</button>
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.response === "error"){
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           Something went wrong. Please try again later.
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={this.showForm}>OK</button>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return null;
        }

    }

    componentDidMount(){
        
        if(this.props.state.signedIn){
            console.log("Submitting Results")
            this.setState({
                    autoSubmit:{
                        submitted:false,
                        show: true,
                        status: "submitting"
                    }
                }
            );
            this.submitResults();
        }
        /*
        if(this.props.submitted === false){
            console.log("Placement Mounted");
            console.log("Math Placement: " + this.formData.mathPlacement);
        }
        else{
            console.log("submitted not false");
        }
        */
    }
    render(){
        console.log(this.state.autoSubmit.show);
        if(this.props.show){
            
            const englishPlacementCode = this.getEnglishPlacement();
            
            const libCode = this.getLibArtsPlacemement();
            const stemCode = this.getStemPlacement();
            const busCode = this.getBusCalcPlacement();
            const statsCode = this.getStatsPlacement();
            const busPathCode = this.getBusPlacement(busCode, statsCode);
            const englishPlacement = this.getEnglishMessage(englishPlacementCode);
            const libMsg = this.getMathMessage(libCode);
            const stemMsg = this.getMathMessage(stemCode);
            const busMsg = this.getMathMessage(busPathCode);
            //const statsMsg = this.getMathMessage(statsCode);
            //console.log("statsCode: " + statsCode + " busCode: " + busCode + " busPathCode: " + busPathCode);
            const score = this.getScore();
            const scoreString = score.toString();
            const calcReport = this.props.state.calc ? '1': '0';
            const iep = this.props.state.iep ? '1': '0';

            this.formData.mathPlacement=scoreString;
            this.formData.englishPlacement=(this.props.state.esl === true)? "000" : scoreString;
            this.formData.calcReport=calcReport;
            this.formData.iep=iep;
            this.formData.libCode = libCode;
            this.formData.stemCode = stemCode;
            this.formData.busPathCode = busPathCode;
            this.formData.englishPlacementCode = englishPlacementCode;
            this.formData.response = '';
            
            
                
            
            
            return(
                <div>
                    {this.props.state.iep? this.iepAlert(): null}
                    <div role="grid">
                        <div className="row" role="row">
                            <div className="col-lg-8" >
                            <div className="p-2" role="columnheader"><h2>My Placements</h2></div>
                                <div className="alert">All students are encouraged to meet with a counselor after receiving placements for additional guidance in determining the most appropriate courses for your educational goals.</div>
                                <div className="p-2" role="columnheader"><h3>English Placement</h3></div>
                                <div className="card mb-4" role="cell">
                                    <div className="card-header"><strong>English:</strong></div>
                                    <div className="card-body">{englishPlacement}</div>
   
                                </div>
                                <div className="p-2" role="columnheader"><h3>Math Pathways</h3></div>
                                <div className="alert d-print-none"><a className="btn btn-link" target="_blank" rel="noopener noreferrer" href="https://web.wvm.edu/placement-tool-mc/Which-Math-Pathway-Should-I-Choose.pdf" title="Help with your math pathway">Which math pathway should I choose?</a></div>
                                
                                <div className="card mb-4" role="cell">
                                    <div className="card-header"><strong>Liberal Arts Mathematics Pathway:</strong></div>
                                    <div className="card-body">{libMsg}</div>
    
                                </div>
                                <div className="card mb-4" role="cell">
                                    <div className="card-header" title="Choose this pathway for Science, Technology, Engineering, and Mathematics"><strong>STEM Mathematics Pathway:</strong></div>
                                    <div className="card-body">
                                        {stemMsg}
                                        <p className="alert alert-info">Students may enroll in MAT 003A: Analytical Geometry and Calculus by providing a high school transcript to Placement and Assessment Services showing completion of pre-calculus with a grade of C or better.</p>
                                    </div>
   
                                </div>
                                <div className="card mb-4" role="cell">
                                    <div className="card-header"><strong>Business Mathematics Pathway:</strong></div>
                                    <div className="card-body">{busMsg}</div>

                                </div>
                                
                                
                            </div>
                            <div className="col-lg-4 d-print-none" >
                                {this.props.state.signedIn? null :
                                    <div role="cell">
                                        <ModalSubmitForm
                                            mathPlacement={scoreString}
                                            englishPlacement={(this.props.state.esl === true)? "000" : scoreString}
                                            calcReport={calcReport}
                                            iep={iep}
                                            show={true}
                                            setPrintClass={this.setPrintClass}
                                            url={this.props.url}
                                        />
                                    </div>
                                }
                                <div className="card mt-4" role="cell">
                                    <div className="card-body">
                                        <h2>Print Results</h2>
                                        <p>{this.state.printText}</p>
                                           <SelectionButton
                                            hide={false}
                                            className={this.state.printClass}
                                            text="Print"
                                            onClick={this.props.printPage}
                                            />
                                    </div>
                                </div>
                                
                                <div className="card mt-4" role="cell">
                                    <div className="card-body">
                                        <h2>Other Course Options</h2>
                                        <p>Although your high school performance data indicates these are the best placements for you, there are other English or Math courses which may better fit your needs. If you wish to explore options, our Guided Self-Placement tool allows you to learn more, confirm your placements, or choose alternate courses. Before beginning Guided Self-Placement, submit your placement results using the button in the box above.</p>
                                        <SelectionButton
                                            hide={false}
                                            className="btn btn-primary btn-block"
                                            text="Begin Guided Self-Placement"
                                            onClick={this.props.goToGSP}
                                        />
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    <Modal show={this.state.autoSubmit.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Placement Submission</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        {(this.state.autoSubmit.status === "submitting")? this.spinner(): (this.state.autoSubmit.status === "submitted")? this.handleResponse(): "something is wrong"}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                               Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }
        else{
            return ('');
        }
    }
}
export default Placement;