import React, { Component } from 'react';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import StaffList from './StaffListComponent';
import StaffDetail from './StaffDetailComponent';
import { DepartmentStaff } from './DepartmentsDetail';
import Department from './DepartmentComponent';
import SalarySheet from './SalaryComponent';
import { connect } from 'react-redux';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { addStaff, fetchStaffs , fetchDepartments,fetchSalary} from '../redux/ActionCreators';
import { TransitionGroup, CSSTransition } from 'react-transition-group';


const mapStateToProps = state => {
  return {
    staffs: state.staffs,
    departments: state.departments,    

  }
}

const mapDispatchToProps = dispatch => ({
  addStaff: (newStaff) => dispatch(addStaff(newStaff)),
  fetchStaffs: () => { dispatch(fetchStaffs()) },
  fetchDepartments: () => { dispatch(fetchDepartments()) },
  fetchSalary: () => { dispatch(fetchSalary()) },
  
  
  });


class Main extends Component {

    constructor(props) {
        super(props);
  }
  
    componentDidMount() {
      this.props.fetchStaffs();
      this.props.fetchDepartments();
      this.props.fetchSalary();
    
  }

  
  
    render() {

      const StaffWithId = ({ match }) => {          
          const staff = this.props.staffs.staffs.filter((staff) => staff.id === parseInt(match.params.staffId,10))[0]
            let departmentName
            if (staff) {
                departmentName = this.props.departments.departments.find((department) => department.id === staff.departmentId)
            }
            if (departmentName) {
                return(
                    <StaffDetail staff={staff}
                        departmentName={departmentName}
                    />
                );
            }
            return <div>Staff is deleted</div>;
        }

        const DepartmentWithId = ({match}) => {
            return (
                <DepartmentStaff 
                    department={this.props.departments.departments.find((department) => department.id === match.params.departmentId)}
                    staff={this.props.staffs.staffs.filter((staff) => staff.departmentId === match.params.departmentId)}
                />
            )
        }
      
      
      return (
          <div>
          <Header />          
              <TransitionGroup>
                  <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                  <Switch>
                    <Route exact path="/" component={() => <StaffList staffs={this.props.staffs.staffs} handleAddStaff={this.props.addStaff} />} />

                    <Route exact path='/staffs' component={() => <StaffList staffs={this.props.staffs.staffs} handleAddStaff={this.props.addStaff} />} />   
                    
                    <Route path='/staffs/:staffId' component={StaffWithId} />  
                    
                    <Route path="/departments/:departmentId" component={DepartmentWithId} /> 
                    
                    <Route exact path='/departments' component={() => <Department departments={this.props.departments.departments} />} />         
                    
                    <Route exact path='/salary' component={() => <SalarySheet staffs={this.props.staffs.staffs} />} />
                    
                    <Redirect to='/staffs' />
                    
                  </Switch>
              </CSSTransition>            
            </TransitionGroup>
            
          <Footer />
          
        
        </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));