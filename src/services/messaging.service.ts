import http from './http';

export const markAsRead = (payload: any): Promise<any> => {
  return http.patch({ path: `/subscribtion`, baseURL: process.env.REACT_APP_MESSAGING as string }, payload);
};

export const getTemplatesFromStrapi = (): Promise<any> => {
  return fetch('https://strapi.draft10.com/api/gd-messages?populate=*');
};
