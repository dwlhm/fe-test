import { useQuery } from "@tanstack/react-query";
import { getAllProjects, getProjects } from "./api";

export const useAllProjects = () => {
  return useQuery({
    queryKey: [`all.projects`],
    queryFn: getAllProjects,
  });
};

export const useProjects = (id: number) => {
  return useQuery({
    queryKey: [`specific.projects.${id}`, id],
    queryFn: getProjects
  })
}
