import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
    return (
        <>
            <Helmet>
                <title>Page Not Found | Junko FZE</title>
                <meta name="robots" content="noindex" />
            </Helmet>
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-background-light dark:bg-background-dark">
                <div className="bg-primary/10 rounded-full p-8 mb-6">
                    <span className="material-symbols-outlined text-6xl text-primary">running_with_errors</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-text-main dark:text-white mb-4">404</h1>
                <h2 className="text-2xl font-bold text-text-main dark:text-white mb-4">Page Not Found</h2>
                <p className="text-lg text-text-sub dark:text-gray-400 max-w-md mb-8">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>
                <Link to="/" className="flex items-center gap-2 h-12 px-8 bg-primary hover:bg-primary-hover text-white font-bold rounded shadow-lg transition-colors">
                    <span className="material-symbols-outlined text-sm">home</span>
                    Back to Home
                </Link>
            </div>
        </>
    );
};

export default NotFound;
