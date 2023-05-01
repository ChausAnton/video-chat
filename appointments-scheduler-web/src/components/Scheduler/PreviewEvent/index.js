import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Modal } from 'antd';
import moment from 'moment';
// Utils
import { getNewLocation, getParsedParams } from '@utils/routerUtils';
import PropTypes from 'prop-types';
// Api
// Style
import './index.scss';
import { getToken } from '../../../utils/cookie';
import { FirebaseClient } from '../../../services/firebaseAuth';
import { FirebaseData } from '../../../services/firebaseDB';
import { FirebaseStorage } from '../../../services/firebaseStorage';

const PreviewEvent = forwardRef((props, ref) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [eventData, setEventData] = useState(false);

  const userInfo = FirebaseClient.getUser();
  //const userInfo = useSelector(state => state.user.userInfo);

  const history = useHistory();

  useImperativeHandle(ref, () => ({
    openModal,
    closeModal,
  }));

  const joinToVideoChat = () => {
    const videoChatLink = process.env.REACT_APP_VIDEO_CHAT_LINK;
    const link = `${videoChatLink}/?info=true&roomId=${eventData.roomId}&idToken=${getToken()}`;
    window.open(link, '_blank');
  };

  const openModal = eventData => {
    setIsModalVisible(true);
    setEventData(() => eventData);

    if (getParsedParams(history.location.search)?.previewEvent === eventData.id) return;

    history.replace(getNewLocation(history.location, { previewEvent: eventData.id }));
  };

  const getEventPeriod = eventData => {
    return `${moment(eventData.start).format('YYYY.MM.DD HH:mm')} - 
      ${moment(eventData.end).format('YYYY.MM.DD HH:mm')}`;
  };

  const closeModal = () => {
    setIsModalVisible(false);
    history.replace(getNewLocation(history.location, { previewEvent: null }));
  };

  const deleteEvent = async() => {
    setIsLoading(() => true);

    try {
      await Promise.all([
        FirebaseData.deleteEvent(eventData.id),
        FirebaseStorage.deleteImage(eventData.image),
      ]);

      setIsModalVisible(false);
      props.updateEvents();
    } finally {
      setIsLoading(() => false);
    }
  };

  return (
    <Modal
      title={eventData.title}
      visible={isModalVisible}
      className="preview-event"
      footer={null}
      onCancel={closeModal}
    >

      {eventData.image
      ? <div className="preview-event__image">
          <img src={eventData.image} alt="image" />
        </div> 
      : <></>}
      <div className="preview-event__author">
        <div className="preview-event__prop--title">
          Author
        </div>
        <div className="preview-event__prop--value">
          {eventData.authorEmail}
        </div>
      </div>
      <div className="preview-event__description">
        <div className="preview-event__prop--title">
          Description
        </div>
        <div className="preview-event__prop--value">
          {eventData.description}
        </div>
      </div>
      {/* <div className="preview-event__location" onClick={joinToVideoChat}>
        <div className="preview-event__prop--title">
          Location
        </div>
        <div className="preview-event__prop--value">
          <a href={videChatLink}></a>
          {videChatLink}
        </div>
      </div> */}
      <div className="preview-event__period">
        <div className="preview-event__prop--title">
          Time period
        </div>
        <div className="preview-event__prop--value">
          {getEventPeriod(eventData)}
        </div>
      </div>
      <div className="preview-event__status">
        <div className="preview-event__prop--title">
          status
        </div>
        <div className="preview-event__prop--value">
          {eventData.status}
        </div>
      </div>
      <div className="preview-event__members">
        <div className="preview-event__prop--title">
          Members
        </div>
        <div className="preview-event__prop--value">
          {eventData.users ? eventData.users.join(', ') : ''}
        </div>
      </div>
      {/* <div className="preview-event__members">
        <div className="preview-event__prop--title">
          Approve members
        </div>
        <div className="preview-event__prop--value">
          {eventData.users ? eventData.users.join(', ') : ''}
        </div>
      </div> */}
      <div className="preview-event__actions mt-6">
        {(
          eventData.authorEmail === userInfo.email && <Button
            type="danger"
            className="preview-event__actions__submit mr-3"
            loading={isLoading}
            onClick={deleteEvent}
          >
            Delete
          </Button>
        )}
        {(
          eventData.authorEmail === userInfo.email && <Button
            type="primary"
            className="preview-event__actions__submit mr-3"
            loading={isLoading}
            onClick={() => props.editEvent(eventData)}
          >
            Edit
          </Button>
        )}
        <Button
          className="preview-event__actions__join"
          loading={isLoading}
          onClick={joinToVideoChat}
        >
          Join to video chat
        </Button>
      </div>
    </Modal>
  );
});

PreviewEvent.propTypes = {
  editEvent: PropTypes.func,
  updateEvents: PropTypes.func,
};
PreviewEvent.displayName = 'PreviewEvent';

export default PreviewEvent;
