"use client";
import packageJson from "package.json";
import { ExternalLink, Newspaper } from "lucide-react";
import Link from "next/link";
import { Button, ButtonWithNotification } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Suspense, memo } from "react";
import { ScrollArea } from "~/components/ui/scroll-area";
import { useAtom } from "jotai";
import { lastReleaseAtom } from "~/lib/gameState";

export function ReleaseNotes() {
  const [lastRelease] = useAtom(lastReleaseAtom);
  const seenLatestPatchNotes = lastRelease === "v" + packageJson.version;
  return (
    <Sheet>
      <SheetTrigger asChild>
        <ButtonWithNotification
          size={"icon"}
          notification={!seenLatestPatchNotes}
        >
          <Newspaper />
        </ButtonWithNotification>
        {/*
        <Button size="icon">
        </Button>
        */}
      </SheetTrigger>
      <SheetContent className="flex flex-col justify-between">
        <SheetHeader className="flex flex-col">
          <SheetTitle>Release Notes</SheetTitle>
          <SheetDescription className="text-lg">
            See what's new! <span className="mx-2">•</span> v
            {packageJson.version}
          </SheetDescription>
        </SheetHeader>
        <Suspense fallback={<GitHubReleaseNotesSkeleton />}>
          <GitHubReleaseNotesFetcher />
        </Suspense>
        <div className="flex flex-wrap gap-2">
          <Link
            href="https://github.com/AlexanderHott/idle-cat-cafe/releases"
            target="_blank"
          >
            <Button className="items-center gap-2">
              View on GitHub
              <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}

type ReleaseNote = {
  name: string;
  body: string;
  html_url: string;
  id: string;
  created_at: string;
};
const GitHubReleaseNotesFetcher = memo(
  async function GitHubReleaseNotesFetcher() {
    const res = await fetch(
      "https://api.github.com/repos/AlexanderHOtt/idle-cat-cafe/releases",
    );
    const releaseNotes = (await res.json()) as ReleaseNote[];
    console.log("rn", releaseNotes);
    return <GitHubReleaseNotes releaseNotes={releaseNotes} />;
  },
);

function GitHubReleaseNotes({ releaseNotes }: { releaseNotes: ReleaseNote[] }) {
  const [, setLastRelease] = useAtom(lastReleaseAtom);
  setLastRelease(releaseNotes[0]!.name);
  return (
    <ScrollArea className="flex-grow">
      <div className="flex flex-col justify-start gap-4">
        {releaseNotes.map((rn) => (
          <ReleaseNote {...rn} />
        ))}
      </div>
    </ScrollArea>
  );
}

function ReleaseNote({ id, name, body, html_url, created_at }: ReleaseNote) {
  const createdAtText = new Date(created_at).toLocaleDateString();
  return (
    <div key={id}>
      <Link
        href={html_url}
        className="flex shrink items-center gap-1 text-xl text-amber-900 hover:underline dark:text-amber-50"
        target="_blank"
      >
        {name}
        <ExternalLink className="h-3 w-3" />
      </Link>
      <time
        dateTime={created_at}
        className="text-amber-800 dark:text-amber-100"
      >
        {createdAtText}
      </time>
      {body.split("\r\n").map((text) => (
        <p className="text-amber-500 dark:text-amber-400">{text}</p>
      ))}
    </div>
  );
}

function GitHubReleaseNotesSkeleton() {
  return (
    <div className="flex flex-grow flex-col gap-4">
      <div className="rounded- h-32 w-full animate-pulse bg-amber-400/20" />
      <div className="rounded- h-20 w-full animate-pulse bg-amber-400/20" />
      <div className="rounded- h-40 w-full animate-pulse bg-amber-400/20" />
    </div>
  );
}
