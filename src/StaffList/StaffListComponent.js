import React, { Component } from 'react';
import { Media } from 'reactstrap';
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
                    <div className="container">
                        <div key={staff.id} className="row">
                            <Media tag="li">
                                <Media left middle>
                                    <Media object src={staff.image} alt={staff.name} />

                                </Media>
                                <Media body className="ml-5">
                                    <Media heading>{staff.name}</Media>
                                    
                                </Media>
                            </Media>

                        </div>
                        
                        <div className="row">
                            <p>Bấm vào tên nhân viên để xem thông tin</p>
                        </div>

                    </div>
                )

            })

        return (
            <div className='container'>
                    <div className='row'>
                    <Media list>
                        {staffList}
                    </Media>

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