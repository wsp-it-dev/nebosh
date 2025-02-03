'use client';

import Disclaimer from './Disclaimer';
import Finished from './finished';
import LearnerDetails from './learner-details';
import YourDetails from './your-details';

export const steps = [
  {
    label: 'Disclaimer',
    component: Disclaimer,
  },
  {
    label: 'Your Details',
    component: YourDetails,
  },
  {
    label: 'Learner Details',
    component: LearnerDetails,
  },
  {
    label: 'Finished',
    component: Finished,
  },
];
