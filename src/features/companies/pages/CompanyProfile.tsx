import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../../layouts/MainLayout";

import CompanyCard from "../components/CompanyCard";
import CompanyForm from "../components/CompanyForm";

import type { Company } from "../types/Company";
import type { UpdateCompanyRequest } from "../types/UpdateCompanyRequest";

import {
  getMyCompany,
  updateCompany,
  deleteCompany,
} from "../services/companyService";

import { removeToken } from "../../auth/services/tokenService";
import { toast } from "react-toastify";

function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);

  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    loadCompany();
  }, []);

  async function loadCompany() {
    try {
      const data = await getMyCompany();
      setCompany(data);
    } catch (error) {
      console.error("Erro ao carregar empresa", error);
    }
  }

  async function handleUpdate(data: UpdateCompanyRequest) {
    try {
      const updated = await updateCompany(data);

      setCompany(updated);

      toast.success("Empresa atualizada com sucesso!");

      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar empresa", error);
      toast.error("Ocorreu um erro ao atualizar a empresa.");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir sua empresa?",
    );

    if (!confirmed) return;

    try {
      await deleteCompany();

      removeToken();

      toast.success("Empresa excluída com sucesso!");

      navigate("/login");
    } catch (error) {
      console.error("Erro ao excluir empresa", error);
      toast.error("Ocorreu um erro ao excluir a empresa.");
    }
  }

  if (!company) {
    return (
      <MainLayout>
        <p>Carregando...</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <h1 className="mb-4">Perfil da Empresa</h1>

      {isEditing ? (
        <CompanyForm
          company={company}
          onSubmit={handleUpdate}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <CompanyCard
          company={company}
          onEdit={() => setIsEditing(true)}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
}

export default CompanyProfile;
