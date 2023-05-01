import React, { useImperativeHandle, useState, forwardRef } from 'react';
import { Button, Form, Input, Modal, Select, DatePicker, Upload } from 'antd';
import moment from 'moment';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import randomString from 'random-string';
// Utils
import validateMessages from '@utils/validateMessages';
import { range } from '@utils/timeUtils';
import { addFormError } from '@utils/formUtils';
// Model
import eventFormModel from './eventModel';
// API
import { FirebaseData } from '../../../services/firebaseDB';
import { FirebaseClient } from '../../../services/firebaseAuth';
import { FirebaseStorage } from '../../../services/firebaseStorage';

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;


const getBase64 = file =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = error => reject(error);
  });

function disabledDate(current) {
  return current && current < moment().endOf('day');
}

function disabledRangeTime() {
  return {
    disabledMinutes: () => range(0, 60).filter(value => value % 5 !== 0),
  };
}

const validateEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

let eventUid = '';

const UpdateEventsForm = forwardRef((props, ref) => {
  const [usersList, setUsersList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [fileList, setFileList] = useState([]);

  const [form] = Form.useForm();

  const onFinish = async formData => {
    setIsLoading(true);

    const roomId = randomString({ length: 8 }).toLowerCase();
    const formattedData = getFormattedData(formData);

    try {
      if(eventUid)
        await FirebaseData.upadateEvent(formattedData, eventUid);
      else {
        const eventId = await FirebaseData.createEvent({...formattedData, roomId});
        if(fileList.length > 0)
          await FirebaseStorage.uploadImage(fileList, eventId);
      }
      setFileList([]);
      props.updateEvents();
      setIsModalVisible(false);
    } catch (e) {
      console.log(e);
      addFormError(form, e);
    } finally {
      setIsLoading(false);
    }
  };

  const getFormattedData = formData => {
    const {
      status,
      title,
      description,
      users,
    } = formData;

    return {
      title,
      description,
      users,
      status,
      authorEmail: FirebaseClient.getUser().email,
      ...(!isEdit && {
        startDate: new Date(Date.parse(moment(formData.period[0]).format())),
        endDate: new Date(Date.parse(moment(formData.period[1]).format())),
      }),
    };
  };

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const createUserList = async() => {
    
    const userArray = await FirebaseData.getUserList();
    console.log(userArray);
    const usersOptions = userArray.map(user => {
      return (<Option key={user.email}>{user.email}</Option>);
    });

    setUsersList(usersOptions);
  };

  const openModal = (event, isEdit = false) => {
    setIsModalVisible(() => true);
    setIsEdit(() => isEdit);
    eventUid = event.id;
    createUserList();
    form.setFieldsValue({
      ...form.getFieldsValue(),
      ...eventFormModel(event),
    });
  };


  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const dummyRequest = ({file, onSuccess}) => {
    setTimeout(() => {
      if(file.name)
        onSuccess('ok');
    }, 0);
  };

  const closeModal = () => {
    setIsModalVisible(() => false);
    form.resetFields();
    setFileList([]);
  };

  return (
    <>
      <Modal
        title={`${isEdit ? 'Edit' : 'Add'} event`}
        visible={isModalVisible}
        className="add-event-form"
        footer={null}
        onCancel={closeModal}
      >
        <Form
          name="Add event"
          layout="vertical"
          form={form}
          initialValues={eventFormModel}
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          {isEdit ?  (<></>) : (
            <Form.Item
              name="Image"
              label="Image"
            >
              <Upload
                  customRequest={dummyRequest}
                  listType="picture-card"
                  accept='.png, .jpg, .jpeg'
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  >
                  {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </Form.Item>
          )}
            
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true }]}
            validateTrigger="onSubmit"
          >
            <Input placeholder="Daily meeting" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
            validateTrigger="onSubmit"
          >
            <TextArea
              rows={2}
              placeholder="some description"
              maxLength={256}
            />
          </Form.Item>
          <Form.Item
            name="period"
            label="Period"
            rules={[{ required: true }]}
            validateTrigger="onSubmit"
          >
            <RangePicker
              disabled={isEdit}
              disabledDate={disabledDate}
              disabledTime={disabledRangeTime}
              showTime={{
                hideDisabledOptions: true,
              }}
              format="YYYY-MM-DD HH:mm"
            />
          </Form.Item>
          <Form.Item
            name="status"
            label="status"
            rules={[{ required: true }]}
            validateTrigger="onSubmit"
          >
            <Select
              style={{
                width: 120,
              }}
              defaultValue="public"
            >
              <Option value="public">public</Option>
              <Option value="private">private</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="users"
            label="Users"
            rules={[
                {
                  required: true,
                },
                {
                  type: 'email',
                  async validator(rule, value) {
                    for(let v of value) {
                      if(!validateEmail(v))
                        return Promise.reject(`${v} is not a valid email!`);
                    }
                  },
                },
            ]}
            validateTrigger={['onChange', 'onSubmit']}
          >
            <Select
              mode="tags"
              placeholder="test@test.com"
              
            >
              {usersList}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="add-event-form__submit"
              loading={isLoading}
            >
              { isEdit ? 'Edit' : 'Add' }
            </Button>
            <Button
              className="add-event-form__cancel ml-3"
              loading={isLoading}
              onClick={closeModal}
            >
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
});

UpdateEventsForm.propTypes = {
  updateEvents: PropTypes.func,
};

UpdateEventsForm.displayName = 'UpdateEventsForm';

export default UpdateEventsForm;