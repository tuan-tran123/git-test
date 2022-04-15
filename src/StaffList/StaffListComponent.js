import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

class StaffList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            //     selectStaff: null
            // }
        }
    }

    render() {
            const staffList = this.props.staffs.map((staff) => {
                //GET EVERY STAFF FROM STAFFSLIST
                return (
                    <div key={staff.id} class="col-12 col-md-5 col-lg-4 mt-2" >
                                <Card>
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
                    <div class="col-12 col-md-5 col-lg-4 mt-3">
                        <p>Bấm vào tên nhân viên để xem thông tin</p>
                    </div>
                    
                </div>

            </div>
        )
    }




    // onStaffSlected(staff) {
    //     this.setState ({selectStaff: staff})
    // }

    // renderStaff(staff) {
    //     if (staff != null) {
    //         return (
     

    //            ) 


    //     }


    // }

}


export default StaffList;