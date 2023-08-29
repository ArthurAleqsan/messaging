import { FC, useCallback, useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';
// import http from 'src/services/http';
import { getTemplatesFromStrapi } from './../services/messaging.service';
import { EnumMessigingTemplates } from './../types/enums';
// import { MessigingTemplates } from 'src/types/enums';
import { ITemplate } from './../types/interfaces';
// import { removeFromArray } from 'src/utils/helpers';
import './index.scss';
import Views from './Views';
// import Views from './Views';

// interface IProps {
//   userId: string;
//   skinId: string;
//   username: string;
//   token: string;
// }

const removeFromArray = (array: any, findFn: any): any => {
  const index = array.findIndex(findFn);
  const newArray = [...array];
  newArray.splice(index, 1);
  return newArray;
};

const Toaster: FC<any> = () => {
  // fake

  // const fetchMockData = (): any => {
  //   return http.get({ baseURL: '/mock', path: '/messages.json' }).then((res) => {
  //     setMessages(res.data);
  //   });
  // };

  // useEffect(() => {
  //   fetchMockData();
  // }, []);

  const socket: any = useRef(null);

  // const SOCKET_URL: string = process.env.REACT_APP_SOCKET_URL || '';
  // const SOCKET_URL = 'https://staging-newsserviceapi.pokerplaza.com/';

  // const [_isConnected, setIsConnected] = useState<boolean>(false);

  // const [messages, setMessages] = useState<IMessage[]>([]);

  const [messages, setMessages] = useState<any>([]);
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  const handleClose = useCallback(
    (messageId: any) => {
      // const params = {
      //   status: 'read',
      //   accountId: userId,
      //   messageId,
      // };

      console.log(messageId);
      const newMessages = removeFromArray(messages, (message: any) => message._id === messageId);
      console.log(newMessages);
      setMessages(newMessages);
    },
    [messages]
  );

  // const onNewMessage = useCallback((message: any) => {
  //   if (!message) return;
  //   console.log('onNewMessage New socket message ', message);
  //   message.status = 'unread';
  //   //TO DO set event doe message status
  // }, []);

  // useEffect(() => {
  //   console.log(SOCKET_URL);
  //   if (!SOCKET_URL || !userId || !username || !token) return;

  //   socket.current = io(SOCKET_URL, {
  //     query: { username, id: userId, token },
  //   });
  //   (window as any).myNSSocket = socket.current;
  //   console.log('Created the socket gameBox', SOCKET_URL);
  //   setIsConnected(true);
  //   socket.current.on('newMessage', (message: any) => onNewMessage(message));
  //   // socket.current.on('forceLogout', () => onForceLogout());

  //   socket.current.on('disconnect', () => {
  //     console.error('My socket disconnected gameBox :(');
  //   });

  //   return () => {
  //     console.log('Disconnecting and shutting down the socket in return ()');
  //     if (socket.current) socket.current.disconnect(true);
  //     setIsConnected(false);
  //     socket.current = null;
  //   };
  // }, [SOCKET_URL, userId, username, token]);

  useEffect(() => {
    // if (skinId && socket.current) {
    //   socket.current.emit('getMessages', { skinId }, (err: any, params: any) => {
    //     if (err) {
    //       console.error(err);
    //       return;
    //     }
    //     console.log(222, params.payload.messages);
    //     // setMessages(params.payload.messages[userId].filter((m: IMessage) => m.status === 'unread'));
    //   });
    // }
    // TO DO replace this part
    getTemplatesFromStrapi()
      .then((res: any) => res.json())
      .then((res) => {
        const temp = res.data.map((m: any) => m.attributes);
        setTemplates(temp);
      });
  }, [socket.current]);

  // console.log('messages---', messages);
  // console.log('templates---', templates);

  const getContent = useCallback((content: string, params: any): any => {
    return params.reduce((_acc: string, cur: any) => {
      return Object.keys(cur).reduce((_acc, key: string) => {
        return content.replace(`{{${key}}}`, cur[key]);
      }, '');
    }, '');
    // return content.replace('{{username&gt;}}', username);
  }, []);

  (window as any).MSG_PUSH = (message: any) => {
    const template = templates.find((template) => template.messageType === message.messageType);
    if (template) {
      message.content = getContent(template.content, message.params);
      console.log(message.content);
    }
    setMessages([...messages, message]);
  };

  return (
    <div
      style={{
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 10000000000,
      }}
    >
      {/* app---- socket conected: {Number(isConnected)} */}
      {messages.map((message: any) => {
        console.log(message);
        return (
          <Views
            template={message.messageType as EnumMessigingTemplates}
            data={message.content}
            onClose={() => handleClose(message._id)}
          />
        );
      })}
    </div>
  );
};

export default Toaster;
