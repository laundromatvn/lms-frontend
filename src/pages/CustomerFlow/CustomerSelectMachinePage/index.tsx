import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button, Flex, Typography } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { DefaultLayout } from '@shared/components/layouts/DefaultLayout';
import { WorkingTypeEnum } from '@shared/enums/WorkingTypeEnum';
import { LeftRightSection } from '@shared/components/LeftRightSection';

const MAX_SELECTED_WASHING_MACHINES = 2;
const MAX_SELECTED_DRYING_MACHINES = 2;

export const CustomerSelectMachinePage: React.FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const initialWorkingType = searchParams.get('workingType') as WorkingTypeEnum;

  const [workingType, setWorkingType] = useState(initialWorkingType || WorkingTypeEnum.WASH);
  const [totalWashingMachines, setTotalWashingMachines] = useState(0);
  const [totalDryerMachines, setTotalDryerMachines] = useState(0);

  return (
    <DefaultLayout style={{ alignItems: 'center' }}>
      <Flex gap={theme.custom.spacing.medium} style={{ width: '100%' }}>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.WASH ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.WASH)}
        >
          {`${t('common.washer')} (${totalWashingMachines}/${MAX_SELECTED_WASHING_MACHINES})`}
        </Button>
        <Button
          size="large"
          type={workingType === WorkingTypeEnum.DRY ? 'primary' : 'default'}
          onClick={() => setWorkingType(WorkingTypeEnum.DRY)}
        >
          {`${t('common.dryer')} (${totalDryerMachines}/${MAX_SELECTED_DRYING_MACHINES})`}
        </Button>
      </Flex>

      <Typography.Title level={2}>
        {workingType === WorkingTypeEnum.WASH
          ? t('customerFlow.selectWashingMachine',
            { totalSelected: totalWashingMachines, maxSelected: MAX_SELECTED_WASHING_MACHINES })
          : t('customerFlow.selectDryerMachine',
            { totalSelected: totalDryerMachines, maxSelected: MAX_SELECTED_DRYING_MACHINES })}
      </Typography.Title>

      <Flex style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
        Machine List
      </Flex>

      <LeftRightSection
        left={(
          <Button
            type="default"
            size="large"
            style={{ width: 300, height: 64, borderRadius: theme.custom.radius.full }}
            onClick={() => navigate(`/customer-flow/load-clothes?workingType=${workingType}`)}
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
            disabled={totalWashingMachines === 0 && totalDryerMachines === 0}
          >
            {t('common.continue')}
          </Button>
        )}
      />
    </DefaultLayout>
  );
};
