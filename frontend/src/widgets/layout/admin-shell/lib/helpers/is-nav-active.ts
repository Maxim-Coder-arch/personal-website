export const isNavActive = (pathname: string, href: string) => {
    return href === "/admin" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}