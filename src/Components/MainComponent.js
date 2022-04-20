import React, { Component } from 'react';
import { Navbar, NavbarBrand } from "reactstrap";
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Department from './Department';
import SalarySheet from './Salary';
import { DEPARTMENTS, STAFFS } from '../shared/staffs';
import { Switch, Route, Redirect } from 'react-router-dom';


class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {
            staffs: STAFFS,
            departments: DEPARTMENTS
        }
    }

    render() {

        const StaffWithId = ({match }) => {
      return (
        <StaffDetail staff={this.state.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
          
        />
        )
    }



      return (
          <div>
            <Header />
              
            <Switch>
                    <Route exact path='/nhanvien' component={() => <StaffList staffs={this.state.staffs} />} />
                    <Route path='/nhanvien/:staffId' component={StaffWithId} />
                    <Route exact path='/phongban' component={() => <Department departments={this.state.departments} />} />
                    <Route exact path='/bangluong' component={() => <SalarySheet staffs={this.state.staffs} /> } />
                    <Redirect to='/nhanvien' />
        
            </Switch>
            <Footer />
        
        </div>
    );
  }
}

export default Main;