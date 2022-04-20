import React from 'react';
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderSalary({staff}) {
    return (
        <Card className='m-3 '>
                <CardBody className='hoverstaff '>
                <CardTitle>{staff.name}</CardTitle>
                <CardText>Mã nhân viên: {staff.salaryScale}</CardText>
                <CardText>Số ngày làm thêm: {staff.overTime}</CardText>
                <CardText className='bg-info p-2 shadow'>Lương: {(staff.salaryScale * 3000000 + staff.overTime * 200000).toFixed(0)} </CardText>

        </CardBody>
            
            
        </Card>
    )     
}


function SalarySheet (props) {
    const salarydetail = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-md-5 col-lg-4 mt-2 " >
                <RenderSalary staff={staff} />            
            </div>
        
        )

    });

    return (
        <div className='container'>
             <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/nhanvien'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Bảng Lương</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row'>
                    {salarydetail}
            </div>

        </div>
    )

}   

export default SalarySheet;