import { DepartmentsRepositoryImpl } from "data/repositories/departments.repository.impl";
import { AddDepartmentUseCase } from "logic/usecases/department/add_department.usecase";
import { DeleteDepartmentUseCase } from "logic/usecases/department/delete_department.usecase";
import { GetDepartmentsUseCase } from "logic/usecases/department/get_departments.usecase";
import { UpdateDepartmentUseCase } from "logic/usecases/department/update_department.usecase";
import { useEffect, useState } from "react";


export function useDepartments() {
  const repository = new DepartmentsRepositoryImpl();

  const getDepartmentsUseCase = new GetDepartmentsUseCase(repository);
  const addDepartmentUseCase = new AddDepartmentUseCase(repository);
  const updateDepartmentUseCase = new UpdateDepartmentUseCase(repository);
  const deleteDepartmentUseCase = new DeleteDepartmentUseCase(repository);

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const data = await getDepartmentsUseCase.execute();
      console.log(data);
      setDepartments(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  const addDepartment = async (name, description) => {
    try {
      await addDepartmentUseCase.execute(name, description);
      await fetchDepartments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };


  const updateDepartment = async (id, name, description) => {
    try {
      await updateDepartmentUseCase.execute(id, name, description);
      await fetchDepartments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const deleteDepartment = async (id) => {
    try {
      await deleteDepartmentUseCase.execute(id);
      await fetchDepartments();
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);
  

  return {
    departments,
    loading,
    error,
    addDepartment,
    updateDepartment,
    deleteDepartment,
    refresh: fetchDepartments,
  };
}
