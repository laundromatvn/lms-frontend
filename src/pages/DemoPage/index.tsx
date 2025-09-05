import React from 'react';

import { Typography } from 'antd';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';

const DemoPage: React.FC = () => {
  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Typography.Title level={1}>Demo</Typography.Title>
    </DefaultLayout>
  );
};

export default DemoPage;