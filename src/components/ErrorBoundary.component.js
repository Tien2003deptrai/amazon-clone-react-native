import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log to the console
  }

  render() {
    if (this.state.hasError) {
      // Use Fallback UI when error happen
      return this.props.children;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
