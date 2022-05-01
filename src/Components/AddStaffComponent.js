import React, { Component } from 'react';
import { Label, Modal, ModalHeader, ModalBody, Button, Row, Col } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { postStaff } from '../redux/ActionCreators';
import { connect } from 'react-redux';

const required = (val) => val && val.length;
const maxLength = (len) => val => !val || val.length <= len;
const minLength = (len) => val => !val || val.length >= len;
const isNumber = (val) => !isNaN(Number(val));

const mapDispatchToProps = (dispatch) => ({
    postStaff: (newStaff) => dispatch(postStaff(newStaff)),
})

class AddStaff extends Component {
    constructor(props) {
        super(props);

        this.state = {
            image: '/assets/images/alberto.png',
            isOpenModal: false,
            staffs: this.props.staffs,
            departments: this.props.departments
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.handleAddStaff = this.handleAddStaff.bind(this);
    }

    toggleModal() {
        this.setState({ isOpenModal: !this.state.isOpenModal });
    }

    handleAddStaff(value) {
        const salary = parseInt(((value.salaryScale * 3000000) + (value.overTime * 200000)),10);
        const newStaff = {            
            name: value.name,
            doB: value.doB,
            salaryScale: value.salaryScale,
            startDate: value.startDate,
            departmentId: value.department,
            annualLeave: value.annualLeave,
            overTime: value.overTime,
            salary: salary,
            image: this.state.image,
        }
        this.toggleModal();
        this.props.postStaff(newStaff);
    }

    render() {

        return (
            <React.Fragment>
                <Button onClick={this.toggleModal} color="primary" className="addButton">
                    <span className="fa fa-plus"></span>
                </Button>
                <Modal isOpen={this.state.isOpenModal} toggle={this.toggleModal}>
                    <ModalHeader toggle=
                        {this.toggleModal}>Thêm nhân viên</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleAddStaff(values)}>
                            <Row className="form-group">
                                <Label htmlFor="name" md={4}>Họ và tên</Label>
                                <Col md={8}>
                                    <Control.text model=".name" id="name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(2), maxLength: maxLength(30)
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                            minLength: 'Yêu cầu nhập tối thiểu 2 kí tự',
                                            maxLength: 'Yêu cầu nhập tối đa 30 kí tự'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="doB" md={4}>Ngày sinh</Label>
                                <Col md={8}>
                                    <Control.text type="date" model=".doB" id="doB"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".doB"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="startDate" md={4}>Ngày vào công ty</Label>
                                <Col md={8}>
                                    <Control.text type="date" model=".startDate" id="startDate"
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".startDate"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu nhập',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="department" md={4}>Phòng ban</Label>
                                <Col md={8}>
                                    <Control.select model=".department" id="department" 
                                        className="form-control"
                                        validators={{
                                            required
                                        }}
                                    >
                                        <option value="">Select Department</option>
                                        <option value="Dept01">Sale</option>
                                        <option value="Dept02">HR</option>
                                        <option value="Dept03">Marketing</option>
                                        <option value="Dept04">IT</option>
                                        <option value="Dept05">Finance</option>
                                    </Control.select>
                                    <Errors
                                        className="text-danger"
                                        model=".department"
                                        show="touched"
                                        messages={{
                                            required: 'Yêu cầu chọn phòng ban',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="salaryScale" md={4}>Hệ số lương</Label>
                                <Col md={8}>
                                    <Control.text model=".salaryScale" id="salaryScale"
                                        className="form-control"
                                        validators={{
                                            isNumber 
                                        }}
                                    />
                                    <Errors 
                                        className="text-danger"
                                        model=".salaryScale"
                                        show="touched"
                                        messages={{                                            
                                            isNumber: 'Bạn phải nhập số'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="annualLeave" md={4}>Số ngày nghỉ còn lại</Label>
                                <Col md={8}>
                                    <Control.text model=".annualLeave" id="annualLeave"
                                        className="form-control"
                                        validators={{
                                             isNumber
                                        }} />
                                    <Errors 
                                        className="text-danger"
                                        model=".annualLeave"
                                        show="touched"
                                        messages={{
                                            isNumber: 'Bạn phải nhập số'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="overTime" md={4}>Số ngày đã làm thêm</Label>
                                <Col md={8}>
                                    <Control.text model=".overTime" id="overTime"
                                        className="form-control"
                                        validators={{
                                             isNumber
                                        }} />
                                    <Errors 
                                        className="text-danger"
                                        model=".overTime"
                                        show="touched"
                                        messages={{
                                            isNumber: 'Bạn phải nhập số'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" color="primary">Thêm</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </React.Fragment>
        )
    }
}

export default connect(null, mapDispatchToProps)(AddStaff);