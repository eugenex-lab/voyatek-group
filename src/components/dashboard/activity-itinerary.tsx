import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const ActivityItinerary: React.FC = () => {
  const plugin = React.useRef(Autoplay({ delay: 2000 }));
  const activities = [
    {
      id: 1,
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant",
      price: "₦123,450.00",
      time: "10:30 AM on Mar 19",
      rating: 4.5,
      reviews: 436,
      duration: "1 Hour",
      included: "Admission to the Empire State Building",
      images: [
        "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop",
      ],
      day: "Day 1",
    },
    {
      id: 2,
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant",
      price: "₦123,450.00",
      time: "10:30 AM on Mar 19",
      rating: 4.5,
      reviews: 436,
      duration: "1 Hour",
      included: "Admission to the Empire State Building",
      images: [
        "https://images.unsplash.com/photo-1602217401979-6f7209f5289d?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1733253870419-81b7b80d52cf?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop",
      ],
      day: "Day 1 - (2)",
    },
    {
      id: 2,
      name: "The Museum of Modern Art",
      description:
        "Works from Van Gogh to Warhol & beyond plus a sculpture garden, 2 cafes & The modern restaurant",
      price: "₦123,450.00",
      time: "10:30 AM on Mar 19",
      rating: 4.5,
      reviews: 436,
      duration: "1 Hour",
      included: "Admission to the Empire State Building",
      images: [
        "https://images.unsplash.com/photo-1602217401979-6f7209f5289d?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1733253870419-81b7b80d52cf?w=800&auto=format&fit=crop&q=60",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop",
      ],
      day: "Day 1 - (2)",
    },
  ];

  return (
    <div className="mt-6">
      {/* Header */}
      <Card className="px-2 bg-[#0054E4] dark:bg-primary/30">
        <CardHeader className="flex flex-row items-center justify-between pt-0">
          <CardTitle className="flex items-center gap-2 text-foreground ">
            <Icon
              icon="ph:road-horizon-light"
              width="24"
              height="24"
              className="dark:text-white"
            />
            <span className="dark:text-white">Activities</span>
          </CardTitle>
          <Button variant="secondary" width={"md"}>
            Add Hotels
          </Button>
        </CardHeader>

        {/* Activities List */}
        <div className="max-h-[600px] overflow-y-auto">
          {activities.map((activity) => (
            <Card
              key={activity.id}
              className="flex justify-between h-56 py-0 mb-4"
            >
              <div className="flex items-center w-full ">
                {/* Image Carousel */}
                <Carousel
                  plugins={[plugin.current]}
                  className="h-48 pl-4 pr-0 w-52 "
                  onMouseEnter={plugin.current.stop}
                  onMouseLeave={plugin.current.reset}
                >
                  <CarouselContent>
                    {activity.images.map((imgUrl, index) => (
                      <CarouselItem key={index}>
                        <img
                          src={imgUrl}
                          alt={`Activity ${activity.name} image ${index + 1}`}
                          className="object-cover h-48 rounded w-52"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>

                {/* Details */}
                <div className="flex-1 p-4 px-0 pb-0 space-y-1">
                  <div className="flex justify-between px-4">
                    <div>
                      <h3 className="text-xl font-bold">{activity.name}</h3>
                      <p className="text-sm text-muted-foreground max-w-96">
                        {activity.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2 text-sm">
                        <div className="flex items-center gap-1 text-blue-500">
                          <Icon icon="ri:map-pin-line" />
                          <span>Directions</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon icon="mdi:star" className="text-yellow-500" />
                          <span>
                            {activity.rating} ({activity.reviews})
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon icon="mdi:clock-outline" />
                          <span>{activity.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end ">
                      <p className="text-2xl font-bold">{activity.price}</p>
                      <p className="text-sm text-muted-foreground">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                  ()
                  <Separator />
                  <div className="flex items-center justify-between h-8 px-4">
                    <div className="flex space-x-1.5 text-muted-foreground">
                      <p className="font-bold">What's Included:</p>
                      <p>{activity.included}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        className="h-4 text-sx bg-[#0A369D] text-foreground py-3"
                        width={"ssm"}
                      >
                        Day 1-(2)
                      </Button>
                      <div className="flex flex-col items-center gap-1.5">
                        <Icon
                          icon="uit:arrow-circle-up"
                          width={"13"}
                          height={"13"}
                        />
                        <Icon
                          icon="uit:arrow-circle-down"
                          width={"13"}
                          height={"13"}
                        />
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center justify-between px-4 mt-4">
                    <div className="flex gap-4">
                      <Button
                        variant="link"
                        size="sm"
                        width={"ssm"}
                        className="pl-0"
                      >
                        Activity details
                      </Button>
                      <Button variant="link" size="sm" width={"ssm"}>
                        Price details
                      </Button>
                    </div>
                    <Button
                      variant="link"
                      size="sm"
                      width={"ssm"}
                      className="pr-0"
                    >
                      Edit details
                    </Button>
                  </div>
                </div>

                {/* Price and Actions */}
              </div>
              <Button
                className="w-6 h-full bg-[#FBEAE9] rounded-none"
                variant={"destructive"}
              >
                X
              </Button>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ActivityItinerary;
