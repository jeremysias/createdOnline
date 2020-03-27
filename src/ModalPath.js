import React, {Component} from "react";
class ModalPath extends Component{



    render(){


        const stem = ["Anatomy", "Biology","Business Economics", "Chemistry","Computer Science","Economics","Engineering", "Geology", "Kinesiology","Mathematics","Nursing","Physics","Psychology (if seeking a B.S.)"];
        const libArts = ["Administration of Justice","Anthropology","Art History","Communication Studies","Early Childhood Education","Elementary Teacher Education","English","Foreign Language (any)","Geography","History","Music","Philosophy","Political Science","Psychology (if seeking a B.A.)","Sociology","Spanish","Theater Arts"];
        const Business = ["Business Administration"];
        
        if(this.props.show === true)
        return(
            <div className="pt-4">
                <button type="button" className="btn btn-secondary btn-lg" data-toggle="modal" data-target="#pathModal">
  Help with Path Selection
</button>

<div className="modal fade" id="pathModal" tabIndex="-1" role="dialog" aria-labelledby="pathModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <p className="modal-title" id="pathModalLabel"><strong>Which path am I considering?</strong></p>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>The chart below shows a sample list of majors for the three main paths.</p>
        <table className="table">
            <thead className="thead">
                <tr>
                    <th scope="col">STEM</th>
                    <th scope="col">Business</th>
                    <th scope="col">Liberal Arts (Non-STEM)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Anatomy</td>
                    <td>Business Administration</td>
                    <td>Administration of Justice</td>
                </tr>
                <tr>
                    
                    <td>Biology</td>
                    <td></td>
                    <td>Anthropology</td>
                </tr>
                <tr>
                    <td>Business Economics</td>
                    
                    <td></td>
                    <td>Art History</td>
                </tr>
                <tr>
                    <td>Chemistry</td>
                    <td></td>
                    <td>Communication Studies</td>
                </tr>
                <tr>
                    <td>Computer Science</td>
                    <td></td>
                    <td>Early Childhood Education</td>
                </tr>
                <tr>
                    <td>Economics</td>
                    <td></td>
                    <td>Elementary Teacher Education</td>
                </tr>
                <tr>
                    <td>Engineering</td>
                    <td></td>
                    <td>English</td>
                </tr>
                <tr>
                    <td>Geology</td>
                    <td></td>
                    <td>Foreign Languages (any)</td>
                    
                </tr>
                <tr>
                <td>Kinesiology</td>
                
                    
                    <td></td>
                    <td>Geography</td>
                    
                </tr>
                <tr>
                <td>Mathematics</td>
                
                    
                    <td></td>
                    <td>History</td>
                    
                </tr>
                <tr>
                <td>Nursing</td>
                    <td></td>
                    <td>Music</td>

                </tr>
                <tr>
                    <td>Physics</td>
                
                    <td></td>
                    <td>Philosophy</td>
                </tr>
                <tr>
                <td>Psychology (if seeking a B.S.)</td>
                    
                    <td></td>
                    <td>Political Science</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Psychology (if seeking a B.A.)</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Sociology</td>
                
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                   
                    <td>Spanish</td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td>Theater Arts</td>
                </tr>
            </tbody>

        </table>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>
            </div>
        )
        else{
            return null;
        }
    }
}
export default ModalPath;