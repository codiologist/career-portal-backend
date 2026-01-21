

export type TAuthGuard = "HR" | "ADMIN" | "USER" | "MODERATOR"; ;

export const AuthGard: Record<TAuthGuard, TAuthGuard> = {
    HR: "HR",
    ADMIN: "ADMIN",
    USER: "USER",
    MODERATOR: "MODERATOR",
};