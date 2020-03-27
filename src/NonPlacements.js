import React, {Component} from "react";
import SelectionDisplay from "./SelectionDisplay";
import Header from "./Header";
import SelectionButton from "./SelectionButton";
//const mathText = [ "Algebra I, Geometry, or lower","Algebra II","Pre-Calculus","Calculus"];
//const pathText = ["STEM","Liberal Arts (Non STEM)", "Business Major"];
class NonPlacement extends Component{
    render(){
        if(this.props.show === false){
            return(null);
        }
        if(this.props.otherCollegePlacement === true){
            return(
                <div className="card">
                <div className="card-header"><strong>Apply Placement from other college</strong></div>
                    <div className="card-body">
                        <p card-text>You can apply placement results from other colleges by submitting your official placement results with your Mission Student ID number via <a href="mailto:assessment.center@missioncollege.edu?subject=Do%20you%20have%20my%20transcript%20on%20file%3F" title="Email the assessment center">email</a> or visit the Assessment Center.</p>
                        <p>If you have equivalent coursework from other educational institutions, <a href="http://www.missioncollege.edu/admissions/prerequisites.html" target="_blank" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>
                        <p>Please <a href="https://esars.wvm.edu/eSARS/MC-Counseling/eSARS.asp?WCI=Init&WCE=Settings" target="_blank" rel="noopener noreferrer">consult with a counselor</a> to determine the most appropriate courses for your educational goals and request an educational plan.</p>
                        <p>Remember! Bring your unofficial transcripts from previously attended college(s) when meeting a counselor.</p>
                    </div>


                </div>
            )
        }
        if(this.props.esl === true){
            
                
            return(
                <div className="card">
                    <div className="card-header"><strong>ESL - English as a Second Language</strong></div>
                    <div className="card-body">
                        
                        <p className="card-text">Thank you for choosing to take classes at Mission College! Since you are choosing to take ESL subject only and not currently planning on taking English or Math courses, you are not required to complete the Placement Assistant tool. However, if you plan to take Math or a course that requires an English or Math prerequisite* at a later date, you can then complete the Placement Assistant Tool.</p>
                        <p className="card-text">For information to place you into your ESL courses, use the link below</p> 
                        <p><a className="btn btn-primary" href="http://www.missioncollege.edu/student_services/assessment/esl.html" target="_blank" rel="noopener noreferrer">click here for ESL testing requirements</a></p>
                        <p className="card-text">If you have equivalent coursework from other educational institutions, use the link below</p> 
                        <p><a className="btn btn-primary" href="http://www.missioncollege.edu/admissions/prerequisites.html" rel="noopener noreferrer">click here to learn how to clear prerequisites.</a></p>
                    </div>

                </div>
            )
        }
           
        
    }
}
export default NonPlacement;