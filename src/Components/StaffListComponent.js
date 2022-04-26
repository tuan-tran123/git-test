import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Button, Col, Modal, ModalBody, Form, FormGroup, Input, Label, ModalHeader, FormFeedback } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';




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
            name:'',
            doB: '',
            department:'Sales',
            salaryScale:'',
            startDate:'',
            annualLeave:'',
            overTime: '',
            touched: {
                name: false,
                doB: false,
                startDate:false,
                
            }

        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleAddStaff = this.handleAddStaff.bind(this)
        this.handleSubmitStaff = this.handleSubmitStaff.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
    }


    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleAddStaff(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        
        this.setState({
            [name]: value
        })
    }

    handleSubmitStaff(event) {
        this.toggleModal();
       
        const newStaff = {
            id: this.props.staffs.length,
            name: this.state.name,
            doB:this.state.doB,
            salaryScale: this.state.salaryScale,
            startDate:this.state.startDate,
            department: this.state.department,
            annualLeave: this.state.annualLeave,
            overTime: this.state.overTime,
            salary: this.state.salary,
            image: '/assets/images/alberto.png',
        }
        this.props.addStaff(newStaff);
        event.preventDefault();
        console.log(this.props.staffs.length)
    }  

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true }
        });
    }

    validate(name, doB, startDate) {
        const errors = {
            name: '',
            doB: '',
            startDate:''
        };
        
        if (this.state.touched.name && name.length < 2)
            errors.name = 'Yêu cầu nhiều hơn 2 ký tự';
        else if (this.state.touched.name && name.length > 30)
            errors.name = 'Yêu cầu ít hơn 30 ký tự';
        
        if (this.state.touched.doB && doB.length < 1)
            errors.doB = 'Yêu cầu nhập';
                
        if (this.state.touched.startDate && startDate.length < 1)
            errors.startDate = 'Yêu cầu nhập';
        
        return errors;
    }

    handleSearch(event) {
        
        const searchName = this.searchName.value;
        event.preventDefault();
        this.setState({
            searchName: searchName
     });

    }

    render() {
        const errors = this.validate(this.state.name, this.state.doB, this.state.startDate);

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
                        <Form onSubmit={this.handleSubmitStaff}>
                            <FormGroup row>
                                <Label htmlFor='name'md={4}>Tên</Label>
                                <Col md={8}>
                                    <Input type='text' id='name' name='name' 
                                        value={this.state.name}
                                        valid={errors.name === ''}
                                        invalid={errors.name !== ''}
                                        onBlur={this.handleBlur('name')} 
                                        onChange={this.handleAddStaff} />
                                    <FormFeedback>{errors.name}</FormFeedback>
                                </Col>                                
                            </FormGroup >
                            <FormGroup row>
                                <Label md={4}htmlFor="doB">Ngày sinh</Label>
                                 <Col md={8}>
                                    <Input type='date' id='doB' name='doB' 
                                        value={this.state.doB}
                                        valid={errors.doB === ''}
                                        invalid={errors.doB !== ''}
                                        onBlur={this.handleBlur('doB')}
                                        onChange={this.handleAddStaff} />
                                    <FormFeedback>{errors.doB}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}htmlFor="startDate">Ngày vào công ty</Label>
                                 <Col md={8}>
                                    <Input type='date' id='startDate' name='startDate' 
                                        value={this.state.startDate}
                                        valid={errors.startDate === ''}
                                        invalid={errors.startDate !== ''}
                                        onBlur={this.handleBlur('startDate')}
                                        onChange={this.handleAddStaff} />
                                    <FormFeedback>{errors.startDate}</FormFeedback>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}htmlFor="department">Phòng ban</Label>
                                 <Col md={8}>
                                    <Input type='select' id='department' name='department' 
                                        default='Sales'
                                        value={this.state.department}
                                        onChange={this.handleAddStaff}
                                    >
                                        <option value='Dept01'>Sales</option>
                                        <option value='Dept02'>HR</option>
                                        <option value='Dept03'>Marketing</option>
                                        <option value='Dept04'>IT</option>
                                        <option value='Dept05'>Finance</option>
                                        </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="salaryScale">Hệ số lương</Label>
                                 <Col md={8}>
                                    <Input type='number' id='salaryScale' name='salaryScale' 
                                        value={this.state.salaryScale}
                                        onChange={this.handleAddStaff}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                                 <Col md={8}>
                                    <Input type='number' id='annualLeave' name='annualLeave' 
                                        value={this.state.annualLeave}
                                        onChange={this.handleAddStaff}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="overTime">Số ngày làm thêm</Label>
                                 <Col md={8}>
                                    <Input type='number' id='overTime' name='overTime' 
                                        value={this.state.overTime}
                                        onChange={this.handleAddStaff}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Col md={{ size: 8, offset: 4 }}>
                                    <Button type='submit' value='submit' color='primary'>Thêm</Button>
                                </Col>
                            </FormGroup>
                            
                        </Form>

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