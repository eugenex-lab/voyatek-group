// src/pages/ErrorPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // Import your Button component
import lottieJson from "@/assets/json/err.json";
import Lottie from "react-lottie-player";

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold text-red-600">
        {" "}
        <Lottie
          loop={true}
          animationData={lottieJson}
          play={true}
          className="h-28 w-28"
        />
      </h1>
      <p className="mb-4 text-xl text-muted-foreground">
        Oops! The page you are looking for does not exist.
      </p>
      <Button variant="default" size="lg" onClick={() => navigate("/")}>
        Go back home
      </Button>
    </div>
  );
};

export default ErrorPage;
