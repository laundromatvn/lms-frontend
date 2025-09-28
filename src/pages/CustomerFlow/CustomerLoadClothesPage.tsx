import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Image } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';
import { Instruction } from './components/Instruction';

import loadClothesImage from '@public/customerFlow/loadClothes.png';

export const CustomerLoadClothesPage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const workingType = searchParams.get('workingType') as WorkingTypeEnum;

  return (
    <DefaultLayout>
      <Instruction
        instruction={t('customerFlow.pleaseLoadYourClothesFirst')}
        imageUrl={loadClothesImage}
        style={{ height: 'calc(100% - 64px)' }}
      />

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/welcome`)}
          >
            {t('common.back')}
          </Button>
        )}
        right={(
          <Button
            type="primary"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/select-machines?workingType=${workingType}`)}
          >
            {t('common.continue')}
          </Button>
        )}
        align="flex-end"
        style={{ height: 64 }}
      />
    </DefaultLayout>
  );
};
