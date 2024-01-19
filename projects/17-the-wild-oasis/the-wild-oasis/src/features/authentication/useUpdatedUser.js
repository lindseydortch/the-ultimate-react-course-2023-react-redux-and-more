import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: () => {
      toast.success("User account successfully updated");
      // Fix for if the cache doesn't update, but not having a problem on my end (just make sure to add user to the params above)
      // queryClient.setQueryDta(["user"], user.user);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: err => toast.error(err.message)
  });

  return { updateUser, isUpdating };
}
