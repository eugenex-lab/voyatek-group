import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";

const HelpCard: React.FC = () => {
  return (
    <div className="mt-auto">
      <Card className="flex flex-row items-center justify-around w-full gap-2 p-6 px-4 rounded cursor-pointer bg-background">
        <CardHeader className="flex flex-col items-center w-12 h-12 p-2 rounded justify-normal bg-primary">
          <CardTitle className="text-lg text-center text-white">Go</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 p-0">
          <span className="text-muted-foreground">Personal Account</span>
          <Icon
            icon="uil:arrow"
            width="24"
            height="24"
            className="rotate-90 text-muted-foreground"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCard;
