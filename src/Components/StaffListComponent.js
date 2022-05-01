import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Button, Col, Modal, ModalBody, Form, FormGroup, Input, Label, ModalHeader, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import AddStaff from './AddStaffComponent';




function RenderStaff({ staff, isLoading, errMess }) {
    if (isLoading) {
        return (
                <Loading />
               
        )
    } else if (errMess) {
        return (
                <h4>{errMess}</h4>                
        )
    } else {
        return (
            <Card>
                <Link to={`/staffs/${staff.id}`}>
                    <CardImg width="100%" src={staff.image} />
                    <CardBody className="hoverstaff">
                        <CardSubtitle>{staff.name}</CardSubtitle>
                    </CardBody>
                </Link>
                
            </Card>
        )
    }
}


class StaffList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchName: '',            
        }
          
        this.handleSearch = this.handleSearch.bind(this)
    }
   
    handleSearch(event) {
        
        const searchName = this.searchName.value;
        event.preventDefault();
        this.setState({
            searchName: searchName
     });

    }

    render() {
       
        const staffList = this.props.staffs.filter((staff) => {

            if (staff.name.toLowerCase().includes(this.state.searchName.toLowerCase()))
                return staff;
         
        }).map((staff) => {
            
            
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-3 mb-3" >
                    <RenderStaff staff={staff} />
                
                </div>
            )

        });
       //ĐIỀU KIỆN KHI LOADING TỪ SERVER
        if (this.props.staffs.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        } else if (this.props.staffs.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.staffs.errMess}</h4>
                    </div>
                </div>
            )
        } else {
           
            return (

                <div className='container'>
                    <div className='row'>
                        <div className='col-12 col-md-6 mt-3'>
                            <div className='row'>
                                <div className='col-10 col-md-10'>
                                    <h3>Nhân Viên</h3>
                                </div>
                     
                                <div className='col-2 '>
                                    <AddStaff staffs={this.props.staffs.staffs}
                                        handleAddStaff={this.props.handleAddStaff}                         
                                    />                                    
                                </div>
                            </div>
                    
                        </div>
                                  
                        <div className='col-12 col-md-6 mt-3'>
                    
                            <Form onSubmit={this.handleSearch}>
                                <FormGroup row>
                                    <Col md={6} >
                                        <Input type='text' id='searchName' name='searchName' innerRef={(input) => this.searchName = input}></Input>
                                    </Col>
                                
                                    <Col md={6}>
                                        <Button type='submit' value='submit' className='bg-primary '>Tìm nhân viên</Button>
                                    </Col>
                               
                        
                                </FormGroup>
                            </Form>

                        </div>
     
                    </div>
            
            
                    <hr />                          
                    

                    <div className='row'>
                        {staffList}
                    </div>
                </div>
            )

        }
    }

}   

export default StaffList;