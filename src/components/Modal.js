import React, { useState } from 'react';

import BootstrapModal from 'react-bootstrap/Modal';

import { Events } from 'helpers/events';

/* Initialize events for the Modal */
const ModalEvents = new Events();

/* Controls for the Modal */
export const ModalControl =
{
  /* Show the Modal */
  show: () => ModalEvents.trigger('toggle', true),

  /* Close the Modal */
  close: () => ModalEvents.trigger('toggle', false),

  /* Togggle the Modal */
  toggle: state => ModalEvents.trigger('toggle', state),
}

export function Modal(
{
  title,
  body,
  onConfirm = () => {},
  onClose = () => {},
  confirmButtonText,
  confirmButtonClass,
})
{
  const [ show, setShow ] = useState();

  ModalEvents.listen('toggle', state => setShow(state !== undefined? state : !show));

  return (
    <BootstrapModal show={show} onHide={onClose} centered>
      <BootstrapModal.Header closeButton>
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
      </BootstrapModal.Header>
      <BootstrapModal.Body>{body}</BootstrapModal.Body>
      <BootstrapModal.Footer className="modal-footer">
        <button className="btn btn-default" type="button" onClick={() =>
        {
          onClose();
          setShow(false);
        }}>
          <i className="fa fa-times mr-1"></i> Close
        </button>
        <button className={`btn ${confirmButtonClass?
          confirmButtonClass : 'btn-primary'}`}  type="button" onClick={() =>
          {
            onConfirm();
            onClose();
          }}>
          {confirmButtonText?
            confirmButtonText :
            <><i className="fa fa-check mr-1"></i> Confirm</>}
        </button>
      </BootstrapModal.Footer>
    </BootstrapModal>
  );
}
