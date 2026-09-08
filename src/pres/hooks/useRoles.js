import { useEffect, useState } from "react";
import { RolesRepositoryImpl } from "data/repositories/roles.repository.impl";
import { GetRolesUseCase } from "logic/usecases/RoleAndPermission/get_roles.usecase";
import { AddRoleUseCase } from "logic/usecases/RoleAndPermission/add_role.usecase";


export function useRoles() {
  const repository = new RolesRepositoryImpl();

  const getRolesUseCase = new GetRolesUseCase(repository);
  const addRoleUseCase = new AddRoleUseCase(repository);

  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchRoles = async () => {
    try {
      setLoading(true);
      const data = await getRolesUseCase.execute();
      setRoles(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

 
  const addRole = async (name) => {
    try {
      await addRoleUseCase.execute(name);
      await fetchRoles(); 
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    addRole,
    refresh: fetchRoles,
  };
}
