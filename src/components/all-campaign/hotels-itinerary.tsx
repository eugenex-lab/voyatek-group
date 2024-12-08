import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

const HotelItinerary: React.FC = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const hotels = [
    {
      id: 1,
      name: "Riviera Resort, Lekki",
      address:
        "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
      price: "₦123,450.00",
      totalPrice: "₦560,000",
      nights: "1 room x 10 nights incl. taxes",
      checkIn: "20-04-2024",
      checkOut: "29-04-2024",
      rating: 8.5,
      reviews: 436,
      roomType: "King size room",
      facilities: ["Pool", "Bar"],
      image: [
        "https://plus.unsplash.com/premium_photo-1661964071015-d97428970584?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aG90ZWx8ZW58MHx8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
      ],
    },
    {
      id: 2,
      name: "Riviera Resort, Lekki",
      address:
        "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
      price: "₦123,450.00",
      totalPrice: "₦560,000",
      nights: "1 room x 10 nights incl. taxes",
      checkIn: "20-04-2024",
      checkOut: "29-04-2024",
      rating: 8.5,
      reviews: 436,
      roomType: "King size room",
      facilities: ["Pool", "Bar"],
      image: [
        "https://images.unsplash.com/photo-1602217401979-6f7209f5289d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE3fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1733253870419-81b7b80d52cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE4fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
      ],
    },
    {
      id: 2,
      name: "Riviera Resort, Lekki",
      address:
        "18, Kenneth Agbakuru Street, Off Access Bank Admiralty Way, Lekki Phase1",
      price: "₦123,450.00",
      totalPrice: "₦560,000",
      nights: "1 room x 10 nights incl. taxes",
      checkIn: "20-04-2024",
      checkOut: "29-04-2024",
      rating: 8.5,
      reviews: 436,
      roomType: "King size room",
      facilities: ["Pool", "Bar"],
      image: [
        "https://plus.unsplash.com/premium_photo-1661676037890-f8b49416b54f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDM2fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1605538108568-7f0d77a214c1?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ2fHx8ZW58MHx8fHx8",
        "https://images.unsplash.com/photo-1490122417551-6ee9691429d0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDEwfHx8ZW58MHx8fHx8",
      ],
    },
  ];

  return (
    <div className="">
      <div className="mt-6">
        <Card className="px-2 bg-[#344054]">
          <CardHeader className="flex flex-row items-center justify-between pt-0">
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Icon icon="ph:warehouse-duotone" width="24" height="24" />
              <span>Hotels</span>
            </CardTitle>
            <Button variant="secondary" width={"md"}>
              Add Hotels
            </Button>
          </CardHeader>

          <CardContent className="max-h-[600px] flex">
            <div className="w-full overflow-y-scroll">
              {hotels.map((hotel) => (
                <Card key={hotel.id} className="flex justify-between py-0 mb-4">
                  <Carousel
                    plugins={[plugin.current]}
                    className="w-56 h-56 p-3 pr-0"
                    onMouseEnter={plugin.current.stop}
                    onMouseLeave={plugin.current.reset}
                  >
                    <CarouselContent>
                      {hotel.image.map((imgUrl, index) => (
                        <CarouselItem key={index}>
                          <img
                            src={imgUrl}
                            alt={`Hotel ${hotel.name} image ${index + 1}`}
                            className="object-cover w-56 h-[230px] rounded"
                          />
                        </CarouselItem>
                      ))}
                    </CarouselContent>

                    <CarouselPrevious />
                    <CarouselNext />
                  </Carousel>
                  <div className="w-full">
                    <div className="flex items-start justify-between p-4">
                      {/* Left: Hotel Details */}
                      <div className="flex-1">
                        <h5 className="text-xl font-bold">{hotel.name}</h5>
                        <p className="text-sm max-w-96">{hotel.address}</p>

                        <div className="flex items-center gap-2 mt-2 text-sm">
                          <div className="flex items-center gap-1.5 text-primary">
                            <Icon icon="ri:map-pin-line" />
                            <p className="text-sm ">Show in map</p>
                          </div>
                          <Icon icon="mdi:star" className="text-yellow-500" />
                          <p className="text-muted-foreground">
                            {hotel.rating} ({hotel.reviews})
                          </p>
                          <span>
                            <Icon icon="ph:bed-fill" />
                          </span>
                          <p>{hotel.roomType}</p>
                        </div>
                      </div>

                      {/* Right: Price and Actions */}
                      <div className="flex flex-col items-end">
                        <p className="text-2xl font-bold text-left">
                          {hotel.price}
                        </p>
                        <p className="text-left">
                          Total Price: {hotel.totalPrice}
                        </p>

                        <p className="text-sm ">{hotel.nights}</p>
                      </div>
                    </div>
                    <Separator />
                    {/* Facilities Section */}
                    <div className="flex justify-between p-4 text-sm text-muted-foreground">
                      <p>
                        <span className="font-bold">Facilities:</span>{" "}
                        {hotel.facilities.join("  ")}
                      </p>
                      <div className="flex gap-2 text-center">
                        <div className="flex flex-row space-x-0.5 items-center">
                          <Icon
                            icon="uit:calender"
                            className="text-secondary pb-0.5 "
                            height={"18"}
                            width={"18"}
                          />
                          <p className="font-bold ">Check In:</p>
                          <p className="text-sm text-muted-foreground">
                            {hotel.checkIn}
                          </p>
                        </div>
                        <div className="flex flex-row space-x-0.5 items-center">
                          <Icon
                            icon="uit:calender"
                            height={"18"}
                            width={"18"}
                            className="pb-0.5 text-secondary"
                          />
                          <p className="font-bold ">Check Out:</p>
                          <p className="text-sm text-muted-foreground">
                            {hotel.checkOut}
                          </p>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    {/* Bottom Actions */}
                    <div className="flex justify-between p-4 text-sm text-muted-foreground">
                      <div className="flex gap-4">
                        <Button
                          variant="link"
                          size="icon"
                          width={"ssm"}
                          className="pl-0"
                        >
                          Hotel details
                        </Button>
                        <Button variant="link" size="icon" width={"ssm"}>
                          Price details
                        </Button>
                      </div>
                      <Button
                        variant="link"
                        size="icon"
                        width={"ssm"}
                        className="pr-0"
                      >
                        Edit details
                      </Button>
                    </div>
                  </div>
                  <Button
                    className="w-6 bg-[#FBEAE9] rounded-none"
                    variant={"destructive"}
                  >
                    X
                  </Button>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HotelItinerary;
