import { Button } from "~/components/ui/button";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { ScrollArea } from "~/components/ui/scroll-area";

type CatToy = { name: string; desc: string; price: number; image: string };
const CAT_TOYS: CatToy[] = [
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    name: "Cardboard box",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
];

export function Shop() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon">
          <ShoppingCart />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <ScrollArea className="h-screen">
            <SheetTitle>Shop</SheetTitle>
            <SheetDescription>
              Buy some cute cat toys!
            </SheetDescription>
            <div className="flex flex-col gap-2 pt-2">
              {CAT_TOYS.map((toy) => <CatToy {...toy} />)}
            </div>
          </ScrollArea>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

function CatToy({ name, desc, price, image }: CatToy) {
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <div>
          <Image src={image} alt={name} width={24} height={24} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-row justify-end">
        <Button>$ {price}</Button>
      </CardContent>
    </Card>
  );
}
