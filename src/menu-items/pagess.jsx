// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Book1, I24Support, Security, MessageProgramming, DollarSquare, Airplane } from 'iconsax-react';

// type

// icons
const icons = {
  page: Book1,
  authentication: Security,
  maintenance: MessageProgramming,
  pricing: DollarSquare,
  contactus: I24Support,
  landing: Airplane
};

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  icon: icons.page,
  children: [
    {
      id: 'landing',
      title: <FormattedMessage id="landing" />,
      type: 'item',
      icon: icons.landing,
      url: '/landing'
    },
    {
      id: 'contact-us',
      title: <FormattedMessage id="contact-us" />,
      type: 'item',
      url: '/contact-us',
      icon: icons.contactus,
      target: true
    },
  ]
};

export default pages;
