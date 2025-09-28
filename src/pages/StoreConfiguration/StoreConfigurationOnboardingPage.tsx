import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Flex, Typography, Skeleton, notification, Button } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { type Tenant } from '@shared/types/tenant';
import { type Store } from '@shared/types/store';
import { type ListStoreResponse } from '@shared/hooks/useListStoreApi';
import { tenantStorage } from '@core/storage/tenantStorage';
import { useListStoreApi } from '@shared/hooks/useListStoreApi';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { StoreMenu } from './components/StoreMenu';

export const StoreConfigurationOnboardingPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [api, contextHolder] = notification.useNotification();

  const tenant = tenantStorage.load() as Tenant;
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null);

  const {
    listStore,
    loading: isLoading,
    data: listStoreData,
    error: listStoreError,
  } = useListStoreApi<ListStoreResponse>();

  const getStores = async () => {
    if (!tenant) return;

    await listStore({ tenant_id: tenant.id, page: 1, page_size: 10 });
  }

  useEffect(() => {
    getStores();
  }, []);

  useEffect(() => {
    if (listStoreData && listStoreData.data) {
      setStores(listStoreData.data as Store[]);
    }
  }, [listStoreData]);

  useEffect(() => {
    if (listStoreError) {
      api.error({
        message: t('messages.fetchStoresFailed'),
      });
    }
  }, [listStoreError]);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      {contextHolder}
      <Typography.Title level={2}>{t('storeConfiguration.selectStore')}</Typography.Title>

      {isLoading && <Skeleton active />}

      {listStoreError && <Typography.Text type="danger">{t('messages.fetchStoresFailed')}</Typography.Text>}

      {!isLoading && stores.length > 0 && (
        <>
          <Flex justify="space-between" style={{ width: '100%' }}>
            <Typography.Text style={{ fontSize: theme.custom.fontSize.medium }}>
              {t('storeConfiguration.selectedStore', { storeName: stores.find((store) => store.id === selectedStoreId)?.name })}
            </Typography.Text>

            <Button type="default" size="large" onClick={getStores}>
              {t('common.reload')}
            </Button>
          </Flex>

          <StoreMenu
            stores={stores}
            selectedStoreId={selectedStoreId}
            onSelect={(storeId) => setSelectedStoreId(storeId)}
          />

          <Flex>
            <Button type="primary" size="large" style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}>
              {t('common.continue')}
            </Button>
          </Flex>
        </>
      )}
    </DefaultLayout>
  );
};
