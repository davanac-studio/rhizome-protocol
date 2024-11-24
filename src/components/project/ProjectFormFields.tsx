import { ProjectFormData } from "@/types/form";
import { ProjectBasicFields } from "./form/ProjectBasicFields";
import { ProjectDescriptionFields } from "./form/ProjectDescriptionFields";
import { ProjectLinksFields } from "./form/ProjectLinksFields";
import { ProjectClientFields } from "./form/ProjectClientFields";

interface ProjectFormFieldsProps {
  formData: ProjectFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProjectFormData>>;
}

export const ProjectFormFields = ({ formData, setFormData }: ProjectFormFieldsProps) => {
  return (
    <>
      <ProjectBasicFields formData={formData} setFormData={setFormData} />
      <ProjectDescriptionFields formData={formData} setFormData={setFormData} />
      <ProjectLinksFields formData={formData} setFormData={setFormData} />
      <ProjectClientFields formData={formData} setFormData={setFormData} />
    </>
  );
};