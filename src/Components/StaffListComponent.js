import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardSubtitle, Button, Col, Modal, ModalBody, Form, FormGroup, Input, Label, ModalHeader } from 'reactstrap';
import { Link } from 'react-router-dom';



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
            isModalOpen: false,
            name:'',
            doB: '',
            department:'Sales',
            salaryScale:'',
            startDate:'',
            annualLeave:'',
            overTime:''

        }
        this.toggleModal = this.toggleModal.bind(this)
        this.handleAddStaff = this.handleAddStaff.bind(this)
        this.handleSubmitStaff =this.handleSubmitStaff.bind(this)
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
        console.log('Thong tin ' + JSON.stringify(this.state))
        alert('Thong tin ' + JSON.stringify(this.state))
        event.preventDefault()
    }  

    render(){
        const staffList = this.props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-md-5 col-lg-2 mt-2 " >
                <RenderStaff staff={staff} />            
            </div>
        
        )

    });

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12 mt-2'>
                    <h3>Nhân Viên</h3>
                    
                </div>
                <div className='col-6 mt-2'>
                    <Button outline onClick={this.toggleModal}><span className="fa fa-plus fa-lg">Thêm Nhân Viên</span></Button>
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
                                    <Input type='text' id='name' name='name' innerRef={(input) => this.name = input}
                                        value={this.state.name}
                                        onChange={this.handleAddStaff}/>
                                </Col>                                
                            </FormGroup >
                            <FormGroup row>
                                <Label md={4}htmlFor="doB">Ngày sinh</Label>
                                 <Col md={8}>
                                    <Input type='date' id='doB' name='doB' innerRef={(input) => this.doB = input}
                                        value={this.state.doB}
                                    onChange={this.handleAddStaff}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}htmlFor="startDate">Ngày vào công ty</Label>
                                 <Col md={8}>
                                    <Input type='date' id='startDate' name='startDate' innerRef={(input) => this.startDate = input}
                                        value={this.state.startDate}
                                    onChange={this.handleAddStaff}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4}htmlFor="department">Phòng ban</Label>
                                 <Col md={8}>
                                    <Input type='select' id='department' name='department' innerRef={(input) => this.department = input}
                                        default='Sales'
                                        value={this.state.department}
                                        onChange={this.handleAddStaff}
                                    >
                                        <option>Sales</option>
                                        <option>HR</option>
                                        <option>Marketing</option>
                                        <option>Finance</option>
                                        <option>IT</option>
                                        </Input>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="salaryScale">Hệ số lương</Label>
                                 <Col md={8}>
                                    <Input type='number' id='salaryScale' name='salaryScale' innerRef={(input) => this.salaryScale = input}
                                        value={this.state.salaryScale}
                                        onChange={this.handleAddStaff}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="annualLeave">Số ngày nghỉ còn lại</Label>
                                 <Col md={8}>
                                    <Input type='number' id='annualLeave' name='annualLeave' innerRef={(input) => this.annualLeave = input}
                                        value={this.state.annualLeave}
                                        onChange={this.handleAddStaff}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label md={4} htmlFor="overTime">Số ngày làm thêm</Label>
                                 <Col md={8}>
                                    <Input type='number' id='overTime' name='overTime' innerRef={(input) => this.overTime = input}
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