import React, { Component } from 'react';
import axios from 'axios';
import Loader from 'react-loader-spinner';
//import { Link } from 'react-router-dom';


const Loading = (props) => (
    <div
    style={{
      width: "100%",
      height: "100%",
      position: "absolute",
      zIndex: "1",
      left: "0",
      top: "0",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center"
    }}
  >
    <Loader type="ThreeDots" color="#875AFE" height="80" width="80" />
  </div>
  //
)

export default class AddSchool extends Component {
     constructor(props) {
         super(props);
         this.onChangeName = this.onChangeName.bind(this);
         this.onChangePhone = this.onChangePhone.bind(this);
         this.onChangeEmail = this.onChangeEmail.bind(this);
         this.onChangeMessage = this.onChangeMessage.bind(this);
         this.onChangeState = this.onChangeState.bind(this);
         this.onChangeCourse = this.onChangeCourse.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
 
         this.state = {
             name: '',
             phone: '',
             email: '',
             message: '',
             error:'',
             button: 'Submit',
             loading: false,
             states: [],
             lgas: [],
             statesLga: [],
             courses: [],
             pcourses: [],
             programmes: [],
             programmeCourses: []
         }
     } 


     componentDidMount() {
         console.log("Mounted")
          axios.get('http://localhost:3001/jsp/api/v1/add-school')
        .then(response => {
           
            this.setState({
                states: response.data.states,
                lgas: response.data.lga,
                courses: response.data.courses,
                programmes: response.data.programmes,  
                programmeCourses: response.data.programmeCourses
            })


        })
        .catch((error) => {
            console.log(error);
        });
     
     }

     onChangeName(e) {
        this.setState({
            name: e.target.value
        });
    }

