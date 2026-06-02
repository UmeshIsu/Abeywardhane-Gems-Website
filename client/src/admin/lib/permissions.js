/**
 * Role-based permission helpers.
 */

export const ROLES = {
  SUPER_ADMIN: 'super_admin',
  ADMIN: 'admin',
  EDITOR: 'editor',
};

const ROLE_HIERARCHY = {
  [ROLES.SUPER_ADMIN]: 3,
  [ROLES.ADMIN]: 2,
  [ROLES.EDITOR]: 1,
};

/**
 * Check if user has at least the required role level.
 */
export function hasRole(userRole, requiredRole) {
  return (ROLE_HIERARCHY[userRole] || 0) >= (ROLE_HIERARCHY[requiredRole] || 0);
}

/**
 * Permission definitions by feature.
 */
export const PERMISSIONS = {
  // Content management
  manageBlog:        (role) => hasRole(role, ROLES.EDITOR),
  manageGems:        (role) => hasRole(role, ROLES.EDITOR),
  manageGallery:     (role) => hasRole(role, ROLES.EDITOR),
  manageExhibitions: (role) => hasRole(role, ROLES.EDITOR),
  manageTestimonials:(role) => hasRole(role, ROLES.EDITOR),
  manageAwards:      (role) => hasRole(role, ROLES.EDITOR),
  manageEvents:      (role) => hasRole(role, ROLES.EDITOR),
  manageServices:    (role) => hasRole(role, ROLES.EDITOR),
  manageHero:        (role) => hasRole(role, ROLES.ADMIN),

  // Settings
  manageSettings:    (role) => hasRole(role, ROLES.ADMIN),
  manageSeo:         (role) => hasRole(role, ROLES.ADMIN),

  // Users & system
  manageUsers:       (role) => hasRole(role, ROLES.SUPER_ADMIN),
  viewLogs:          (role) => hasRole(role, ROLES.ADMIN),
  viewContacts:      (role) => hasRole(role, ROLES.EDITOR),
  exportData:        (role) => hasRole(role, ROLES.ADMIN),
};

/**
 * Get label for a role.
 */
export function getRoleLabel(role) {
  const labels = {
    [ROLES.SUPER_ADMIN]: 'Super Admin',
    [ROLES.ADMIN]: 'Admin',
    [ROLES.EDITOR]: 'Editor',
  };
  return labels[role] || role;
}

/**
 * Get badge color class for a role.
 */
export function getRoleBadgeClass(role) {
  const classes = {
    [ROLES.SUPER_ADMIN]: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    [ROLES.ADMIN]: 'bg-sapphire-light text-sapphire dark:bg-sapphire/20 dark:text-blue-300',
    [ROLES.EDITOR]: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };
  return classes[role] || 'bg-gray-100 text-gray-700';
}
