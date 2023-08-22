import { FC } from 'react';
import Toaster from './components/Toaster';
import ErrorBoundaryComponent from './hoc/ErrorBoundary';
export const token =
  // eslint-disable-next-line max-len
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTc5ODUxLCJuYW1lIjoicGl4Z2FtZXMxMTIiLCJ0eXBlSWQiOjEsInBlcm1pc3Npb24iOjQsIm93bmVyIjoid2ViIiwibG9naW5WZXJpZmljYXRpb24iOnRydWUsInBhcmVudHMiOls1NzIyMjEsNTAwMDAyLDUwMDAwMSwwXSwib3BlcmF0b3JJZCI6NTcyMjIxLCJpYXQiOjE2OTI1OTgyMzgsImV4cCI6MTY5MjYyNzAzOH0.beduMxLiOfIr-XCAV7zu5SJUs_oNYhGuhfiXi7G9npI';
const App: FC = () => {
  return (
    <ErrorBoundaryComponent>
      <Toaster userId={'579851'} username={'user12345'} token={token} skinId="572221" />
    </ErrorBoundaryComponent>
  );
};

export default App;
