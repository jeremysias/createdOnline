import React, {Component} from "react";
import $ from "jquery";
class ModalSubmitForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            command: 'report-result',
            campus: 'mission',
            firstName: '',
            lastName: '',
            studentId: '',
            birthMonth: '',
            birthDay: '',
            birthYear: '',
            englishPlacement: this.props.englishPlacement,
            mathPlacement: this.props.mathPlacement,
            formState: 'form',
            response: '',
  
            
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showForm = this.showForm.bind(this);
        this.handleResponse = this.handleResponse.bind(this);
        
        //this.formBody = this.formBody.bind(this);
    }

    showForm(){
        this.setState({formState: "form"})
    }

    handleChange(e){
        
        const target = e.target;
        const value = target.value;
        const name = target.name;

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
        const form = document.getElementById("resultsForm");
        if(form.checkValidity() === false){
            form.classList.add("was-validated");
            return;
        }

        
        const params = this.state;
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
                    response: data
                }
            );
            if(thisThing.state.response === "complete" || thisThing.state.response === "past history found"){
                thisThing.props.setPrintClass("btn btn-primary btn-block");
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

    handleResponse(){
        //console.log(this.state.response);
        //console.log(this.state);
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
                           <div className="alert alert-info">Your placements based on your high school performance or previous guided self-placement have already been submitted. You may print, but not submit, your guided self-placement choices.  You are now able to register for the transfer-level Math and English courses of your choice. Please see a counselor for additional guidance if necessary.</div> 
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

    formBody(){
        return(
            <div className="modal-body">
                                    <form onSubmit={this.handleSubmit} id="resultsForm" noValidate>
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
                                            
                                            <div className="form-group col-2">
                                                <label htmlFor="birthMonth">Month</label>
                                                <input type="number" min="01" max="12" step="1" className="form-control" id="birthMonth" name="birthMonth" placeholder="MM" onChange={this.handleChange} required/>
                                                <div className="invalid-feedback">01-12</div>
                                            </div>
                                            <div className="form-group col-2">
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
                                        
                                        
                                        <div className="form-group hidden">
                                            <label htmlFor="englishPlacementInput">English Recommendation</label>
                                            <input className="form-control" id="englishPlacementInput" name="englishPlacement" type="text" placeholder={this.props.englishPlacement} readOnly/>
                                            
                                        </div>
                                        
                                        <div className="form-group hidden">
                                            <label htmlFor="mathPlacementInput">Math Recommendation</label>
                                            <input className="form-control" id="mathPlacementInput" name="mathPlacement" type="text" placeholder={this.props.mathPlacement} readOnly/>
                                            
                                        </div>
                                        
                                        
                                        
                                        <button type="submit" className={(this.state.response === 'complete' || this.state.response === 'past history found')? "btn btn-secondary" : "btn btn-primary" }>Submit</button>
                                    </form>
                                
                        
                            </div>
        );
    }

    render(){
        //console.log("FinalEnglish to form: " + this.props.finalEnglishPlacement)
        /*if(this.state.name === "jeremy"){
            console.log("bingo");
        }
        */
       
        
        if(this.props.show === true){
        
            const submitCardClass = (this.state.response === 'complete' || this.state.response ==='past history found')? "card": "card blink";
            return(
                <div className="pt-4">
                    <div className={submitCardClass}>
                        <div className="card-body">
                            <h2>Submit Guided Self-Placements</h2>
                            <p>If you have not previously submitted placements based on high school performance data you must submit your guided self-placement choices to receive clearance to register for English and Math courses.</p>
                            <button type="button" className={(this.state.response === 'complete' || this.state.response === 'past history found')? "btn btn-secondary btn-block" : "btn btn-primary btn-block" } data-toggle="modal" data-target="#submitFormModal" title="Click to continue and submit results" >
                            Submit my Guided Self-Placements
                            </button>
                        </div>
                    </div>

                    <div className="modal fade" id="submitFormModal" tabIndex="-1" role="dialog" aria-labelledby="submitFormModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg" role="document">
                            <div className="modal-content">
                            <div className="modal-header">
                                <p className="modal-title" id="submitFormModalLabel"><strong>Submit Results</strong></p>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.showForm}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            {(this.state.formState === "form")? this.formBody(): (this.state.formState === "spinner")? this.spinner(): (this.state.formState === "response")? this.handleResponse(): null}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.showForm}>Close</button>
                                
                            </div>
                            </div>
                        </div>
                        </div>
                </div>
                    )
        }
        else{
            return null;
        }
    }
}
export default ModalSubmitForm;