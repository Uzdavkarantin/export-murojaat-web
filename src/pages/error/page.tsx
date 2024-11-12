import { Button } from "@/components/ui/button";
import { ChildProps } from "@/types";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ClassBoundary } from "react-error-boundary";

const ErrorBoundary = ({ children }: ChildProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ClassBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="p-10 h-screen items-center justify-center">
              <h3>Oops! Something went Awry</h3>
              <p>
                We’re sorry, but seems there’s been a hiccup on our end. Our team has been notified
                and is working diligently to resolve this issue.
              </p>
              <Button className="w-full max-w-32" onClick={resetErrorBoundary}>
                Try again
              </Button>
            </div>
          )}
        >
          {children}
        </ClassBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default ErrorBoundary;
