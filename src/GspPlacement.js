import React, {Component} from "react";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import $ from "jquery";
import SelectionButton from "./SelectionButton";

import ModalSubmitForm from "./ModalSubmitForm.1";
//const mathText = [ "Algebra I, Geometry, or lower","Algebra II","Pre-Calculus","Calculus"];
//const pathText = ["STEM","Liberal Arts (Non STEM)", "Business Major"];
class GspPlacement extends Component{
    constructor(props){
        super(props);
        this.setPrintClass = this.setPrintClass.bind(this);
        this.printPage = this.printPage.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.state = {
            printClass: "btn btn-primary btn-block",
            printText: '',
            response: '',
            formState: 'form',
            autoSubmit:{
                submitted: false,
                status: "idle",
                show: false
            }
        }
        this.formData= {
            command: 'report-result',
            campus: 'mission',
            firstName: this.props.userData.firstName,
            lastName: this.props.userData.lastName,
            studentId: this.props.userData.studentId,
            birthMonth: this.props.userData.birthMonth,
            birthDay: this.props.userData.birthDay,
            birthYear: this.props.userData.birthYear,
            englishPlacement: '',
            mathPlacement: '',
            mathChoice: this.props.mathChoice,
            englishChoice: this.props.englishChoice,
        }
    }

