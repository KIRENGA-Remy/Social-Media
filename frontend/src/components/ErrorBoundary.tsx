// import React, { Component, ReactNode } from 'react';

// interface ErrorBoundaryProps {
//   children: ReactNode;
// }

// interface ErrorBoundaryState {
//   hasError: boolean;
// }

// class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
//   constructor(props: ErrorBoundaryProps) {
//     super(props);
//     this.state = { hasError: false };
//   }

//   static getDerivedStateFromError() {
//     // Update state so the next render will show the fallback UI
//     return { hasError: true };
//   }

//   componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
//     // You can log the error to an error reporting service here
//     console.error("Error boundary caught an error", error, errorInfo);
//   }

//   render() {
//     if (this.state.hasError) {
//       // Render any fallback UI
//       return <h2>Something went wrong.</h2>;
//     }

//     return this.props.children;
//   }
// }

// export default ErrorBoundary;
