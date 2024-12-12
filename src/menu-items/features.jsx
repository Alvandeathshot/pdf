// // third-party
// import { FormattedMessage } from 'react-intl';

// // assets
// import { Story, Fatrows, PresentionChart, Calendar1, Book1, Activity, DocumentText, MessageCircle, TaskSquare, Notification, Brush } from 'iconsax-react';

// // type

// // icons
// const icons = {
//   article: Book1,
//   widgets: Story,
//   statistics: Story,
//   data: Fatrows,
//   chart: PresentionChart,
//   calendar: Calendar1,
//   insights: Activity,
//   assessments: DocumentText,
//   workshop: MessageCircle,
//   course: TaskSquare,
//   Subscription : Notification,
//   themes: Brush,
// };

// // ==============================|| MENU ITEMS - WIDGETS ||============================== //

// const widget = {
//   id: 'group-widget',
//   title: <FormattedMessage id="features" />,
//   icon: icons.widgets,
//   type: 'group',
//   children: [
//     {
//       id: 'insights',
//       title: <FormattedMessage id="Insights" />,
//       type: 'item',
//       url: '/features/insights',
//       icon: icons.insights
//     },
//     {
//       id: 'articles',
//       title: <FormattedMessage id="Articles" />,
//       type: 'item',
//       url: '/features/articles',
//       icon: icons.article
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Assessments" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.assessments
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Reports" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.chart
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Workshops" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.workshop
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Course Work" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.course,
//       chip: {
//         label: 'soon',
//         color: 'info',
//         size: 'small'
//       }
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Calendar" />,
//       type: 'item',
//       url: '/apps/calendar',
//       icon: icons.calendar,
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Subscription Alerts" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.Subscription
//     },
//     {
//       id: 'chart',
//       title: <FormattedMessage id="Themes" />,
//       type: 'item',
//       url: '/widget/chart',
//       icon: icons.themes
//     }
//   ]
// };

// export default widget;





// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { Story, Fatrows, PresentionChart, Calendar1, Book1, Activity, DocumentText, MessageCircle, TaskSquare, Notification, Brush, Refresh } from 'iconsax-react';
// type

// icons
const icons = {
    article: Book1,
    widgets: Story,
    statistics: Story,
    data: Fatrows,
    chart: PresentionChart,
    calendar: Calendar1,
    insights: Activity,
    assessments: DocumentText,
    workshop: MessageCircle,
    course: TaskSquare,
    Subscription : Notification,
    themes: Brush,
    loading: Refresh
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const Features = {
  id: 'group-widget',
  type: 'group',
  children: [
    {
      id: 'insights',
      title: <FormattedMessage id="Insights" />,
      type: 'item',
      url: '/features/insights',
      icon: icons.insights
    },
    {
      id: 'articles',
      title: <FormattedMessage id="Articles" />,
      type: 'item',
      url: '/features/articles',
      icon: icons.article
    },
    {
      id: 'assessments',
      title: <FormattedMessage id="Assessments" />,
      type: 'item',
      url: '/features/assessments',
      icon: icons.assessments 
    },
    {
      id: 'reports',
      title: <FormattedMessage id="Reports" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.chart
    },
    {
      id: 'workshops',
      title: <FormattedMessage id="Workshops" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.workshop
    },
    {
      id: 'course',
      title: <FormattedMessage id="Course Work" />,
      type: 'item',
      url: '/widget/chart',
      icon: icons.course,
      chip: {
        label: 'soon',
        color: 'info',
        size: 'small'
      }
    },
    {
      id: 'calendar',
      title: <FormattedMessage id="Calendar" />,
      type: 'item',
      url: '/apps/calendar',
      icon: icons.calendar,
    },
  ]
};

export default Features;
