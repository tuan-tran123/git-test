import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Button, Col, Modal, ModalBody, Form, FormGroup, Input, Label, ModalHeader, FormFeedback, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = len => val => !val || val.length <= len
const minLength = len => val => val && val.length >= len
const isNumber = val => !isNaN(Number(val))

function RenderStaff({staff}) {
    return (
        <Card>
            <Link to={`/nhanvien/${staff.id}`}>
                <CardImg width="100%" src={staff.image} />
                <CardBody className="hoverstaff">
                <CardSubtitle>{staff.name}</CardSubtitle>
            </CardBody>
            </Link>
            
        </Card>
    )     
}


class StaffList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchName: '',
            isModalOpen: false,
            
        }
        
        this.toggleModal = this.toggleModal.bind(this)
        this.handleSubmitStaff = this.handleSubmitStaff.bind(this)               
        this.handleSearch = this.handleSearch.bind(this)
       
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    
    handleSubmitStaff(values) {
        this.toggleModal();
       
        const newStaff = {
            id: this.props.staffs.length,
            name: values.name,
            doB: values.doB,
            startDate: values.startDate,
            department: values.department,
            annualLeave: values.annualLeave,
            overTime:values.overTime,
            salary: values.salary,
            image: '/assets/images/alberto.png',
        }
        this.props.addStaff(newStaff);
        
        
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
            console.log(<staffList staff={staff} />)
            return (
                <div key={staff.id} className="col-6 col-md-4 col-lg-2 mt-3 mb-3" >
                <RenderStaff staff={staff} />  
                
            </div>
        )

        });
       
        
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 col-md-6 mt-3'>
                    <div className='row'>
                        <div className='col-10 col-md-10'>
                            <h3>Nhân Viên</h3>                        
                        </div>
                     
                        <div className='col-2 '>
                            <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg"></span></Button>
                        </div>                     
                    </div>
                    
                </div>
                                  
                <div className='col-12 col-md-6 mt-3'>
                    
                    <Form onSubmit={this.handleSearch}>
                        <FormGroup row>
                            <Col md={6} >
                                 <Input  type='text' id='searchName' name='searchName' innerRef={(input)=> this.searchName = input}></Input>
                            </Col>
                                
                            <Col md={6}>
                                 <Button  type='submit' value='submit' className='bg-primary '>Tìm nhân viên</Button>
                                 </Col>
                               
                        
                        </FormGroup>                                 
                    </Form>

                </div>
     
            </div>
            
            
            <hr />

              
            <div className='row'>
                <Modal isOpen ={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) =>this.handleSubmitStaff(values)}>
                            <Row className='form-group'>
                                <Label htmlFor='name'md={4}>Tên</Label>
                                <Col md={8}>
                                    <Control.text model='.name' className='form-control' id='name' name='name' validators={{required, minLength: minLength(3), maxLength: maxLength(30)}}
                                    />
                                    <Errors
                                        model=".name"
                                        className="text-danger"
                                        show="touched"
                                        messages={{ 
                                            required: 'Yêu cầu  ',
                                            minLength: 'nhập nhiều hơn 2 ký tự',
                                            maxLength: 'Yêu cầu nhập ít hơn 30 ký tự'
                                        }}
                                    />
                                </Col>                                
                            </Row >
                            <Row className='form-group'>
                                <Label md={4}htmlFor="doB">Ngày sinh</Label>
                                 <Col md={8}>
                                    <Control.text model='.doB' className='form-control' id='doB' name='doB' 
                                        value={this.state.doB}
                                        />
                                                                        
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4}htmlFor="startDate">Ngày vào công ty</Label>
                                 <Col md={8}>
                                    <Control.text model='.startDate' className='form-control' id='startDate' name='startDate' 
                                        value={this.state.startDate}
                                       />
                                                                      
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4}htmlFor="department">Phòng ban</Label>
                                 <Col md={8}>
                                    <Control.select model='.department' className='form-control' id='department' name='department' 
                                        defaultValue='Sales'
                                        
                                    >
                                        <option >Sales</option>
                                        <option >HR</option>
                                        <option >Marketing</option>
                                        <option >IT</option>
                                        <option >Finance</option>
                                        </Control.select>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="salaryScale">Hệ số lương</Label>
                                 <Col md={8}>
                                    <Control.text model='.salaryScale' className='form-control' id='salaryScale' name='salaryScale'  defaultValue="0" validators={{required, isNumber}}
                                        
                                    />
                                    <Errors
                                        model=".salaryScale"
                                        className="text-danger"
                                        show="touched"
                                        messages={{ 
                                            required: 'Yêu cầu nhập',
                                            isNumber: 'Number is required'
                                        }}
                                    />                                       
                                    
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                                 <Col md={8}>
                                    <Control.text model='.annualLeave' className='form-control' id='annualLeave' name='annualLeave' defaultValue="0"
                                    validators={{required, isNumber}}
                                        
                                    />
                                    <Errors
                                        model=".annualLeave"
                                        className="text-danger"
                                        show="touched"
                                        messages={{ 
                                            required: 'Yêu cầu nhập',
                                            isNumber: 'Number is required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Label md={4} htmlFor="overTime">Số ngày làm thêm</Label>
                                 <Col md={8}>
                                    <Control.text model='.overTime' className='form-control' id='overTime' name='overTime'  defaultValue="0" validators={{required, isNumber}}
                                        
                                    />
                                    <Errors
                                        model=".overTime"
                                        className="text-danger"
                                        show="touched"
                                        messages={{ 
                                            required: 'Yêu cầu nhập',
                                            isNumber: 'Number is required'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{ size: 8, offset: 4 }}>
                                    <Button type='submit' value='submit' color='primary'>Thêm</Button>
                                </Col>
                            </Row>
                            
                        </LocalForm>

                    </ModalBody>
                </Modal>


            </div>

            <div className='row'>
                    {staffList}
            </div>            
        </div>
    )

    }

}   

export default StaffList;