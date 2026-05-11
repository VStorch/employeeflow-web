import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import type { Employee } from "../types/Employee";
import type { EmployeeFormData } from "../types/EmployeeFormData";
import type { Role } from "../../roles/types/Role";
import type { Department } from "../../departments/types/Department";
import { getRoles } from "../../roles/services/roleService";
import { getDepartments } from "../../departments/services/departmentService";

type Props = {
  onSubmit: (data: EmployeeFormData) => void;
  employee?: Employee | null;
  onCancel: () => void;
};

function EmployeeForm({ onSubmit, employee, onCancel }: Props) {
  const [departments, setDepartments] = useState<Department[]>([]);

  const [roles, setRoles] = useState<Role[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormData>();

  useEffect(() => {
    if (employee) {
      reset({
        name: employee.name,
        email: employee.email,
        departmentId: employee.departmentId,
        roleId: employee.roleId,
      });
    } else {
      reset({
        name: "",
        email: "",
        departmentId: "",
        roleId: "",
      });
    }
  }, [employee, reset]);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [departmentsData, rolesData] = await Promise.all([
        getDepartments(),
        getRoles(),
      ]);

      setDepartments(departmentsData);

      setRoles(rolesData);
    } catch (error) {
      console.error("Erro ao carregar dados", error);
    }
  }

  function submit(data: EmployeeFormData) {
    onSubmit(data);

    if (!employee) {
      reset({
        name: "",
        email: "",
        departmentId: "",
        roleId: "",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="mb-4">
      <div className="mb-3">
        <label>Name</label>

        <input
          className="form-control"
          {...register("name", {
            required: "Nome é obrigatório",
          })}
        />

        {errors.name && <p className="text-danger">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <label>Email</label>

        <input
          className="form-control"
          {...register("email", {
            required: "Email é obrigatório",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email inválido",
            },
          })}
        />

        {errors.email && <p className="text-danger">{errors.email.message}</p>}
      </div>

      <div className="mb-3">
        <label>Department Id</label>

        <select
          className="form-select"
          {...register("departmentId", {
            required: "Departamento é obrigatório",

            valueAsNumber: true,
          })}
        >
          <option value="">Selecione um departamento</option>

          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        {errors.departmentId && (
          <p className="text-danger">{errors.departmentId.message}</p>
        )}
      </div>

      <div className="mb-3">
        <label>Role Id</label>

        <select
          className="form-select"
          {...register("roleId", {
            required: "Cargo é obrigatório",

            valueAsNumber: true,
          })}
        >
          <option value="">Selecione um cargo</option>

          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>

        {errors.roleId && (
          <p className="text-danger">{errors.roleId.message}</p>
        )}
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary">
          {employee ? "Atualizar" : "Salvar"}
        </button>

        {employee && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