    onChangePhone(e) {
        this.setState({
            phone: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangeMessage(e) {
        this.setState({
            message: e.target.value
        });
    }

    onChangeState(e) {
        if(e.target.value !== 0){
            // eslint-disable-next-line
            this.setState({statesLga: this.state.lgas.filter(lga => lga.state_id == e.target.value)})
        }
    }


     onChangeCourse(e) {
       /* if(e.target.value !== 0){
            // eslint-disable-next-line
            this.setState({pcourses: this.state.programmeCourses.filter(course => course.course_id == e.target.value)})
        }*/
    }


	onSubmit(e) {
		e.preventDefault();
		this.setState({
            error: 'Sending, Please wait...',
            loading: false,
            button: ''
		})
		
        const feedback = {
            name: this.state.name,
            phone: this.state.phone,
            email: this.state.email,
            message: this.state.message
        }

        console.log(feedback);

        axios.post('http://localhost:3001/jsp/v1/feedback', feedback)
            .then(() => {
				this.setState({
				error: 'Message sent',
				name: '',
				phone: '',
                email: '',
                loading: false,
                message: '',
                button: 'Sent'
			})
		}).catch(err => {
			this.setState({
                error: 'Sending failed, please try again',
                button: 'Submit',
                loading: false
				
			})
		});
            
        //window.location = '/';
    }

    Loaderview() {
        let load = this.state.loading;
        if (load === true) {
            return <Loading />
        }
    }

     render() {
        return (
          <div class="page-content-wrapper">
  <div class="page-content">
    <div class="page-bar">
      <div class="page-title-breadcrumb">
        <div class=" pull-left">
          <div class="page-title"><h1 style={{marginBottom:"-50px"}}>Edit School </h1> </div>
        </div>

      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="tabbable-line">


          <div class="tab-content">
            <div class="tab-pane active fontawesome-demo" id="tab1">
              <div class="row">
                <div class="col-md-12">
                  <div class="card card-box">
                    <div class="card-head">
                      <header>Editing School</header>
                      <div class="tools">
                        <a class="fa fa-repeat btn-color box-refresh"
                          href="#/"> </a>
                        <a class="t-collapse btn-color fa fa-chevron-down"
                          href="#/"> </a>
                        <a class="t-close btn-color fa fa-times"
                          href="#/"> </a>
                      </div>
                    </div>
                    
                    <div class="card-body ">
                     <form onSubmit={this.onSubmit}>
                      <div class="form-group row">
              				<label for="title" class="col-sm-2 col-form-label text-right">Title :
              				</label>
              					<div class="col-sm-10">
              						<input id="title" name="title" type="text"
              						placeholder="Title " class="form-control required" value="COE Minna" required />
              					</div>
                      </div>
                      <div class="form-group row">
              				<label for="code" class="col-sm-2 col-form-label text-right">Code :
              				</label>
              					<div class="col-sm-10">
              						<input id="Code" name="code" type="text"
              						placeholder="Code " class="form-control required" value="COE" required />
              					</div>
                      </div>
                      <div class="form-group row">
              				<label for="email" class="col-sm-2 col-form-label text-right">Email
              				</label>
              					<div class="col-sm-10">
              						<input id="email" name="email" type="text"
              						placeholder="email " class="form-control" value="abbasumaru44@gmail.com" required/>
              					</div>
                      </div>


              			 <div class="form-group row">
              				<label for="location" class="col-sm-2 col-form-label text-right">Location
              				</label>
              					<div class="col-sm-10">
              						<input id="text" name="location" type="text"
              						placeholder="Location " class="form-control" value="Minna" required/>
              				</div>
                    </div>

            			 <div class="form-group row">
            				<label for="Phone Number" class="col-sm-2 col-form-label text-right">Phone Number
            				</label>
            					<div class="col-sm-10">
            						<input id="text" name="pn" type="text"
            						placeholder="Phone Number " class="form-control" value="07068643562" required/>
            				</div>
                  </div>
    							<div class="form-group row">
    												<label class="col-sm-2 col-form-label text-right"> Description</label>
    									<div class="col-sm-10">
    										<textarea class="form-control" rows="2" name="description" id="comment" required>welcome</textarea>
    									</div>
    							</div>
                  <div class="form-group row">
    								<label class="col-sm-2 col-form-label text-right"> State</label>
    									<div class="col-sm-10">
    										<select onChange={this.onChangeState} class="form-control" name="app_type">
                                            <option value="0">Select</option>
                                            
                                            {this.state.states.map((state) => <option value={state.id}>{state.title}</option>)}
                        </select>
    									</div>
    							</div>
                  <div class="form-group row">
    								<label class="col-sm-2 col-form-label text-right"> LGA</label>
    									<div class="col-sm-10">
    										<select class="form-control" name="app_type">
                          <option value="0">Select</option>
                                            
                                            {this.state.statesLga.map((lga) => <option value={lga.id}>{lga.title}</option>)}
                        </select>
    									</div>
    							</div>
                  <div class="form-group row">
    								<label class="col-sm-2 col-form-label text-right">Courses</label>
    									<div class="col-sm-10">
    										<select onChange={this.onChangeCourse} class="form-control" name="app_type">
                          <option value="0">Select</option>
{this.state.courses.map((course) => <option value={course.id}>{course.title}</option>)}
                        </select>
    									</div>
    							</div>
            
                  <div class="form-group row">
    								<label class="col-sm-2 col-form-label text-right"> Programme</label>
    									<div class="col-sm-10">
                        <select class="form-control" name="app_type">
                          <option value="0">Select</option>
                          {this.state.programmes.map((course) => <option value={course.id}>{course.title}</option>)}
                        </select>
    									</div>
    							</div>
                 <p>{this.state.error}</p>
                 
	{this.state.loading? this.Loaderview() : <div id="button"><button type="submit" class="btn btn-info" >Submit </button></div>}
</form>
                    </div>
                    
                    </div>
                    
                  </div>
                </div>




              </div>
            </div>




        </div>
      </div>
    </div>
  </div>
</div>

            
            )
        }
    }