    submitResults(){
        
        const params = this.formData;
        //console.log(this.state);
        this.setState({formState: "spinner"});
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
                    response: "error"
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

    handleResponse(){
        //console.log(this.state.response);
        //console.log(this.state);
        if(this.state.response === "sgp complete" || this.state.response === "complete"){
            
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
        else if(this.state.response === "previous sgp found"){
            //this.props.setPrintClass("btn btn-primary btn-block");
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           <div className="alert alert-info">Records indicate that your Self-Guided Placement results have already been submitted, so this result will not be recorded.</div> 
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

    setPrintClass(className){
        this.setState({printClass: className});
    }
    
    getEnglishChoice(){
        const choice = this.props.englishChoice;
        if(choice === "Eng1A") return "ENG 1A: English Composition";
        if(choice === "Eng1AX") return "ENG 1AX: Intensive English Composition";
        if(choice === "Eng908") return "ENG 908: Effective Writing";
        if(choice === "Eng905AC") return "ENG 905AC: Accelerated Essay Writing";
        if(choice === "ESL980") return "ENG 980: Effective Writing for Advanced ESL Students";
        if(choice === "LSR940") return "LSR 940: Learning Strategies for Basic Writing Skills"
        return "Something went wrong";

    }
    getMathChoice(){
        const choice = this.props.mathChoice;
        if(choice === "matC") return "MAT 000C: Intermediate Algebra";
        if(choice === "matCG") return "MAT 000CG: Math for the Associate Degree Student";
        if(choice === "matCM") return "MAT 000CM: Intermediate Algebra MAPS";
        if(choice === "matCMX") return "MAT 00CMX: Intermediate Algebra MAPS Extra";
        if(choice === "mat902") return "MAT 902: Pre-Algebra";
        if(choice === "mat903") return "MAT 903: Elementary Algebra";
        if(choice === "mat903M") return "MAT 903M: Elementary Algebra MAPS";
        if(choice === "mat903MX") return "MAT 903MX: Elementary Algebra MAPS Extra";
        if(choice === "mat10") return "MAT 010: Elementary Statistics";
        if(choice === "mat10X") return (<span>MAT 010: Elementary Statistics <strong>with</strong> MAT 910X: Math Skills for Success in Statistics</span>);
        if(choice === "mat12") return "MAT 012: Calculus for Business ";
        if(choice === "mat12X") return (<span>MAT 012: Calculus for Business <strong>with</strong> MAT 912X: Math Skills for Success in Calculus for Business</span>);
        if(choice === "mat1") return "MAT 001: College Algebra";
        if(choice === "matD") return "MAT 000D Trigonometry";
        if(choice === "mat2") return "MAT 002: Pre-Calculus Algebra and Trigonometry";
        if(choice === "mat3A") return "I will provide my high school transcript showing a C or better in pre-calculus, and would like to enroll in MAT 003A: Analytical Geometry and Calculus I";
        if(choice === "matG") return "MAT 000G: Mathematics for the Liberal Arts Student";
        if(choice === "mat909") return (<span>MAT 909: Integrated Statistics I <strong>followed by</strong> MAT 009: Integrated Statistics II</span>);
        
        if(choice === "mat1X") return (<span>MAT 001: College Algebra <strong>with</strong> MAT901X Math Skills for Success in College Algebra</span>);
        if(choice === "matDX") return (<span>MAT 000D Trigonometry <strong>with</strong> MAT 900DX Math Skills for Success in Trigonometry</span>);

        return "Something went wrong";   
    }

    getEnglishCode(){
        const choice = this.props.englishChoice;
        if(choice === "Eng1A") return "080";
        if(choice === "Eng1AX") return "060";
        if(choice === "Eng908") return "040";
        if(choice === "Eng905AC") return "020";
        if(choice === "ESL980") return "010";
        if(choice === "LSR940") return "005";
    }

    getMathCode(){
        const choice = this.props.mathChoice;
        if(choice === "mat3A") return "099";
        if(choice === "mat2") return "095";
        if(choice === "matD") return "090";
        if(choice === "mat1") return "085";
        if(choice === "mat12") return "080";
        if(choice === "mat10") return "075";
        if(choice === "matG") return "070";
        if(choice === "matDX") return "065";
        if(choice === "mat1X") return "060";
        if(choice === "mat12X") return "055";
        if(choice === "mat10X") return "050";
        if(choice === "matC") return "045";
        if(choice === "matCG") return "040";
        if(choice === "matCM") return "035";
        if(choice === "matCMX") return "030";
        if(choice === "mat909") return "025";
        if(choice === "mat903") return "020";
        if(choice === "mat903M") return "015";
        if(choice === "mat903MX") return "010";
        if(choice === "mat902") return "005";
        
        
        
    }
    printPage(){
        window.print();
    }

    componentDidMount(){
        
        if(this.props.userData.signedIn){
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
        
    }

    render(){
        const englishChoice = this.getEnglishChoice();
        const mathChoice = this.getMathChoice();
        const englishCode = this.getEnglishCode();
        const mathCode = this.getMathCode();
        this.formData.mathPlacement = this.getMathCode();
        this.formData.englishPlacement = this.getEnglishCode();
        
        return (
            <div role="grid">
                <div className="row" role="row">
                    <div className="col-lg-8" >

                        <div className="p-2" role="columnheader"><h2 tabIndex="-1" id="placementChoicesHeader">My Placement Choices</h2></div>
                        <div className="alert">All students are encouraged to meet with a counselor after receiving placements for additional guidance in determining the most appropriate courses for your educational goals.</div>
                        <div className="card mb-4" role="cell">
                            <div className="card-header"><strong>English:</strong></div>
                            <div className="card-body">
                            {englishChoice}
                            </div>

                        </div>
                        <div className="card mb-4" role="cell">
                            <div className="card-header"><strong>Math:</strong></div>
                            <div className="card-body">{mathChoice}</div>
   
                        </div>
                    </div>
                    
                    <div className="col-lg-4 d-print-none" >
                        {this.props.userData.signedIn ?
                            null :
                            <div role="cell">
                                
                                    <ModalSubmitForm
                                        mathPlacement={mathCode}
                                        englishPlacement={englishCode}
                                        show={true}
                                        setPrintClass={this.setPrintClass}
                                        url={this.props.url}
                                    />
                                
                            </div>
                              
                        }
                        <div className="card mt-4" role="cell">
                            <div className="card-body">
                                <h2>Print results</h2>
                                <p>{this.state.printText}</p>
                                <SelectionButton
                                    hide={false}
                                    className={this.state.printClass}
                                    text="Print"
                                    onClick={this.printPage}
                                    />
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
}
export default GspPlacement;