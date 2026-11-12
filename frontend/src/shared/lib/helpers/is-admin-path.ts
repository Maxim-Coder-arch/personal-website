export const isAdminPath = (pathname: string) => {
    return pathname === "/admin" || pathname.startsWith("/admin/");
}