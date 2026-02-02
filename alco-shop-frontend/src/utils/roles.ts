export const ROLES = {
    ADMIN: 'Admin',
    USER: 'User',
} as const;
type Role = typeof ROLES[keyof typeof ROLES]

