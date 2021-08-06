export interface EmployeeRequest{
  name: string,
  departmentId: number|undefined
}

export interface EmployeeInfo{
  id: number,
  key: number,
  name: string,
  department: string,
  hiredate: string,
  level: string,
  departmentId: number | undefined,
  levelId: number|undefined
}

export type EmployeeResponse = EmployeeInfo[] | undefined

// createEmployee
export interface CreateRequest {
  name: string;
  departmentId: number;
  hiredate: string;
  levelId: number;
}
export interface CreateResponse {
  id: number;
  key: number;
}

// updateEmployee
export interface UpdateRequest {
  id: number;
  name: string;
  departmentId: number;
  hiredate: string;
  levelId: number;
}

// deleteEmployee
export interface DeleteRequest {
  id: number;
}