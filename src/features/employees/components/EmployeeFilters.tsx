import type { Department } from "../../departments/types/Department";
import type { Role } from "../../roles/types/Role";

type Props = {
  departments: Department[];

  roles: Role[];

  selectedDepartmentId?: number;

  selectedRoleId?: number;

  onDepartmentChange: (value?: number) => void;

  onRoleChange: (value?: number) => void;
};

function EmployeeFilters({
  departments,
  roles,
  selectedDepartmentId,
  selectedRoleId,
  onDepartmentChange,
  onRoleChange,
}: Props) {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h5 className="mb-3">Filtros</h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Departamento</label>

            <select
              className="form-select"
              value={selectedDepartmentId ?? ""}
              onChange={(e) =>
                onDepartmentChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value="">Todos</option>

              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Cargo</label>

            <select
              className="form-select"
              value={selectedRoleId ?? ""}
              onChange={(e) =>
                onRoleChange(
                  e.target.value ? Number(e.target.value) : undefined,
                )
              }
            >
              <option value="">Todos</option>

              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeFilters;
