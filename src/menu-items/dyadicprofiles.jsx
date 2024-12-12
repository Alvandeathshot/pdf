// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart, Calendar1,Profile2User } from 'iconsax-react';

// type

// icons
const icons = {
  widgets: Story,
  statistics: Story,
  data: Fatrows,
  chart: PresentionChart,
  calendar: Calendar1,
  dyadicprofile: Profile2User,
};

// ==============================|| MENU ITEMS - WIDGETS ||============================== //

const widget = {
  id: 'group-widget',
  title: <FormattedMessage id="dyadic profiles" />,
  icon: icons.widgets,
  type: 'group',
  children: [
    {
      id: 'insights',
      title: <FormattedMessage id="Dyadic Profiles" />,
      type: 'item',
      url: '/dyadicprofiles/dyadicprofiles',
      icon: icons.dyadicprofile
    },
  ]
};

export default widget;
