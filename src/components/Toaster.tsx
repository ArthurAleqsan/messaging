import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import http from 'src/services/http';
import { getTemplatesFromStrapi } from 'src/services/messaging.service';
import { MessigingTemplates } from 'src/types/enums';
// import { MessigingTemplates } from 'src/types/enums';
import { IMessage, ITemplate } from 'src/types/interfaces';
import './index.scss';
import Views from './Views';
// import Views from './Views';

interface IProps {
  userId: string;
  skinId: string;
  username: string;
  token: string;
}

const Toaster: FC<IProps> = ({ userId, username, token, skinId }) => {
  // fake

  const fetchMockData = (): any => {
    return http.get({ baseURL: '/mock', path: '/messages.json' }).then((res) => {
      setMessages(res.data);
    });
  };

  useEffect(() => {
    fetchMockData();
  }, []);

  const socket: any = useRef(null);

  const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || '';

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const handleClose = useCallback((messageId: string) => {
    const params = {
      status: 'read',
      accountId: userId,
      messageId,
    };

    console.log(params);
  }, []);

  const onNewMessage = useCallback((message: any) => {
    if (!message) return;
    console.log('onNewMessage New socket message ', message);
    message.status = 'unread';
    //TO DO set event doe message status
  }, []);

  useEffect(() => {
    console.log(SOCKET_URL);
    if (!SOCKET_URL || !userId || !username || !token) return;

    socket.current = io(SOCKET_URL, {
      query: { username, id: userId, token },
    });
    (window as any).myNSSocket = socket.current;
    console.log('Created the socket gameBox', SOCKET_URL);
    setIsConnected(true);
    socket.current.on('newMessage', (message: any) => onNewMessage(message));
    // socket.current.on('forceLogout', () => onForceLogout());

    socket.current.on('disconnect', () => {
      console.error('My socket disconnected gameBox :(');
    });

    return () => {
      console.log('Disconnecting and shutting down the socket in return ()');
      if (socket.current) socket.current.disconnect(true);
      setIsConnected(false);
      socket.current = null;
    };
  }, [SOCKET_URL, userId, username, token]);

  useEffect(() => {
    if (skinId && socket.current) {
      socket.current.emit('getMessages', { skinId }, (err: any, params: any) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(222, params.payload.messages);
        // setMessages(params.payload.messages[userId].filter((m: IMessage) => m.status === 'unread'));
      });
    }
    getTemplatesFromStrapi()
      .then((res) => res.json())
      .then((res) => {
        const temp = res.data.map((m: any) => m.attributes);
        setTemplates(temp);
      });
  }, [socket.current, skinId]);

  console.log('messages---', messages);
  console.log('templates---', templates);

  const getContent = useCallback((content: any): any => {
    return content.replace('{{username&gt;}}', 'flan');
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
      }}
    >
      app---- socket conected: {Number(isConnected)}
      {templates?.length &&
        messages.map((message: IMessage) => {
          return (
            <Views
              template={MessigingTemplates.notification}
              data={getContent(templates?.[0].content)}
              onClose={() => handleClose(message._id)}
            />
          );
        })}
    </div>
  );
};

export default Toaster;
