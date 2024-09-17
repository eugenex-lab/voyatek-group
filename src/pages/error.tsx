// src/pages/ErrorPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import your Button component
import PageLayout from "@/layouts/page-layout"; // Import your PageLayout component

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <PageLayout title="Error - Page Not Found">
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <h1 className="text-4xl font-bold text-red-600">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">
          Oops! The page you are looking for does not exist.
        </p>
        <Button variant="default" size="lg" onClick={() => navigate("/")}>
          Go back home
        </Button>
      </div>
    </PageLayout>
  );
};

export default ErrorPage;
