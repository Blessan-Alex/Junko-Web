import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children?: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                            <span className="material-symbols-outlined text-3xl text-red-600 dark:text-red-400">error_outline</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 font-serif">Something went wrong</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 font-sans">
                            We encountered an unexpected error. Please try refreshing the page.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-primary hover:bg-primary-hover text-white font-bold py-3 px-4 rounded transition-colors font-sans"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
