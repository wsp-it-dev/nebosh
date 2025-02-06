import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'students', title: 'Students', href: paths.dashboard.students, icon: 'users' },
  { key: 'certificates', title: 'Certificates', href: paths.dashboard.certificates, icon: 'plugs-connected' },
  { key: 'verifications', title: 'Verifications', href: paths.dashboard.verifications, icon: 'user' },
  { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  // { key: 'error', title: 'Error', href: paths.errors.notFound, icon: 'x-square' },
] satisfies NavItemConfig[];
