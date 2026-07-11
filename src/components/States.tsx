import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertCircle, RotateCw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public props!: Props;
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in React render cycle:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary-state" className="min-h-[400px] flex items-center justify-center p-6 text-center">
          <div className="max-w-md bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
            <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-4" />
            <h3 className="font-display font-bold text-lg text-brand-slate">An Error Occurred</h3>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              We apologise for the inconvenience. A technical error occurred while rendering this page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-6 px-5 py-2.5 bg-brand-blue hover:bg-brand-accent text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 mx-auto transition cursor-pointer"
            >
              <RotateCw className="w-3.5 h-3.5" /> Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export function LoadingState() {
  return (
    <div id="loading-state" className="min-h-[300px] flex items-center justify-center py-12">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-brand-accent border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-xs text-slate-400 font-medium">Loading content, please wait...</p>
      </div>
    </div>
  );
}

export function EmptyState({ message = "No matching records found." }: { message?: string }) {
  return (
    <div id="empty-state" className="min-h-[250px] flex items-center justify-center py-12 px-4 border border-dashed border-slate-200 rounded-2xl text-center bg-slate-50/50">
      <div className="max-w-xs mx-auto">
        <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
        <p className="text-sm text-slate-500 leading-relaxed font-medium">{message}</p>
      </div>
    </div>
  );
}
