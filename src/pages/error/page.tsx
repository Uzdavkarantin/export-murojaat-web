import { Button } from "@/components/ui/button";
import { ChildProps } from "@/types";
import { QueryErrorResetBoundary } from "@tanstack/react-query";
import { ErrorBoundary as ClassBoundary } from "react-error-boundary";
import codeErrorImg from "@/assets/icons/code-error.png";

const ErrorBoundary = ({ children }: ChildProps) => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ClassBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <div className="container mx-auto flex h-screen items-center justify-center flex-col space-y-3 p-2 text-center">
              <img src={codeErrorImg} alt="error" className="w-36" />
              <h3 className="text-4xl font-semibold text-primary">Oops! Something went wrong!</h3>
              <p className="text-sm font-semibold">Don't worry, our team is here to help!</p>
              <Button className="w-full max-w-36" onClick={resetErrorBoundary}>
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
