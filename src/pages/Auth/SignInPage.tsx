import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Button, Typography, Form, Input, Divider } from 'antd';

import { useTheme } from '@shared/theme/useTheme';

import { AuthContainer } from './components';

export const SignInPage: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <AuthContainer>
      <Typography.Title level={2}>{t('common.signIn')}</Typography.Title>
      <Divider />
      <Form>
        <Form.Item label={t('common.email')} name="email" labelCol={{ span: 24 }}>
          <Input size="large" />
        </Form.Item>

        <Form.Item label={t('common.password')} name="password" labelCol={{ span: 24 }}>
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item labelCol={{ span: 24 }}>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ width: '100%', borderRadius: theme.custom.radius.full }}
          >
            {t('common.signIn')}
          </Button>
        </Form.Item>
      </Form>
    </AuthContainer>
  );
};
