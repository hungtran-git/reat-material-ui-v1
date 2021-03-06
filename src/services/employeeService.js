const KEYS = {
    employees   :'employees',
    employeeId  :'employeeId'
}

export const getDepartmentCollection = () =>[
    {id: 1, title:'Development'},
    {id: 2, title:'Marketing'},
    {id: 3, title:'Accounting'},
    {id: 4, title:'HR'},
]

export const insertEmployee =(data)=>{
    let employees = getAllEmployees();
    data.id = generateEmployeeId();
    employees.push(data);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export const updateEmployee =(data)=>{
    let employees = getAllEmployees();
    let idxToUpdate = employees.findIndex(_=>_.id === data.id);
    employees[idxToUpdate] = data;
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export const deleteEmployee =(id)=>{
    let employees = getAllEmployees();
    employees = employees.filter(_=>_.id !== id);
    localStorage.setItem(KEYS.employees, JSON.stringify(employees));
}

export const generateEmployeeId =()=>{
    if(localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, JSON.stringify(0));

    let id = localStorage.getItem(KEYS.employeeId);
    localStorage.setItem(KEYS.employeeId, JSON.stringify(++id));
    return id;
}

export const getAllEmployees =()=>{
    if(localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]));

    let employees = JSON.parse(localStorage.getItem(KEYS.employees));
    let departments = getDepartmentCollection();
    return employees.map(emp=>{
        return ({
            ...emp,
            department : departments[(1*emp.departmentId) - 1].title
        })
    });
}