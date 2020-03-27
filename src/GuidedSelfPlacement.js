import React, {Component} from "react";
import SelectionButtonContainer from "./SelectionButtonContainer";
import SelectionButton from "./SelectionButton";
import GspPlacement from "./GspPlacement";




class GuidedSelfPlacement extends Component{
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleEnglishSubmit = this.handleEnglishSubmit.bind(this);
        this.handlePathSubmit = this.handlePathSubmit.bind(this);
        this.handleRadioClick = this.handleRadioClick.bind(this);
        this.handleMathSubmit = this.handleMathSubmit.bind(this);
        
        this.state = {
            screen: "welcome",
            value: ["0","1","2","3","4","5"],
            legendText: "Welcome to the Mission College Guided Self-Placement Tool. You have chosen to explore additional options for either Math or English courses after receiving placements based on high school performance.",
            buttonText: ["Begin Guided Self Placement"],
            colClassName: "col-sm-12 p-2",
            btnClassName: "btn btn-block btn-lg btn-primary",
            buttonDescription: ["","","",""],
            showSubmit: false,
            submitButtonText: "",
            modal: false,
            dataTarget: [""],
            submitModal: false,
            submitTarget: "",
            englishChoice: "",
            mathChoice: "",
            pathChoice: "",
            radioSelected: false,
            mode: "choices",
            focus: "instructions"
        }

        
    }

 

      
    handleClick(e){
        //const value = e.target.value;
        const screen = this.state.screen;
        if(screen === "welcome"){
            this.questionE1();
            this.setFocus();
        }
        
    }

    setFocus(){
        document.getElementById(this.state.focus).focus();
    }
    
    handleEnglishSubmit(e){
        e.preventDefault();
        const form = document.getElementById("chooseEnglishForm");
        if(form.checkValidity() === false){
            form.classList.add("was-validated");
            return;
        }
        this.setState({
            radioSelected:false
        });
        this.closeModal("popUpC");
        this.questionE2();
    }
    handlePathSubmit(e){
        e.preventDefault();
        const form = document.getElementById("choosePathForm");
        
        if(form.checkValidity() === false){
            form.classList.add("was-validated");
            return;
        }
        this.setState({
            radioSelected:false
        });
        this.closeModal("popUpI");
        this.questionE3();
    }
    handleMathSubmit(e){
        e.preventDefault();
        const form = document.getElementById("chooseMathForm");
        
        if(form.checkValidity() === false){
            form.classList.add("was-validated");
            return;
        }
        this.setState({
            radioSelected:false,
            mode:"displayResults",
            focus:"placementChoicesHeader"
        });
        this.closeModal("popUpJ");
        //console.log(this.state);

    }
    handleRadioClick(e){
        const target = e.target;
        //console.log("Radio Clicked");
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value,
            radioSelected: true,
        });
        
        
    }

    closeModal(id){
        const element = document.getElementById(id);
        //console.log(element);
        
        
        const thisThing = this;
        //element.className="modal fade";
        element.classList.remove("show");
        setTimeout(function(){
                element.removeAttribute('aria-modal');
                element.setAttribute('aria-hidden', 'true');
        
                document.getElementsByClassName('modal-backdrop')[0].remove();
                document.getElementsByTagName("body")[0].classList.remove("modal-open");
        
        
                element.style.display = "none";
                thisThing.setFocus();
            },
            300
        );
        //this.setFocus();
        //document.getElementById("instructions").focus();
        
        
    }


    questionE1(){
        const e1Question = "All students seeking degrees or transfer must complete a transfer level English course, either ENG 001A or ENG 001AX, prior to graduation or transfer.  Students can also choose nontransferable courses which offer additional preparation prior to taking transfer level English. Use the buttons below to explore your options."
        this.setState({
            screen: "e1",
            legendText: e1Question,
            buttonText: ["Learn about transfer level courses", "Learn about non-transferable courses"],
            colClassName: "col-md-6 col-sm-12",
            btnClassName: "btn btn-block btn-lg btn-secondary whitespace-normal",
            submitButtonText: "Select your course",
            showSubmit: true,
            dataTarget: ["#popUpA", "#popUpB"],
            submitTarget: "#popUpC",
            modal: true,
            submitModal: true
        });
    }
    questionE2(){
        const e2Question = "Mission College offers a variety of math courses aligned to multiple pathways. Use the buttons below to get more information and explore your options for Math courses.";
        this.setState({
            screen: "e2",
            legendText: e2Question,
            buttonText: ["Which Math Pathway should I choose?","Learn about Liberal Arts Math Pathway courses","Learn about Business Math Pathway Courses","Learn about STEM (Science, Technology, Engineering, Mathematics) Math Pathway courses","Learn about nontransferable preparatory math and AA/AS degree-applicable Math 000C."],
            colClassName: "col-sm-12",
            submitButtonText: "Select your Math Pathway",
            showSubmit: true,
            modal: true,
            dataTarget: ["#popUpD", "#popUpE", "#popUpF", "#popUpG", "#popUpH"],
            submitModal: true,
            submitTarget: "#popUpI"
        });
        
    }
    questionE3(){

        const e3Question = "You have chosen " + this.getPathName() + "."
        this.setState({
            legendText: e3Question,
            buttonText: [],
            modal: false,
            submitButtonText: "Select your Math Course",
            showSubmit: true,
            submitModal: true,
            submitTarget: "#popUpJ"

        });
        
    }
    getPathName(){
        const path = this.state.pathChoice;
        if(path === "libArts")
            return "Liberal Arts Math Pathway";
        if(path === "stem")
            return "STEM Pathway";
        if (path === "bus")
            return "Business Math Pathway";
        if(path === "prep"){
            return "Pre-transfer Math"
        }
    }
    componentWillMount(){
        if(this.props.gspSource === "noGPA") {
            this.setState({legendText: "Because you cannot report high school performance data you have been redirected to Mission College's Guided Self-Placement Tool. You will need to identify your placement in both English and Math using this tool."})
        }
    }
    /*componentDidUpdate(){
        if(this.state.mode === "choices"){
            //console.log("setting focus");
            
        }
         
    }
    */
    render(){
        if(this.state.mode === "choices"){
            return(
                <div>
                    <span tabIndex="0" className="sr-only sr-only-focusable" id="instructions" aria-label="Next Question"></span>
                    <SelectionButtonContainer
                        colClassName={this.state.colClassName}
                        className={this.state.btnClassName}
                        show="true"
                        id="myButton"
                        legend={this.state.legendText}
                        onClick={this.handleClick}
                        text={this.state.buttonText}
                        value={this.state.value}
                        buttonDescription={this.state.buttonDescription}
                        modal={this.state.modal}
                        dataTarget={this.state.dataTarget}
                        gsp="true"
                    />
                    {(this.state.showSubmit === true)?
                        <SelectionButton
                            text={this.state.submitButtonText}
                            className="btn btn-block btn-lg btn-primary"
                            onClick={this.handleSubmitClick}
                            modal={this.state.submitModal}
                            dataTarget={this.state.submitTarget}
                        />
                        :null
                    }
                    {this.popUpA()}
                    {this.popUpB()}
                    {this.popUpC()}
                    {this.popUpD()}
                    {this.popUpE()}
                    {this.popUpF()}
                    {this.popUpG()}
                    {this.popUpH()}
                    {this.popUpI()}
                    {this.popUpJ()}
                </div>
            );
        }
        if(this.state.mode === "displayResults"){
            return(
                <div>
                    <GspPlacement 
                        englishChoice={this.state.englishChoice}
                        mathChoice={this.state.mathChoice}
                        url={this.props.url}
                        userData={this.props.userData}
                    />
                </div>
            );
        }
        
    }

    popUpA(){
        return(
            <div className="modal fade" id="popUpA" tabIndex="-1" role="dialog" aria-labelledby="popUpALabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpALabel">ENG 001A and ENG 001AX</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="grid">
                            <div className="row">
                                <div className="col-xl-4">
                                    <div className="card border-dark mb-4">
                                        <div className="card-header">
                                            <h2>In Transfer-Level English composition courses students will...</h2>
                                        </div>
                                        <div className="card-body">
                                            <ul className="list-group-flush pl-0">
                                                <li className="list-group-item">Write 5 page essays and a 6-10 page research paper.</li>
                                                <li className="list-group-item">Submit writing that has only limited grammar and punctuation errors</li>
                                                <li className="list-group-item">Use correct essay format, in-text citations, and a Works Cited page.</li>
                                                <li className="list-group-item">Do research in a library database, read journal articles and summarize evidence from research articles.</li>
                                                <li className="list-group-item">Read, summarize and analyze arguments from full-length books.</li>
                                                
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-4">
                                <div className="card border-dark mb-4">
                                        <div className="card-body">
                                            <p className="card-title">Transfer-Level English Composition Course Option 1</p>
                                        </div>
                                        <div className="card-header">
                                            <h2>ENG 001A:<br/>English Composition</h2>
                                        </div>
                                        <div className="card-body">
                                            <p className="font-italic">This course is the traditional 3 unit introductory composition course.</p>
                                        </div>


                                    </div>
                                </div>
                                <div className="col-xl-4">
                                <div className="card border-dark mb-4">
                                        <div className="card-body">
                                        <p className="card-title">Transfer-Level English Composition Course Option 2</p>
                                        </div>
                                        <div className="card-header">
                                            <h2>ENG 001AX:<br/>English Composition with Support for Success</h2>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text font-italic">This course is a 5 unit introductory composition course.</p>
                                            <div className="card-title"><h3>This course offers students...</h3></div>
                                            <ul className="list-group-flush pl-0">
                                                <li className="list-group-item">Extra instruction to increase your confidence at college-level writing</li>
                                                <li className="list-group-item">Additional time working with your instructor one-on-one</li>
                                                <li className="list-group-item">Reading strategies to better understand main ideas from full-length books or research articles</li>
                                                <li className="list-group-item">Additional practice in writing, proofing and editing skills</li>
                                                <li className="list-group-item">Learning skills to help you study more effectively</li>
                                                <li className="list-group-item">Increased support to develop your writing skills</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        );
    }

    popUpB(){
        return(
            <div className="modal fade" id="popUpB" tabIndex="-1" role="dialog" aria-labelledby="popUpBLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpBLabel">Nontransferable, non-degree applicable level courses offering preparation for ENG 001A and ENG 001AX</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-4">
                                <div className="card border-dark height-100">
                                    <div className="card-header">
                                        <h2>ENG 908: Effective Writing</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 3 unit nontransferable, non-degree applicable English course.</p>
                                        <div className="card-title">
                                            <h3>In this course students will...</h3>
                                        </div>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Write 2-3 page essays and a 5-6 page research paper.</li>
                                            <li className="list-group-item">Submit writing that has no more than 6 grammar and punctuation errors per page.</li>
                                            <li className="list-group-item">Use correct essay format, in-text citations, and a short Works Cited page.</li>
                                            <li className="list-group-item">Do limited research in a library database, read several journal articles and summarize evidence from research articles. </li>
                                            <li className="list-group-item">Read and summarize arguments from articles or a short book.</li>
                                            

                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card border-dark height-100">
                                    <div className="card-header">
                                        <h2>ENG 905AC: Accelerated Essay Writing</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 6 unit nontransferable, non-degree applicable intensive English preparatory course</p>
                                        <div className="card-title">
                                            <h3>In this course students will fulfill requirements of ENG 908 plus receive...</h3>
                                        </div>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Extra instruction to increase your confidence at college-level writing</li>
                                            <li className="list-group-item">Additional time working with your instructor one-on-one</li>
                                            <li className="list-group-item">Reading strategies to better understand main ideas from books or research articles</li>
                                            <li className="list-group-item">Additional practice in writing, proofing and editing skills</li>
                                            <li className="list-group-item">Additional instruction and practice in following grammar rules</li>
                                            <li className="list-group-item">Learning skills to help you study more effectively</li>
                                            <li className="list-group-item">Increased support to develop your writing skills</li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card border-dark height-100">
                                    <div className="card-header">
                                        <h2>ESL 980: Effective Writing for Advanced ESL Students</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic"><strong>ESL 980 is a nontransferable, non-degree applicable course for non-native English speakers</strong> and is taught by faculty members in the English as a Second Language Department.</p>
                                        <div className="card-title"><h3>In this course students will...</h3></div>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Write essays of 4-5 paragraphs and a research paper of 750 words</li>
                                            <li className="list-group-item">Write summaries based on academic articles and short stories</li>
                                            <li className="list-group-item">Identify reliable sources to support writing</li>
                                            <li className="list-group-item">Use in-text citation and create a Works Cited page</li>
                                            <li className="list-group-item">Practice peer editing to develop clarity of expression and audience awareness</li>
                                            <li className="list-group-item">Edit own work for sentence structure and grammatical correctness</li>
                                            <li className="list-group-item">Increase variety and accuracy of vocabulary in writing</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card border-dark height-100">
                                    <div className="card-header">
                                        <h2>LSR 940: Learning Strategies for Basic Writing Skills</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">LSR 940 is a 3-unit nontransferable, non-degree applicable level English preparation course <strong>designed for students with disabilities</strong></p>
                                        <div className="card-title">
                                            <h3>In this course students will...</h3>
                                        </div>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Write 1-2 page essays while receiving support and practice in the various stages of the writing process including brainstorming, developing topic sentences, writing complex and compound sentences, and summarizing content</li>
                                            <li className="list-group-item">Learn multi-sensory and compensating strategies to be successful in English courses</li>
                                            <li className="list-group-item">Receive student tailored instruction and one on one support from instructor and peers</li>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        );
    }
    popUpD(){
        return(
            <div className="modal fade" id="popUpD" tabIndex="-1" role="dialog" aria-labelledby="popUpDLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpDLabel">Math Pathway</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="card-header"><h2>Which Math Pathway Should I Choose?</h2></div>
                                <div className="card-body">
                                    <div className="row">
                                        
                                            <div className="col-lg-3 card-title">
                                                <h3>Liberal Arts Mathematics Pathway</h3>
                                            </div>
                                                <div className="col-lg-9 card-text">
                                                    <p>Students choosing this pathway generally are studying social sciences, language arts, fine arts, performing arts, or other fields of study outside the sciences, math, and business.</p>
                                                    <p>The choice of <strong>MAT 010: Elementary Statistics</strong> or <strong>MAT 000G: Mathematics for the Liberal Arts Student</strong> will be influenced by the student’s program of study at Mission College and/or the requirements of the program of study at the institution a student may transfer to.</p>
                                                    <p className="font-italic">Please consult a counselor for additional guidance.</p>
                                                </div>
                                            </div>
                                            <div className="row mt-2 pt-3 border-top ">
                                                <div className="col-lg-3 card-title">
                                                    <h3>STEM Mathematics Pathway</h3>
                                                </div>
                                                
                                                <div className="col-lg-9 card-text">
                                                    <p>Students choosing this pathway generally are studying any of the sciences, technology, engineering or mathematics with an intent to transfer.</p>
                                                    <p>Students may be able to choose to take the more intensive <strong>MAT 002: Pre-Calculus Algebra and Trigonometry</strong> or complete the equivalent by taking both <strong>MAT 001: College Algebra</strong> and <strong>MAT 00D: Trigonometry</strong>.  It is possible to place higher than these courses via high school coursework or AP test scores.  Please see the prerequisite clearance process for more information.</p>
                                                    <p className="font-italic">Please consult a counselor for additional guidance.</p>
                                                </div>
                                            </div>
                                            <div className="row mt-2 pt-3 border-top">
                                                <div className="col-lg-3 card-title">
                                                    <h3>Business Mathematics Pathway</h3>
                                                </div>
                                                
                                                <div className="col-lg-9 card-text">
                                                    <p>Students choosing this pathway generally are studying business or related fields of study with an intent to transfer.</p>
                                                    <p>The choice of <strong>MAT 010: Elementary Statistics</strong> or <strong>MAT 012: Calculus for Business</strong> will be influenced by the student’s program of study at Mission College and/or the requirements of the program of study at the institution a student may transfer to.</p>
                                                    <p className="font-italic">Please consult a counselor for additional guidance.</p>
                                                </div>
                                            </div>
                                            <div className="row mt-2 pt-3 border-top">
                                                <div className="col-lg-3 card-title">
                                                    <h3>Non-Transfer Mathematics</h3>
                                                </div>
                                                
                                                <div className="col-lg-9 card-text">
                                                    <p>For students pursuing an A.A. or A.S. degree with no intent of transfer, the local degree mathematics competency can be met with <strong>MAT 000C: Intermediate Algebra</strong> or <strong>MAT 000CG: Mathematics for the Associate Degree Student.</strong>  Students can demonstrate competency by completing one of these courses or a higher mathematics course.</p>
                                                    <p>If students already possess intermediate algebra skills competency can be met through alternative assessments.</p>
                                                    <p className="font-italic">Please consult Placement and Assessment Services or a counselor for additional guidance.</p>
                                                </div>
                                            </div>
                                        
                                    
                                </div>
                        </div>
                            
                        
                    </div>
                </div>
            </div>
        </div>
        );
    }
    popUpE(){
        return(
            <div className="modal fade" id="popUpE" tabIndex="-1" role="dialog" aria-labelledby="popUpELabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpELabel"><strong>Liberal Arts Math Pathway</strong></h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 010: Elementary Statistics</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level introductory statistics course </p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">This course introduces the concepts and analyses we use when working with data.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 010 - Elementary Statistics with MAT 910X – Study Skills for Success in Statistics.</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level statistics course with concurrent enrollment in 2-units of extra support.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will have more class time to review the math skills and effective study habits you will need to be successful.</li>
                                            <li className="list-group-item">Students will have more class time working with peers. Class activities will include hands on and active learning.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 000G: Math for Liberal Arts</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level liberal arts math course.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">This course fulfills the graduation competency requirement for Associate degree and the general education requirement in mathematics for the CSU system.</li>
                                            <li className="list-group-item">This course introduces critical thinking techniques in areas of mathematics. There is an emphasis on general problem solving techniques.</li>
                                            <li className="list-group-item">This course is for someone who is majoring in Liberal Arts, who does not need Statistics for their major.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 909: Integrated Statistics I followed by MAT 009: Integrated Statistics II</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a two semester sequence Statistics course. Each course is 5-units</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Integrated Statistics is a math course sequence designed to help students complete Statistics in two semesters.</li>
                                            <li className="list-group-item">Students engage in classroom activities that introduce statistical concepts and skills.</li>
                                            <li className="list-group-item">Students learn the required mathematical ideas and skills in the context of learning statistics.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            
                            
                            
                        </div>
                    </div>
                </div>
            </div>
      </div>
        );
    }
    popUpF(){
        return(
        <div className="modal fade" id="popUpF" tabIndex="-1" role="dialog" aria-labelledby="popUpFLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpFLabel"><strong>Business Math Pathway Courses</strong></h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 010: Elementary Statistics</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level introductory statistics course </p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will get an introduction to the concepts and analyses we use when working with data.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 010: Elementary Statistics <span className="font-italic">with</span> MAT 910X: Study Skills for Success in Statistics.</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level statistics course with concurrent enrollment in 2-units of extra support.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will have more class time to review the math skills and effective study habits you will need to be successful.</li>
                                            <li className="list-group-item">Students will have more class time working with peers. Class activities will include hands on and active learning.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>Math 012: Calculus for Business</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level Business Calculus course.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will learn how to apply the concepts of calculus to problems involving economics and business.</li>
                                            <li className="list-group-item">Students should take this class if they want to major in business or economics and want to transfer to a school that has this specific requirement.</li>
                                            <li className="list-group-item">If a student is considering a double major or is undecided whether they want to pursue a STEM degree, then they should take MATH 003A instead.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 012: Calculus for Business <span className="font-italic">with</span> MAT 912X: Study Skills for Success in Business Calculus</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level Business Calculus course with concurrent enrollment in 2-units of extra support.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will have more class time to review the math skills and effective study habits you will need to be successful.</li>
                                            <li className="list-group-item">Students will have more class time working with peers. Class activities will include hands on and active learning.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
   
        );
    }
    popUpG(){
        return(
            <div className="modal fade" id="popUpG" tabIndex="-1" role="dialog" aria-labelledby="popUpGLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpGLabel">STEM (Science, Technology, Engineering, Mathematics) Pathway Courses</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 001: College Algebra</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level College Algebra course. <br/><strong>This course along with Math D: Trigonometry prepares students for the Calculus 003A/B sequence.</strong></p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will learn the vocabulary and properties of functions in preparation for a course in calculus.</li>
                                            <li className="list-group-item">Students should take this class if they want to major in a STEM field that requires completion of Math 003A.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 001: College Algebra <span className="font-italic">with</span><br/>Math 901X: Study Skills for Success in College Algebra.</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit transfer-level College Algebra course with concurrent enrollment in 2-units of extra support.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will have more class time to review the math skills and effective study habits you will need to be successful.</li>
                                            <li className="list-group-item">Students will have more class time working with peers. Class activities will include hands on and active learning.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 000D: Trigonometry</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 3-unit transfer-level Trigonometry course. <br/><strong>This course along with Math 1 College Algebra prepares students for the Calculus 003A/B sequence.</strong></p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">This course is intended, along with Math 1, to preparation for Math 003A.</li>
                                            <li className="list-group-item">Students may take this class if they want to major in a STEM field that requires completion of Math 003A.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 000D: Trigonometry <span className="font-italic">with</span><br/> MAT 900DX: Study Skills for Success in Trigonometry.</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 3-unit transfer-level Trigonometry course with concurrent enrollment in 2-units of extra support.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will have more class time to review the math skills and effective study habits you will need to be successful.</li>
                                            <li className="list-group-item">Students will have more class time working with peers. Class activities will include hands on and active learning.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 002: Pre-calculus Algebra with Trigonometry</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 6-unit transfer-level fast paced pre-calculus course for the highly motivated and very well-prepared student who desires to fulfill the requirements of Math 1 College Algebra and Math D Trigonometry in one course.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">This course prepares students for the Calculus 003A/B sequence.</li>
                                            <li className="list-group-item">Students may take this class if they want to major in a STEM field that requires completion of Math 003A.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 003A: Analytic Geometry and Calculus I</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="card-text">Students may enroll directly in MAT 003A by providing a high school transcript showing completion of high-school pre-calculus with a grade of C or better. The transcript should be taken to Placement and Assessment Services. Students who believe they are prepared for MAT 003A but cannot meet the transcript requirement should follow the prerequisite challenge process.</p>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        );
    }
    popUpH(){
        return(
            <div className="modal fade" id="popUpH" tabIndex="-1" role="dialog" aria-labelledby="popUpHLabel" aria-hidden="true">
            <div className="modal-dialog modal-xl" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpHLabel">Nontransferable, non-degree applicable Level Preparatory Math Courses</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                    <div className="row">
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 902: Pre-Algebra</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 4-unit nontransferable, non-degree applicable level course.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will review very basic pre-algebra skills</li>
                                            <li className="list-group-item">This course may prepare students for CTE pathways that may not require transfer level math.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 d-sm-none d-xs-none d-md-none d-lg-block d-xl-block">
                                <div className="height-100"></div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 903: Elementary Algebra</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 5-unit nontransferable, non-degree applicable level course.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will review beginning algebra skills you may need to be successful in transfer level math courses</li>
                                            <li className="list-group-item">This course may prepare students for CTE pathways that may not require transfer level math.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 903M: Elementary Algebra (MAPS) <span className="font-italic">with</span><br/>MAT 903MX: Elementary Algebra MAPS EXTRA</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 5-unit nontransferable, non-degree applicable course <strong>designed for students with disabilities.</strong> The course requires concurrent enrollment in 3-units of extra support. This course meets the local math degree competency.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students with disabilities can review beginning algebra skills you may need to be successful in transfer level math courses or MAT 000CM.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 000C: Intermediate Algebra</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 5-unit nontransferable, non-degree applicable course that is degree applicable to the AA/AS degrees.</p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students who have not taken Algebra 2 in high school can prepare for the STEM pathway.</li>
                                            <li className="list-group-item">Students can review algebra skills you may need to be successful in transfer level math courses.</li>
                                            <li className="list-group-item">Students can fulfill the math degree competency for the AA or AS degree.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>MAT 000CM Intermediate Algebra (MAPS) <span className="italic">with</span> MAT 00CMX: Intermediate Algebra MAPS EXTRA</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 5-unit nontransferable, non-degree applicable course that is degree applicable to the AA/AS degrees and is <strong>designed for students with disabilities.</strong> The course requires concurrent enrollment in 3-units of extra support. This course meets the local math degree competency. </p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students with disabilities can review intermediate algebra skills you may need to be successful in transfer level math courses</li>
                                            <li className="list-group-item">Students with disabilities can fulfill the math degree competency for the AA or AS degree</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>LSR 942A: Learning Services Math Strategies</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 3 unit nontransferable, non-degree applicable level Math preparation course <strong>designed for students with disabilities.</strong></p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will receive a multi-modal approach to learning the foundations of pre-algebra; Topics include arithmetic review, linear equations, prime factors, statistics, basic geometry, order of operations, etc.</li>
                                            <li className="list-group-item">Students will experience small class sizes, and opportunities for individualized attention and support</li>
                                            <li className="list-group-item">Students will learn variety of math strategies for mastering the fundamentals of pre-algebra</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6 mb-4 ">
                                <div className="card height-100">
                                    <div className="card-header">
                                        <h2>LSR 942B: Learning Services Math Strategies</h2>
                                    </div>
                                    <div className="card-body">
                                        <p className="font-italic">This is a 3 unit nontransferable, non-degree applicable level Math preparation course <strong>designed for students with disabilities</strong></p>
                                        <ul className="list-group-flush pl-0">
                                            <li className="list-group-item">Students will experience a continuation of the concepts learned in LSR 942A</li>
                                            <li className="list-group-item">Students will receive a multi-modal approach to learning advanced pre-algebra skills Topics include: Fractions, equations of fractions, decimals, equations of decimals, integers, etc.</li>
                                            <li className="list-group-item">Students will experience small class sizes and opportunities for individualized attention and support</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </div>
        );
    }
    popUpC(){
        return(
            <div className="modal fade" id="popUpC" tabIndex="-1" role="dialog" aria-labelledby="popUpCLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title" id="popUpCLabel">Select your course</h1>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                            </button>
                    </div>
                    <div className="modal-body">
                        
                            <h2>Choose one course below</h2>
                            <div className="p-2">
                                <form id="chooseEnglishForm" onSubmit={this.handleEnglishSubmit}>
                                    <fieldset>
                                        <legend>Transferable, Degree Applicable Courses</legend>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice1" value="Eng1A" required/>
                                            <label className="form-check-label" htmlFor="englishChoice1">
                                                ENG 001A: English Composition
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice2" value="Eng1AX" required/>
                                            <label className="form-check-label" htmlFor="englishChoice2">
                                                ENG 001AX: English Composition with Support for Success
                                            </label>
                                        </div>
                                    </fieldset>
                                    <fieldset>
                                        <legend>Nontransferable, Non-degree Applicable Preparatory Courses</legend>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice3" value="Eng908" required/>
                                            <label className="form-check-label" htmlFor="englishChoice3">
                                                ENG 908: Effective Writing
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice4" value="Eng905AC" required/>
                                            <label className="form-check-label" htmlFor="englishChoice4">
                                                ENG 905AC: Accelerated Essay Writing
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice5" value="ESL980" required/>
                                            <label className="form-check-label" htmlFor="englishChoice5">
                                                ESL 980: Effective Writing for Advanced ESL Students
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="englishChoice" onChange={this.handleRadioClick} id="englishChoice6" value="LSR940" required/>
                                            <label className="form-check-label" htmlFor="englishChoice5">
                                                LSR 940: Learning Strategies for Basic Writing Skills
                                            </label>
                                        </div>
                                    </fieldset>
                                    <div className="p-4">
                                        
                                            <button type="submit"  onClick={this.handleEnglishSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                Next
                                            </button>
                                        
                                    </div>
                                    
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
      </div>
        )
    }
    popUpI(){
        return(
            <div className="modal fade" id="popUpI" tabIndex="-1" role="dialog" aria-labelledby="popUpILabel" aria-hidden="true">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                    <h1 className="modal-title" id="popUpILabel">Math Pathway</h1>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        
                            <h2>Select Your Math Pathway</h2>
                            <div className="p-2">
                                <form id="choosePathForm">
                                    <fieldset>
                                        <legend>Make your selection</legend>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="pathChoice" onChange={this.handleRadioClick} id="pathChoice1" value="libArts" required/>
                                            <label className="form-check-label" htmlFor="pathChoice1">
                                                Liberal Arts Math Pathway
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="pathChoice" onChange={this.handleRadioClick} id="pathChoice2" value="stem" required/>
                                            <label className="form-check-label" htmlFor="pathChoice2">
                                                STEM (Science, Technology, Engineering, Mathematics) Pathway
                                            </label>
                                        </div>
                                    
                                        
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="pathChoice" onChange={this.handleRadioClick} id="pathChoice3" value="bus" required/>
                                            <label className="form-check-label" htmlFor="pathChoice3">
                                                Business Math Pathway
                                            </label>
                                        </div>
                                        <div className="form-check">
                                            <input className="form-check-input" type="radio" name="pathChoice" onChange={this.handleRadioClick} id="pathChoice4" value="prep" required/>
                                            <label className="form-check-label" htmlFor="pathChoice4">
                                            Nontransferable Preparatory and AA/AS degree-applicable Math 000C
                                            </label>
                                        </div>
                                        
                                    </fieldset>
                                    <div className="p-4">
                                        
                                            <button type="submit" onClick={this.handlePathSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                Next
                                            </button>
                                        
                                    </div>
                                    
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
      </div>
        )
    }
    popUpJ(){
        if(this.state.pathChoice === "libArts")
            return (
                <div className="modal fade" id="popUpJ" tabIndex="-1" role="dialog" aria-labelledby="popUpJLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="popUpJLabel">Liberal Arts Math Selection</h1>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                                
                                <div className="p-2">
                                    <form id="chooseMathForm">
                                        <fieldset>
                                            <legend>Select a course, or select a course with success support link course.</legend>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice1" value="mat10" required/>
                                                <label className="form-check-label" htmlFor="mathChoice1">
                                                    MAT 010: Elementary Statistics
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice2" value="mat10X" required/>
                                                <label className="form-check-label" htmlFor="mathChoice2">
                                                    MAT 010: Elementary Statistics <strong>with</strong> MAT 910X: Math Skills for Success in Statistics
                                                </label>
                                            </div>
                                        
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice3" value="matG" required/>
                                                <label className="form-check-label" htmlFor="mathChoice3">
                                                    MAT 000G: Mathematics for the Liberal Arts Student
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice4" value="mat909" required/>
                                                <label className="form-check-label" htmlFor="mathChoice4">
                                                    MAT 909: Integrated Statistics I <strong>followed by</strong> MAT 009: Integrated Statistics II
                                                </label>
                                            </div>
                                            
                                        </fieldset>
                                        <div className="p-4">
                                            
                                                <button type="submit" onClick={this.handleMathSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                    Next
                                                </button>
                                            
                                        </div>
                                        
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
          </div>
            );
        if(this.state.pathChoice === "stem")
            return (
                <div className="modal fade" id="popUpJ" tabIndex="-1" role="dialog" aria-labelledby="popUpJLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="popUpJLabel">STEM Path Math Selection</h1>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                                
                                <div className="p-2">
                                    <form id="chooseMathForm">
                                        <fieldset>
                                            <legend>Select a course, or select a course with success support link course.</legend>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice1" value="mat1" required/>
                                                <label className="form-check-label" htmlFor="mathChoice1">
                                                    MAT 001: College Algebra
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice2" value="mat1X" required/>
                                                <label className="form-check-label" htmlFor="mathChoice2">
                                                    MAT 001: College Algebra <strong>with</strong> MAT 901X Math Skills for Success in College Algebra 
                                                </label>
                                            </div>
                                        
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice3" value="matD" required/>
                                                <label className="form-check-label" htmlFor="mathChoice3">
                                                    MAT 000D Trigonometry  
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice4" value="matDX" required/>
                                                <label className="form-check-label" htmlFor="mathChoice4">
                                                    MAT 000D Trigonometry <strong>with</strong> MAT 900DX Math Skills for Success in Trigonometry 
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice5" value="mat2" required/>
                                                <label className="form-check-label" htmlFor="mathChoice5">
                                                    MAT 002: Pre-Calculus Algebra and Trigonometry
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice6" value="mat3A" required/>
                                                <label className="form-check-label" htmlFor="mathChoice6">
                                                I will provide my high school transcript showing a C or better in pre-calculus, and would like to enroll in MAT 003A: Analytical Geometry and Calculus I 
                                                </label>
                                            </div>
                                            
                                        </fieldset>
                                        <div className="p-4">
                                            
                                                <button type="submit" data-dismiss={this.state.radioSelected?"modal":""} onClick={this.handleMathSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                    Next
                                                </button>
                                            
                                        </div>
                                        
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
          </div>
            );
        if (this.state.pathChoice === "bus")
            return (
                <div className="modal fade" id="popUpJ" tabIndex="-1" role="dialog" aria-labelledby="popUpJLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="popUpJLabel">Business Math Selection</h1>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                                
                                <div className="p-2">
                                    <form id="chooseMathForm">
                                        <fieldset>
                                            <legend>Select a course, or select a course <strong>with</strong> success support link course.</legend>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice1" value="mat10" required/>
                                                <label className="form-check-label" htmlFor="mathChoice1">
                                                    MAT 010: Elementary Statistics
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice2" value="mat10X" required/>
                                                <label className="form-check-label" htmlFor="mathChoice2">
                                                    MAT 010: Elementary Statistics <strong>with</strong> MAT 910X: Math Skills for Success in Statistics
                                                </label>
                                            </div>
                                        
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice3" value="mat12" required/>
                                                <label className="form-check-label" htmlFor="mathChoice3">
                                                MAT 012: Calculus for Business 
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice4" value="mat12X" required/>
                                                <label className="form-check-label" htmlFor="mathChoice4">
                                                MAT 012: Calculus for Business <strong>with</strong> MAT 012X: Math Skills for Success in Calculus for Business
                                                </label>
                                            </div>
                                            
                                        </fieldset>
                                        <div className="p-4">
                                            
                                                <button type="submit" data-dismiss={this.state.radioSelected?"modal":""} onClick={this.handleMathSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                    Next
                                                </button>
                                            
                                        </div>
                                        
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
          </div>
            );
        if(this.state.pathChoice === "prep"){
            return (
                <div className="modal fade" id="popUpJ" tabIndex="-1" role="dialog" aria-labelledby="popUpJLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h1 className="modal-title" id="popUpJLabel">Preparatory Math Selection</h1>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" >
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            
                                
                                <div className="p-2">
                                    <form id="chooseMathForm">
                                        <fieldset>
                                            <legend>Select a course.</legend>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice1" value="matC" required/>
                                                <label className="form-check-label" htmlFor="mathChoice1">
                                                MAT 000C: Intermediate Algebra 
                                                </label>
                                            </div>
                                            
                                        
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice3" value="matCM" required/>
                                                <label className="form-check-label" htmlFor="mathChoice3">
                                                MAT 000CM: Intermediate Algebra MAPS
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice4" value="matCMX" required/>
                                                <label className="form-check-label" htmlFor="mathChoice4">
                                                MAT 00CMX: Intermediate Algebra MAPS Extra
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice1" value="mat902" required/>
                                                <label className="form-check-label" htmlFor="mathChoice1">
                                                MAT 902: Pre-Algebra 
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice2" value="mat903" required/>
                                                <label className="form-check-label" htmlFor="mathChoice2">
                                                MAT 903: Elementary Algebra
                                                </label>
                                            </div>
                                        
                                            
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice3" value="mat903M" required/>
                                                <label className="form-check-label" htmlFor="mathChoice3">
                                                MAT 903M: Elementary Algebra MAPS
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="mathChoice" onChange={this.handleRadioClick} id="mathChoice4" value="mat903MX" required/>
                                                <label className="form-check-label" htmlFor="mathChoice4">
                                                MAT 903MX: Elementary Algebra MAPS Extra
                                                </label>
                                            </div>
                                            
                                        </fieldset>
                                        <div className="p-2">
                                            
                                                <button type="submit" data-dismiss={this.state.radioSelected?"modal":""} onClick={this.handleMathSubmit} className={this.state.radioSelected?"btn btn-primary btn-block":"btn btn-secondary btn-block"}>
                                                    Next
                                                </button>
                                            
                                        </div>
                                        
                                </form>
                                
                            </div>
                        </div>
                    </div>
                </div>
          </div>
            );
        }
        
    }
}
export default GuidedSelfPlacement;