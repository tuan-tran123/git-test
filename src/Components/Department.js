import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderDepartment({department}) {
    return (
        <Card className="m-3">
            <CardBody className="hoverstaff">
                <CardTitle>{department.name}</CardTitle>
                <CardText>Số lượng nhân viên: {department.numberOfStaff}</CardText>
            </CardBody>
        </Card>
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
                    {departments}
            </div>

        </div>
    )

}   

export default Department;