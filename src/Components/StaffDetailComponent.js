import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import dateFormat from "dateformat";


function RenderStaff({ staff }) {

        
    return (
        <div className='container'>
        <div className='row'>
                <div className='col-3 col-md-5 m-1'>
                    <Card className='img-fluid'>
                    <CardImg width="100%" src={staff.image} alt={staff.name} />
                    </Card>
                </div>
            <div className='col-9 col-md-5 m-1' >
                        <CardBody>
                            <CardTitle>Họ và Tên: {staff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")} </CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            <CardText>Phòng ban: {staff.department.name || staff.department}</CardText>
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </CardBody>
            </div>
                        
                    
            </div>
            </div>  
    )
}


    const StaffDetail = (props)  => {
        if (props.staff != null) {
            return (

                <div className='container'>
                    <div className='row'>
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/nhanvien'>Nhân Viên</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.staff.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className='row'>
                        <RenderStaff staff= {props.staff} />                                          
                    </div>
                </div>
            )


        } else {
            return (
                <div></div>
            )
            
        }
    }

export default StaffDetail;