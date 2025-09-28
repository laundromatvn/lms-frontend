import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import { Typography, Skeleton, notification, Button, Flex } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Machine } from '@shared/types/machine';
import { useListMachineApi, type ListMachineResponse } from '@shared/hooks/useListMachineApi';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { MachineMenu } from './components/MachineMenu';

export const StoreDetailPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const { storeId } = useParams() as { storeId: string };
  const [machines, setMachines] = useState<Machine[]>([]);

  const {
    listMachine,
    loading: isLoading,
    data: listMachineData,
    error: listMachineError,
  } = useListMachineApi<ListMachineResponse>();

  const getStoreMachines = async (storeId: string) => {
    if (!storeId) return;

    await listMachine({ store_id: storeId, page: 1, page_size: 10 });
  }

  useEffect(() => {
    getStoreMachines(storeId);
  }, []);

  useEffect(() => {
    if (listMachineData && listMachineData.data) {
      setMachines(listMachineData.data as Machine[]);
    }
  }, [listMachineData]);

  return (
    <DefaultLayout >
      {contextHolder}

      <Typography.Title level={2}>{t('storeConfiguration.storeDetail')}</Typography.Title>

      <Flex vertical gap={theme.custom.spacing.medium} style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        {isLoading && <Skeleton active />}

        {listMachineError && <Typography.Text type="danger">{t('messages.fetchMachinesFailed')}</Typography.Text>}

        {!isLoading && listMachineData && listMachineData.data.length > 0 && (
          <>
            <MachineMenu machines={machines} />

            <LeftRightSection
              left={(
                <Button
                  type="default"
                  size="large"
                  style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
                  onClick={() => navigate('/store-configuration/stores')}
                >
                  {t('common.back')}
                </Button>
              )}
              right={(
                <Button
                  type="primary"
                  size="large"
                  style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
                  onClick={() => navigate('/customer-flow/welcome')}
                >
                  {t('common.start')}
                </Button>
              )}
              style={{ marginTop: 'auto' }}
            />
          </>
        )}
      </Flex>
    </DefaultLayout>
  );
};
