import React, {Component} from "react";
class ModalGPA extends Component{

    

    render(){
        return(
<div>
<button type="button" className="btn btn-secondary btn-block" data-toggle="modal" data-target="#gpaHelpModal">
  Get help calculating GPA
</button>
<div className="modal fade" id="gpaHelpModal" tabIndex="-1" role="dialog" aria-labelledby="gpaHelpModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <p className="modal-title" id="gpaHelpModalLabel"><strong>Guidance to help determine your estimated GPA</strong></p>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <p>Use the information below to identify the GPA which best reflects your achievement in all the subjects and classes you completed in high school or secondary school GPA.   This chart can help you if you </p>
        <ul>
            <li>Have forgotten your exact GPA</li>
            <li>Your school did not use letter grades</li>
            <li>Your school used a different grading system</li>
        </ul>
        <p>Once you have selected your estimated GPA, input this information into the placement tool.</p>
        <table className="table">
            <thead className="thead">
                <tr>
                    <th scope="col">Performance in high-secondary school</th>
                    <th scope="col">Your Letter Grades</th>
                    <th scope="col">Your Percentage</th>
                    <th scope="col">Your GPA</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th scope="row">Excellent</th>
                    <td>A</td>
                    <td>93-100</td>
                    <td>4.0</td>
                </tr>
                <tr>
                    <th scope="row">Excellent</th>
                    <td>A-</td>
                    <td>90-92</td>
                    <td>3.7</td>
                </tr>
                <tr>
                    <th scope="row">Above Average</th>
                    <td>B+</td>
                    <td>87-89</td>
                    <td>3.3</td>
                </tr>
                <tr>
                    <th scope="row">Above Average</th>
                    <td>B</td>
                    <td>83-86</td>
                    <td>3.0</td>
                </tr>
                <tr>
                    <th scope="row">Above Average</th>
                    <td>B-</td>
                    <td>80-82</td>
                    <td>2.7</td>
                </tr>
                <tr>
                    <th scope="row">Average</th>
                    <td>C+</td>
                    <td>77-79</td>
                    <td>2.3</td>
                </tr>
                <tr>
                    <th scope="row">Average</th>
                    <td>C</td>
                    <td>73-76</td>
                    <td>2.0</td>
                </tr>
                <tr>
                    <th scope="row">Average</th>
                    <td>C-</td>
                    <td>70-72</td>
                    <td>1.7</td>
                </tr>
                <tr>
                    <th scope="row">Below Average</th>
                    <td>D</td>
                    <td>60-69</td>
                    <td>1.0</td>
                </tr>
                <tr>
                    <th scope="row">Below Average</th>
                    <td>F</td>
                    <td>Less than 60%</td>
                    <td>0</td>
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
    }

    
}
export default ModalGPA;
