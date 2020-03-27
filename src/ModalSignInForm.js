import React, {Component} from "react";
import $ from "jquery";
import Modal from 'react-bootstrap/Modal';
//import Button from 'react-bootstrap/Button';
class ModalSignInForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            command: 'login',
            campus: 'mission',
            firstName: '',
            lastName: '',
            studentId: '',
            birthMonth: '',
            birthDay: '',
            birthYear: '',
            
            formState: 'form',
            response: '',
            show: this.props.show
            
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showForm = this.showForm.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.formBody = this.formBody.bind(this);
        this.retry = this.retry.bind(this);
        
    }

    showForm(){
        this.props.open();
        
    }

  
    
    handleChange(e){
        
        const target = e.target;
        let value = target.value;
        const name = target.name;

        if(target.id === "idInput"){
            if(value.substr(0,1) === "g"){
                value = value.replace("g","G");
                $("#idInput").val(value);
            }
            if(value.substr(1,1) === "o" || value.substr(1,1) === "O"){
                value = value.replace("o", "0");
                value = value.replace("O", "0");
                $("#idInput").val(value);
            }
        }

        this.setState({
            [name]: value
        });
        //console.log(target.id);
        if(target.id === "birthMonth"){
            if(value.length >= 2){
               // console.log(value.length);
                document.getElementById("birthDay").focus();
            }
        }
        else if(target.id === "birthDay"){
            if(value.length >= 2){
                document.getElementById("birthYear").focus();
            }
        }
        else if(target.id === "birthYear"){
            if(value.length >= 4){
                document.getElementById("idInput").focus();
            }
        }

    }
    handleSubmit(e){
        e.preventDefault();

        //console.log(this.state);
        const form = document.getElementById("signInForm");
        if(form.checkValidity() === false){
            form.classList.add("was-validated");
            return;
        }

        
        const params = this.state;
        //console.log(this.state);
        this.setState({formState: "spinner"});
        const thisThing = this;
        //const url = "/whatsmyid/processAssessment-test";
        const url = this.props.url;
        var jqxhr = $.post(url, params, function(){
            //console.log("success");
            
        })
        .done(function(data){
            //console.log("second success");
            //console.log(data);
            var result = data.split(",");
            if(result[1] && result[2]){
                thisThing.setState(
                    {
                        formState: "response", 
                        response: data,
                        firstName: result[1],
                        lastName: result[2]
                    }
                );
            }
            else{
                thisThing.setState(
                    {
                        formState: "response", 
                        response: data
                    }
                );
            }
            
            if(result[0] === "match" ){
                window.sessionStorage.setItem('mc-placement-firstName', thisThing.state.firstName);
                window.sessionStorage.setItem('mc-placement-lastName', thisThing.state.lastName);
                window.sessionStorage.setItem('mc-placement-studentId', thisThing.state.studentId);
                window.sessionStorage.setItem('mc-placement-birthMonth', thisThing.state.birthMonth);
                window.sessionStorage.setItem('mc-placement-birthDay', thisThing.state.birthDay);
                window.sessionStorage.setItem('mc-placement-birthYear', thisThing.state.birthYear);
                window.sessionStorage.setItem('mc-placement-signedIn', 'true');
                thisThing.props.setStudentInfo(thisThing.state);
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

    retry(){
        this.setState({formState: "form"})
    }

    handleResponse(){
        //console.log(this.state.response);
        //console.log(this.state);
        if(this.state.response ==="match"){
            //updates student info state in main, flags user as signed in, closes window
            
            //this.props.setStudentInfo(this.state);
            //this.handleClose();
            return null;
        }
        if(this.state.response === "complete"){
            
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
        else if(this.state.response === "no match"){
            return(
                <div className="modal-body">
                    <div className="card">
                        <div className="card-body">
                           <div className="alert alert-danger">Information submitted does not match our records. Please verify your birthdate and student id, then try again. If it still does not work, please notify the admissions office. </div>
                        </div>
                        <div className="card-body">
                            <button className="btn btn-primary" onClick={this.retry}>OK</button>
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
                            <button className="btn btn-primary" onClick={this.retry}>OK</button>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return null;
        }

    }

    formBody(){
        return(
            <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} id="signInForm" noValidate>
                                        <div className="form-group">
                                            <label htmlFor="firstNameInput">First Name</label>
                                            <input className="form-control" id="firstNameInput" name="firstName" placeholder="Enter first name" onChange={this.handleChange} required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="lastNameInput">Last Name</label>
                                            <input className="form-control" id="lastNameInput" name="lastName" placeholder="Enter last name" onChange={this.handleChange} required/>
                                        </div>
                                        <fieldset id="birthDate">
                                            <div>Birthdate</div>
                                        <div className="form-row">
                                            
                                            <div className="form-group col-3">
                                                <label htmlFor="birthMonth">Month</label>
                                                <input type="number" min="01" max="12" step="1" className="form-control" id="birthMonth" name="birthMonth" placeholder="MM" onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">01-12</div>
                                            </div>
                                            <div className="form-group col-3">
                                                <label htmlFor="birthDay">Day</label>
                                                <input type="number" min="01" max="31" step="1" className="form-control" id="birthDay" name="birthDay" placeholder="DD" onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">01-31</div>
                                            </div>
                                            <div className="form-group col-3">
                                            
                                                <label htmlFor="birthYear">Year</label>
                                                <input type="number" min="1800" max="2100" step="1" className="form-control" id="birthYear" name="birthYear" placeholder="YYYY" onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">4 digit year</div>
                                            </div>
                                            </div>
                                        </fieldset>
                                            
                                            
                                        
                                        <div className="form-group">
                                            <label htmlFor="idInput">Student Id Number</label>
                                            <input className="form-control" id="idInput" name="studentId" placeholder="G0xxx" onChange={this.handleChange} required/>
                                            <div className="invalid-feedback">Valid id number required</div>
                                        </div>

                                        <button type="submit" className={(this.state.response === 'complete' || this.state.response === 'past history found')? "btn btn-secondary" : "btn btn-primary" }>Submit</button>
                                    </form>
                                
                        
                            </div>
        );
    }

   
    handleClose(){
        //console.log("closing");
        this.props.close();
    }
    handleOpen(){
        this.props.open();
    }
    render(){

        return(
            <div>
                <Modal show={this.props.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    {(this.state.formState === "form")? this.formBody(): (this.state.formState === "spinner")? this.spinner(): (this.state.formState === "response")? this.handleResponse(): null}
                    </Modal.Body>
                    
                </Modal>
            </div>
        );
        
       
    }
       
}
export default ModalSignInForm;