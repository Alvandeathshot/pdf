// third-party
import { FormattedMessage } from 'react-intl';

// project-imports
import { useGetMenu } from 'api/menu';

// assets
import { Refresh, Home3, HomeTrendUp, Box1 } from 'iconsax-react';

// Icons map
const icons = {
  navigation: Home3,
  dashboard: HomeTrendUp,
  components: Box1,
  loading: Refresh
};

// Loading menu fallback
const loadingMenu = {
  id: 'group-dashboard-loading',
  type: 'group',
  icon: icons.loading,
  children: [
    {
      id: 'dashboard',
      title: <FormattedMessage id="dashboard" />,
      type: 'item',
      icon: icons.loading,
      url: '/dashboard/dash',
      breadcrumbs: false
    }
  ]
};

// ==============================|| MENU ITEMS - API ||============================== //

export function MenuFromAPI() {
  const { menu, menuLoading } = useGetMenu();

  // Show loading menu while data is being fetched
  if (menuLoading) return loadingMenu;

  // Extract the 'dashboard' item from the API data
  const dashboardItem = menu?.children?.find(
    (item) => item.id === 'dashboard' // Assuming 'dashboard' is the ID of the item
  );

  if (!dashboardItem) return null; // Return null if no dashboard item exists

  // Create a simplified dashboard item
  return {
    id: dashboardItem.id,
    title: <FormattedMessage id={`${dashboardItem.title}`} />,
    icon: icons[dashboardItem.icon] || icons.dashboard,
    type: 'item', // Ensures a flat structure
    url: dashboardItem.url || '/dashboard/dash', // Default URL if missing
    breadcrumbs: dashboardItem.breadcrumbs || false
  };
}
