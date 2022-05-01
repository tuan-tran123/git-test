import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';


// FETCH STAFFS DATA
export const fetchStaffs = () => (dispatch) => {
    dispatch(staffsLoading(true)); 

    return fetch(baseUrl + 'staffs')
        .then(response => {
            if(response.ok)
            {
                return response;
                
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(staffs => dispatch(addStaffs(staffs)))
        .catch(error =>dispatch(staffsFailed(error.message)))
        ;
}

export const staffsLoading = () => ({
    type: ActionTypes.STAFFS_LOADING  
})

export const staffsFailed = (errmess) => ({
    type: ActionTypes.STAFFS_FAILED,
    payload: errmess
})

export const addStaffs = (staffs) => ({
    type: ActionTypes.ADD_STAFFS,
    payload: staffs
});


//DEPARTMENTS
export const fetchDepartments = () => (dispatch) => {
    dispatch(deptLoading(true)); 

    return fetch(baseUrl + 'departments')
        .then(response => {
            if(response.ok)
            {
                return response;
                
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(departments => dispatch(addDept(departments)))
        .catch(error =>dispatch(deptFailed(error.message)))
        ;
}

export const deptLoading = () => ({
    type: ActionTypes.DEPARTMENTS_LOADING  
})

export const deptFailed = (errmess) => ({
    type: ActionTypes.DEPARTMENTS_FAILED,
    payload: errmess
})

export const addDept = (departments) => ({
    type: ActionTypes.ADD_DEPARTMENTS,
    payload: departments
});


//SALARY
export const fetchSalary = () => (dispatch) => {
    dispatch(salaryLoading(true)); 

    return fetch(baseUrl + 'staffsSalary')
        .then(response => {
            if(response.ok)
            {
                return response;
                
            } else {
                var error = new Error('Error' + response.status + ':' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
        })
        .then(response => response.json())
        .then(staffs => dispatch(addSalary(staffs)))
        .catch(error =>dispatch(salaryFailed(error.message)))
        ;
}

export const salaryLoading = () => ({
    type: ActionTypes.SALARY_LOADING  
})

export const salaryFailed = (errmess) => ({
    type: ActionTypes.SALARY_FAILED,
    payload: errmess
})

export const addSalary = (staffs) => ({
    type: ActionTypes.ADD_SALARY,
    payload: staffs
});

        
// ADD STAFF


export const addStaff = (newStaff) => ({
    type: ActionTypes.ADD_NEW_STAFF,
    payload: newStaff

})

export const postStaff = (staffPost) => (dispatch) => {

    return fetch(baseUrl + 'staffs', {
        method: 'POST',
        body: JSON.stringify(staffPost),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error = new Error(`Error ${response.status} : ${response.statusText}`);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errMess = new Error(error.message);
        throw errMess;
    })
    .then(response => response.json())
    .then(response => dispatch(updateStaffs(response)))
    .catch(error => {
        console.log('Post Staff', error.message);
        alert(`Your staff cant be added Error:${error.message}`)
    })
}

//UPDATING STAFF

export const editStaff = (staffEdit) => (dispatch) => {

    return fetch(baseUrl + 'staffs', {
        method: 'PATCH',
        body: JSON.stringify(staffEdit),
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message)
            throw errMess
        }
        )
        .then(response => response.json())
        .then(response => dispatch(updateStaffs(response)))
        .catch(error => {
            console.log('Post Staff', error.message);
            alert(`Your staff cant be edit Error:${error.message}`)
        })
}


// DELETE STAFF
export const deleteStaff = (id) => dispatch => {

    return fetch(baseUrl + `staffs/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error(`Error ${response.status}`);
                error.response = response;
                throw error;
            }
        }, error => {
            var errMess = new Error(error.message);
            throw errMess;
        })
        .then(response => response.json())
        .then(response => dispatch(updateStaffs(response)))
        .catch(error => {
            console.log(error.message)
            alert(error.message)
        })
}
export const updateStaffs = (staffs) => ({
    type: ActionTypes.UPDATE_STAFFS,
    payload: staffs
})




