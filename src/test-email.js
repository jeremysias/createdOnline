import React, {Component} from "react";
import $ from "jquery";


class TestEmail extends Component{


    constructor(props){
        super(props);
        this.state = {
            formState: 'idle',
            response: '',
            command: 'test-email',
            studentId: '',
            subject: 'Testing email some more',
            body: 'This is a test'
            
        }
        this.submitEmailRequest = this.submitEmailRequest.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    submitEmailRequest(){
       
        const params = this.state;
        //console.log(this.state);
        //this.setState({formState: "spinner"});
        const thisThing = this;
        const url = "/whatsmyid/processAssessment-test";
        this.setState({formState: "sending request"});
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
                    response: error.responseText,
                    
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

    handleChange(e){
        
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render(){
        return(
            <div>
                <div className="form-group">
                        <label htmlFor="emailIdInput">PIDM</label>
                        <input className="form-control" id="emailIdInput" name="studentId" onChange={this.handleChange} required/>
                        <div className="invalid-feedback">Valid id number required</div>
                    </div>
                <div><button className="btn btn-primary" onClick={this.submitEmailRequest}>Send Email Request</button></div>
                <div>{this.state.formState}</div>
                <div>{this.state.response}</div>
            </div>
        )
    }

}
export default TestEmail; 