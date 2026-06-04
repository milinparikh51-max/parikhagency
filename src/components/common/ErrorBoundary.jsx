import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReset = () => {
        if (window.confirm("This will clear all verified data and reset the app. Are you sure?")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                    <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
                        <p className="text-gray-600 mb-6">
                            We encountered an unexpected error.
                        </p>
                        <div className="bg-gray-100 p-4 rounded-lg text-left mb-6 overflow-auto max-h-40 text-xs font-mono text-red-500">
                            {this.state.error?.toString()}
                        </div>
                        <button
                            onClick={this.handleReset}
                            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors w-full font-bold"
                        >
                            Reset Application & Clear Data
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            className="mt-4 text-gray-500 hover:text-gray-700 text-sm underline"
                        >
                            Try Reloading Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
