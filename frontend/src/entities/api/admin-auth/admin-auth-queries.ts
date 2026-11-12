import { useMutation } from "@tanstack/react-query";

import { adminAuthApi } from "./admin-auth-api";

export function useAdminLogin() {
    return useMutation({ mutationFn: adminAuthApi.login });
}

export function useAdminLogout() {
    return useMutation({ mutationFn: adminAuthApi.logout });
}