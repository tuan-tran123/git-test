import React from 'react';
import { Card, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';



function RenderDepartment({department}) {
    return (
        <Link className="text-decoration-none" to={`/departments/${department.id}`} >
            <Card className="m-3 bg-light">
                <CardBody className="hoverstaff">
                    <CardTitle>{department.name}</CardTitle>
                    <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
                </CardBody>
                </Card>
        </Link>
        
    )     
}


function Department(props) {
    const departments = props.departments.map((department) => {
        return (
            <div key={department.id} className="col-12 col-md-5 col-lg-4 mt-2 " >
                <RenderDepartment department={department} />            
            </div>
        
        )

    });

    return (
        <div className='container'>
           <div className='row'>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/staffs'>Nhân Viên</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Phòng Ban</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className='row'>
                    {departments}
            </div>

        </div>
    )

}   

export default Department;