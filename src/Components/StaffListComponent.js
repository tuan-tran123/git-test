import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Link } from 'react-router-dom';


function RenderStaff({staff}) {
    return (
        <Card>
            <Link to={`/nhanvien/${staff.id}`}>
                <CardBody className="hoverstaff">
                <CardImg width="100%" src={staff.image} />
                <CardTitle>{staff.id + 1}. {staff.name}</CardTitle>
            </CardBody>
            </Link>
            
        </Card>
    )     
}


function StaffList(props) {
    const staffList = props.staffs.map((staff) => {
        return (
            <div key={staff.id} className="col-12 col-md-5 col-lg-4 mt-2 " >
                <RenderStaff staff={staff} />            
            </div>
        
        )

    });

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-12'>
                    <h3>Nhân Viên</h3>
                    <hr />
                </div>
            </div>
            <div className='row'>
                    {staffList}
            </div>

            <div className='row'>
                <div className="col-12 col-md-5 col-lg-4 mt-2">
                    <h6>Bấm vào tên nhân viên để xem thông tin</h6>
                </div>
                    
            </div>
        </div>
    )

}   

export default StaffList;