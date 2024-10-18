// eslint-disable-next-line no-unused-vars
import React from 'react'
import PropTypes from "prop-types"


/**
 * Modal component
 * @param {string} title - The title of the modal
 * @param {boolean} isOpen - The state of the modal
 * @param {function} onClose - The function to close the modal
 * @param {function} onConfirm - The function to confirm the action
 * @param {any} children - The children of the modal
 * @returns {JSX.Element}
 * @example <Modal isOpen={isOpen} title={"Add Recipe"} onClose={onClose} onConfirm={onConfirm}>
 * </Modal>
 */
const Modal = (props) => {
  return (
    <div
          className={` ${
            props.isOpen ? "" : "hidden"
          } fixed w-full h-full text-black backdrop-blur-sm z-[1000]`}
        >
          <div className="fixed top-[30%] flex flex-col w-full px-4 z-[200] drop-shadow-2xl ">
            <div className={`flex flex-row items-center ${ props.onConfirm ? 'rounded-t-md' : '' } bg-white h-12 justify-end border border-gray-100 border-1`}>
              <div className="mr-auto text-xl font-bold mx-8">{props.title}</div>
              <i
              onClick={() => props.onClose() }
              className="fa-solid fa-close my-auto mx-8"
              ></i>
            </div>
            <div className="flex flex-col space-y-4 py-8 px-8 bg-white">
              {props.children}
            </div>
            { props.onConfirm && <button
              className="bg-green-600 rounded-b-md p-2 w-full text-white font-bold"
              onClick={() => props.onConfirm() }
            >
              Confirm
            </button>}
            </div>
        </div>
  )
}

Modal.propTypes = {
    title: PropTypes.string,
    isOpen: PropTypes.bool,

    children: PropTypes.any,

    onClose: PropTypes.func,
    onConfirm: PropTypes.func

}

export default Modal;