import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTimeago from 'react-timeago';
import { FaCopy } from 'react-icons/fa';

import { StateType } from '../reducers';
import { sendChatMessageAction } from '../actions/state';
import {
  animationPropsOpacity,
  animationPropsSlide,
} from '../animationSettings';

const Chat: React.FC = () => {
  const chat = useSelector((store: StateType) => store.chat);
  const dispatch = useDispatch();

  const [message, setMessage] = useState('');
  const sendMessage = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!message) {
        return;
      }

      dispatch(sendChatMessageAction(message));
      setMessage('');
    },
    [dispatch, message, setMessage]
  );

  return (
    <div className="subsection chat">
      {chat.length === 0 && (
        <motion.span {...animationPropsOpacity}>
          <div>No chat messages... so far.</div>
        </motion.span>
      )}
      <ul>
        <AnimatePresence>
          {chat.map(item => (
            <motion.li
              className="subsection info-grid"
              key={item.id}
              {...animationPropsSlide}
              aria-label="Chat message"
            >
              <div className="chat-info">
                <div
                  className="network-tile target-tile"
                  style={{
                    backgroundColor: item.clientColor,
                  }}
                />
                <div>
                  <ReactTimeago date={item.date} />
                </div>
                <CopyToClipboard text={item.message}>
                  <button className="chat-action">
                    <FaCopy />
                  </button>
                </CopyToClipboard>
              </div>
              <div className="chat-message">{item.message}</div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
};

export default Chat;
