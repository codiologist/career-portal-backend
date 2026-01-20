

export type TAuthGuard = "HR" | "ADMIN" | "USER" ;

export const AuthGard: Record<TAuthGuard, TAuthGuard> = {
    HR: "HR",
    ADMIN: "ADMIN",
    USER: "USER",
};