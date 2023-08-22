import { Component, ErrorInfo, ReactNode } from 'react';

interface IProps {
  children: ReactNode;
}

interface IState {
  hasError: boolean;
}
const Item = <div>We’re sorry - something has gone wrong. Please try again or contact the Support.</div>;
class ErrorBoundaryComponent extends Component<IProps, IState> {
  public state: IState = {
    hasError: false,
  };

  public static getDerivedStateFromError(): IState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render(): ReactNode {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return Item;
    }

    return children;
  }
}

export default ErrorBoundaryComponent;
