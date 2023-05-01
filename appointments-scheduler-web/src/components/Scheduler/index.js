import React, { useEffect, useState, useRef } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { Modal, Spin } from 'antd';
// Components
import UpdateEventsForm from './UpdateEventsForm';
import PreviewEvent from './PreviewEvent';
// Utils
import { formatDateForEvent } from '@utils/timeUtils';
import { getParsedParams } from '@utils/routerUtils';
// Styles
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FirebaseData } from '../../services/firebaseDB';

const localizer = momentLocalizer(moment);
let spin = null;

export default function Basic() {
  const [events, setEvents] = useState([]);
  const [start, setStart] = useState(moment(new Date()).startOf('month').format());
  const [end, setEnd] = useState(moment(new Date()).endOf('month').format());

  const eventModal = useRef();
  const previewEventModal = useRef();

  const history = useHistory();

  useEffect(() => {
    getEvents();
  }, [start, end]);



  useEffect(() => {
    const previewEvent = getParsedParams(history.location.search)?.previewEvent;

    if (previewEvent) {
      const event = events.find(event => event.id === previewEvent);

      if (event) previewEventModal.current.openModal(event);
    }
  }, [events]);


  const getStartAndEndDate = (date, view) => {
    let viewSet = view;
    if(view === 'agenda')
      viewSet = 'day';

    setStart(moment(date).startOf(viewSet).format());
    setEnd(moment(date).endOf(viewSet).format());
    
   
  };

  const getEvents = async() => {
    showSpin();

    try {
      const eventsData = await FirebaseData.getEvents(start, end);
      setEvents(eventsData);
    } catch (e) {
      console.log(e);
    } finally {
      spin.destroy();
    }
  };

  const handleSelectEvent = event => {
    previewEventModal.current.openModal(event);
  };

  const editEvent = event => {
    previewEventModal.current.closeModal();
    eventModal.current.openModal({
      ...event,
      period: [
        formatDateForEvent(event.start),
        formatDateForEvent(event.end),
      ],
    }, true);
  };

  const handleSelectSlot = event => {
    eventModal.current.openModal({
      period: [
        formatDateForEvent(event.start),
        formatDateForEvent(event.end),
      ],
    });
  };

  const showSpin = () => {
    spin = Modal.info({
      className: 'spin-modal',
      content: (
        <div>
          <Spin size="large" />
        </div>
      ),
    });
  };

  return (
    <div className="App">
      <UpdateEventsForm
        ref={eventModal}
        updateEvents={getEvents}
      />
      <PreviewEvent
        ref={previewEventModal}
        editEvent={editEvent}
        updateEvents={getEvents}
      />
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: '100vh' }}
        onSelectEvent={handleSelectEvent}
        onSelectSlot={handleSelectSlot}
        onNavigate={getStartAndEndDate}
        selectable
      />
    </div>
  );
}
