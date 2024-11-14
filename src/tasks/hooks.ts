import { useQuery } from "@tanstack/react-query";
import { getAllTasks, getTasks} from "./api";

export const useAllTasks = () => {
  return useQuery({
    queryKey: [`all.tasks`],
    queryFn: getAllTasks,
  });
};

export const useTasks = (id: number) => {
  return useQuery({
    queryKey: [`specific.tasks.${id}`, id],
    queryFn: getTasks
  })
}
