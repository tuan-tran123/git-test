import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import Department from './Department';
import SalarySheet from './Salary';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments
  }
}
  
class Main extends Component {

    constructor(props) {
        super(props);

        
    }

  onAddStaff(newStaff) {
    this.setState({ staffs: [...this.props.staffs, newStaff] });
  }

 
    render() {

        const StaffWithId = ({match }) => {
      return (
        <StaffDetail staff={this.props.staffs.filter((staff) => staff.id === parseInt(match.params.staffId, 10))[0]}
          
        />
        )
    }

      return (
          <div>
            <Header />
              
            <Switch>
                    <Route exact path='/nhanvien' component={() => <StaffList staffs={this.props.staffs} addStaff={ (newStaff) => this.onAddStaff(newStaff)} />} />
                    <Route path='/nhanvien/:staffId' component={StaffWithId} />
                    <Route exact path='/phongban' component={() => <Department departments={this.props.departments} />} />
                    <Route exact path='/bangluong' component={() => <SalarySheet staffs={this.props.staffs} /> } />
                    <Redirect to='/nhanvien' />
        
            </Switch>
            <Footer />
        
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));