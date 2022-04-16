import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import dateFormat, { masks } from "dateformat";

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
                selectStaff: null
            }
        }
    
    //Selec the staff card by change value of state
    onStaffSlected(staff) {
        this.setState({ selectStaff: staff })
    }

    // Render information when click on staff Card
    renderStaff(staff) {
        if (staff != null) {
            return (
                
                    <Card>
                        <CardImg width ="100%" src={staff.image} />
                        <CardBody>
                            <CardTitle>Họ và Tên: {staff.name}</CardTitle>
                            <CardText>Ngày sinh: {dateFormat(staff.doB, "dd/mm/yyyy")} </CardText>
                            <CardText>Ngày vào công ty: {dateFormat(staff.startDate, "dd/mm/yyyy")}</CardText>
                            
                            <CardText>Số ngày nghỉ còn lại: {staff.annualLeave}</CardText>
                            <CardText>Số ngày đã làm thêm: {staff.overTime}</CardText>
                        </CardBody>
                    </Card>

                // <CardText>Phòng ban: {staff.department}</CardText>

               ) 
        } else {
            return (
                <div></div> //return empty
            )
        }
    }


    render() {
            const staffList = this.props.staffs.map((staff) => {
                //GET EVERY STAFF FROM STAFFSLIST
                // EXECUTE A FUNCTION WHEN CLICK ON CARD OF STAFF
                return (
                    <div key={staff.id} className="col-12 col-md-5 col-lg-4 mt-2" > 
                        <Card onClick={() => this.onStaffSlected(staff) }> 
                            <CardBody> 
                                <CardTitle>{staff.id+1}. {staff.name}</CardTitle>
                            </CardBody>
                        </Card> 
                    </div> 
                       
                    
                )

            })

        return (
            <div className='container'>
                <div className='row'>
                    {staffList}
                </div>
                <div className='row'>
                    <div className="col-12 col-md-5 col-lg-4 mt-3">
                        <h6>Bấm vào tên nhân viên để xem thông tin</h6>
                    </div>
                    
                </div>
                
                <div className='row'>
                    <div className="col-12 col-md-5 col-lg-4 mt-3">
                        {this.renderStaff(this.state.selectStaff)}      
                    </div>
                </div>

            </div>
        )
    }
   
}


export default StaffList;