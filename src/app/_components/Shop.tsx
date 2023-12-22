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
  purchasedCatToysAtomWithPersistence,
  hiredEmployeesAtomWithPersistence,
  ownedMenuItemsAtomWithPersistence,
} from "~/lib/gameState";
import { useAtom } from "jotai";
import { moneyAtomWithPersistence } from "~/app/_components/Game";

type CatToy = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
};
const CAT_TOYS: CatToy[] = [
  {
    id: 0,
    name: "Cardboard box 0",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    id: 1,
    name: "Cardboard box 1",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
  {
    id: 2,
    name: "Cardboard box 2",
    desc: "A cardboard box",
    price: 10,
    image: "/box.png",
  },
];
type Emp = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
};
const EMPS: Emp[] = [
  {
    id: 0,
    name: "AAron O",
    desc: "Based",
    price: 69,
    image: "/box.png",
  },
  {
    id: 1,
    name: "AAron Z",
    desc: "Based but 🇧",
    price: 69420,
    image: "/box.png",
  },
  {
    id: 2,
    name: "O boy i love cats",
    desc: "I'm only here for the cats",
    price: 10,
    image: "/box.png",
  },
  {
    id: 3,
    name: "Short person",
    desc: "I like to draw",
    price: 10,
    image: "/box.png",
  },
  {
    id: 4,
    name: "Short person",
    desc: "I like to draw",
    price: 10,
    image: "/box.png",
  },
  {
    id: 5,
    name: "Short person",
    desc: "I like to draw",
    price: 10,
    image: "/box.png",
  },
];
type MenuItem = {
  id: number;
  name: string;
  desc: string;
  price: number;
  image: string;
};
const MENU_ITEMS: MenuItem[] = [
  {
    id: 0,
    name: "Tea",
    desc: "Some tea i guess",
    price: 10,
    image: "/box.png",
  },
  {
    id: 1,
    name: "Quassan't",
    desc: "Are you gonna finish that -- quassan't",
    price: 10000,
    image: "/box.png",
  },
  {
    id: 2,
    name: "Dehydrated water",
    desc: "pure air; no bs",
    price: 4,
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

function CatToy({ id, name, desc, price, image }: CatToy) {
  const [purchasedToys, setPurchasedToys] = useAtom(
    purchasedCatToysAtomWithPersistence,
  );
  const [money, setMoney] = useAtom(moneyAtomWithPersistence);
  const owned = purchasedToys.includes(id);
  function handleClick() {
    setPurchasedToys([...purchasedToys, id]);
    setMoney((m) => m - price);
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
        <Button disabled={owned} onClick={handleClick}>
          {owned ? "Owned" : `$ ${price}`}
        </Button>
      </CardContent>
    </Card>
  );
}

export function HireShop() {
  return (
    <div className="flex flex-col gap-2">
      {EMPS.map((toy) => (
        <Employee key={toy.id} {...toy} />
      ))}
    </div>
  );
}

function Employee({ id, name, desc, price, image }: CatToy) {
  const [hiredEmps, setHiredEmps] = useAtom(hiredEmployeesAtomWithPersistence);
  const [money, setMoney] = useAtom(moneyAtomWithPersistence);
  const hired = hiredEmps.includes(id);
  function handleClick() {
    setHiredEmps([...hiredEmps, id]);
    setMoney((m) => m - price);
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
        <Button disabled={hired} onClick={handleClick}>
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

function MenuItem({ id, name, desc, price, image }: CatToy) {
  const [menuItems, setMenuItems] = useAtom(ownedMenuItemsAtomWithPersistence);
  const [money, setMoney] = useAtom(moneyAtomWithPersistence);
  const owned = menuItems.includes(id);
  function handleClick() {
    setMenuItems([...menuItems, id]);
    setMoney((m) => m - price);
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
        <Button disabled={owned} onClick={handleClick}>
          {owned ? "Owned" : `$ ${price}`}
        </Button>
      </CardContent>
    </Card>
  );
}
