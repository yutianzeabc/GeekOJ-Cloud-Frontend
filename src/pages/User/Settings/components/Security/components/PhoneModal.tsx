import { bindPhone, getPhoneCaptcha } from '@/services/user/api';
import { StringUtils } from '@/utils';
import { useModel } from '@@/exports';
import { LockOutlined, MobileOutlined } from '@ant-design/icons';
import { ProFormCaptcha, ProFormText } from '@ant-design/pro-components';
import { ProForm, ProFormInstance } from '@ant-design/pro-form/lib';
import { message, Modal } from 'antd';
import { Divider } from 'antd/lib';
import React, { useRef } from 'react';

type PhoneModalProps = {
  visible: boolean;
  onCancel: () => void;
  onOk: (newPhone: string) => void;
};

const PhoneModal: React.FC<PhoneModalProps> = ({ visible, onCancel, onOk }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const formRef = useRef<
    ProFormInstance<{
      phone: string;
      captcha: string;
    }>
  >();

  const updatePhone = () => {
    formRef.current?.validateFieldsReturnFormatValue?.().then(async (values) => {
      const res = await bindPhone(values);
      if (res.code === 200) {
        message.success('绑定成功！');
        if (initialState && initialState.currentUser) {
          setInitialState({
            ...initialState,
            currentUser: { ...initialState.currentUser, phone: values.phone },
          });
        }
        onOk?.(values.phone);
        onCancel?.();
      }
    });
  };

  return (
    <Modal
      open={visible}
      title="绑定手机"
      centered={true}
      okText="提交"
      onCancel={() => onCancel?.()}
      onOk={updatePhone}
    >
      <Divider />
      <ProForm<{
        phone: string;
        captcha: string;
      }>
        submitter={false}
        formRef={formRef}
        autoFocusFirstInput
      >
        <ProFormText
          fieldProps={{
            prefix: <MobileOutlined />,
          }}
          name="phone"
          placeholder={'请输入手机号'}
          rules={[
            {
              required: true,
              message: '手机号是必填项！',
            },
            {
              pattern: /^1[3|4|5|7|8][0-9]{9}/,
              message: '不合法的手机号！',
            },
          ]}
        />
        <ProFormCaptcha
          fieldProps={{
            prefix: <LockOutlined />,
          }}
          placeholder={'请输入验证码'}
          captchaTextRender={(timing, count) => {
            if (timing) {
              return `${count} ${'秒后重新获取'}`;
            }
            return '获取验证码';
          }}
          name="captcha"
          phoneName="phone"
          rules={[
            {
              required: true,
              message: '验证码是必填项！',
            },
          ]}
          onGetCaptcha={async (phone) => {
            if (StringUtils.isPhone(phone)) {
              //首先获取手机号的校验状态，成功了才发送验证码
              const res = await getPhoneCaptcha({ phone });
              if (res.code === 200) {
                message.success('获取验证码成功！');
                return;
              }
            }
          }}
        />
      </ProForm>
    </Modal>
  );
};
export default PhoneModal;
