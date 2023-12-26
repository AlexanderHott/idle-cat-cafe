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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  birastasAtom,
  catToyAtom,
  menuItemsAtom,
  moneyAtom,
} from "~/lib/gameState";
import { useAtom } from "jotai";

type CatToyT = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
  height: number;
  cats: string[];
};
export const CAT_TOYS: CatToyT[] = [
  {
    id: 0,
    name: "Cardboard Box",
    desc: "A cardboard box",
    price: 10,
    image: "/assets/cat-toys/cardboard-box.png",
    height: 0.2,
    cats: [
      "/assets/cats/murchyk/cardboard-box.png",
      "/assets/cats/murchyk/cardboard-box.png",
      "/assets/cats/murchyk/cardboard-box.png",
      "/assets/cats/murchyk/cardboard-box.png",
    ],
  },
  {
    id: 1,
    name: "Ball",
    desc: "boing boing boing",
    price: 120,
    image: "/assets/cat-toys/ball.png",
    height: 0.1,
    cats: [
      "/assets/cats/murchyk/ball.webp",
      "/assets/cats/murchyk/ball.webp",
      "/assets/cats/murchyk/ball.webp",
      "/assets/cats/murchyk/ball.webp",
    ],
  },
  {
    id: 2,
    name: "Cat Bed",
    desc: "Zzz",
    price: 175,
    image: "/assets/cat-toys/cat-bed.png",
    height: 0.08,
    cats: [
      "/assets/cats/murchyk/cat-bed.webp",
      "/assets/cats/murchyk/cat-bed.webp",
      "/assets/cats/murchyk/cat-bed.webp",
      "/assets/cats/murchyk/cat-bed.webp",
    ],
  },
  {
    id: 3,
    name: "Frog Themed Cat Bed",
    desc: "Zzz but in a frog",
    price: 750,
    image: "/assets/cat-toys/frog-cat-bed.png",
    height: 0.2,
    cats: [
      "/assets/cats/murchyk/frog-cat-bed.webp",
      "/assets/cats/murchyk/frog-cat-bed.webp",
      "/assets/cats/murchyk/frog-cat-bed.webp",
      "/assets/cats/murchyk/frog-cat-bed.webp",
    ],
  },
  {
    id: 4,
    name: "Cat Tree",
    desc: "Cats do grow on trees",
    price: 5000,
    image: "/assets/cat-toys/cat-tree.png",
    height: 0.7,
    cats: [
      "/assets/cats/murchyk/cat-tree.webp",
      "/assets/cats/murchyk/cat-tree.webp",
      "/assets/cats/murchyk/cat-tree.webp",
      "/assets/cats/murchyk/cat-tree.webp",
    ],
  },
];
type BaristaT = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
};
const BARISTAS: BaristaT[] = [
  {
    id: 0,
    name: "Axel O",
    desc: "Based",
    price: 10,
    image: "/assets/baristas/axel-o.png",
  },
  {
    id: 1,
    name: "Annabelle (Remote)",
    desc: "I like to draw",
    price: 500,
    image: "/assets/baristas/annabelle.png",
  },
  {
    id: 2,
    name: "Axel Z (Remote)",
    desc: "Based but Brazil",
    price: 1000,
    image: "/assets/baristas/axel-z.png",
  },
  {
    id: 3,
    name: "Oli (Remote)",
    desc: "I'm only here for the cats",
    price: 10000,
    image: "/assets/baristas/oli.png",
  },
];
type MenuItemT = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
};
const MENU_ITEMS: MenuItemT[] = [
  {
    id: 0,
    name: "Black Tea",
    desc: "Classic Black Tea",
    price: 100,
    image: "/assets/menu/black-tea.png",
  },
  {
    id: 1,
    name: "Matcha Tea",
    desc: "Black Tea, but green",
    price: 150,
    image: "/assets/menu/matcha-tea.png",
  },
  {
    id: 2,
    name: "Pancakes",
    desc: "Bumpier than Nebraska",
    price: 250,
    image: "/assets/menu/pancakes.png",
  },
  {
    id: 3,
    name: "Baconeggandcheese",
    desc: "baconeggandcheese",
    price: 3000,
    image: "/assets/menu/baconeggandcheese.png",
  },
  {
    id: 4,
    name: "Cinnamon Roll",
    desc: "Warning: May cause spontaneous sugar rush",
    price: 7500,
    image: "/assets/menu/cinnamon-roll.png",
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
      <SheetContent className="flex grow-0 flex-col">
        <SheetHeader>
          <SheetTitle>Shop</SheetTitle>
          <SheetDescription>Buy some cute cat toys!</SheetDescription>
        </SheetHeader>

        {/*<ScrollArea className="">*/}
        <Tabs defaultValue="toys" className="flex min-h-0 grow flex-col">
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value="toys">
              Toys
            </TabsTrigger>
            <TabsTrigger className="w-full" value="hire">
              Hire
            </TabsTrigger>
            <TabsTrigger className="w-full" value="menu">
              Menu
            </TabsTrigger>
          </TabsList>
          <ScrollArea>
            <TabsContent value="toys">
              <ToyShop />
            </TabsContent>
            <TabsContent value="hire">
              <HireShop />
            </TabsContent>
            <TabsContent value="menu">
              <MenuShop />
            </TabsContent>
          </ScrollArea>
        </Tabs>
        {/* </ScrollArea>*/}
      </SheetContent>
    </Sheet>
  );
}

export function ToyShop() {
  return (
    <div className="flex flex-col gap-2">
      {CAT_TOYS.map((toy) => (
        <CatToy key={toy.id} {...toy} />
      ))}
    </div>
  );
}

function CatToy({ id, name, desc, price, image }: CatToyT) {
  const [catToys, setCatToys] = useAtom(catToyAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const owned = catToys.includes(id);
  function handleClick() {
    setCatToys([...catToys, id]);
    setMoney(money - price);
  }
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between">
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </div>
        <div>
          <Image src={image} alt={name} width={48} height={48} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-row">
        <Button disabled={owned} onClick={handleClick} className="grow">
          {owned ? "Owned" : `$ ${price}`}
        </Button>
      </CardContent>
    </Card>
  );
}

export function HireShop() {
  return (
    <div className="flex flex-col gap-2">
      {BARISTAS.map((toy) => (
        <Barista key={toy.id} {...toy} />
      ))}
    </div>
  );
}

function Barista({ id, name, desc, price, image }: BaristaT) {
  const [birastas, setBirastas] = useAtom(birastasAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const hired = birastas.includes(id);
  function handleClick() {
    setBirastas([...birastas, id]);
    setMoney(money - price);
  }
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
        <Button disabled={hired} onClick={handleClick} className="grow">
          {hired ? "Hired" : `$ ${price}`}
        </Button>
      </CardContent>
    </Card>
  );
}
export function MenuShop() {
  return (
    <div className="flex flex-col gap-2">
      {MENU_ITEMS.map((toy) => (
        <MenuItem key={toy.id} {...toy} />
      ))}
    </div>
  );
}

function MenuItem({ id, name, desc, price, image }: MenuItemT) {
  const [menuItems, setMenuItems] = useAtom(menuItemsAtom);
  const [money, setMoney] = useAtom(moneyAtom);
  const owned = menuItems.includes(id);
  function handleClick() {
    setMenuItems([...menuItems, id]);
    setMoney(money - price);
  }
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
        <Button disabled={owned} onClick={handleClick} className="grow">
          {owned ? "Owned" : `$ ${price}`}
        </Button>
      </CardContent>
    </Card>
  );
}
