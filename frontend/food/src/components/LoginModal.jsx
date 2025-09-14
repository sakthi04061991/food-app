import React, { useState } from "react";
import { Modal } from "react-bootstrap";

export default function LoginModal({children, show,onClose,title}) {
  console.log("show",show)
  return (
    <Modal show={show} onHide={onClose} centered>
        <Modal.Body>
            {children}
        </Modal.Body>
      </Modal>
  )
}
