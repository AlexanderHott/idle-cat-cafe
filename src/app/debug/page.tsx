"use client";
import { Copy } from "lucide-react";
import { Button } from "~/components/ui/button";

// Helper function to check if a value is a UNIX timestamp
const isUnixTimestamp = (value: string) => {
  const num = Number(value);
  return !isNaN(num) && num > 1000000000 && num < 10000000000;
};

// Helper function to convert UNIX timestamp to readable date
const convertToDate = (timestamp: string) => {
  const date = new Date(Number(timestamp) * 1000);
  return date.toLocaleString();
};

export default function DebugPage() {
  const items: { key: string; value: string | null }[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key !== null) {
      let value = localStorage.getItem(key);
      if (value && isUnixTimestamp(value)) {
        value = convertToDate(value);
      }
      items.push({ key, value });
    }
  }
  return (
    <>
      <h1 className="text-4xl">Careful</h1>
      <Button
        variant={"destructive"}
        onClick={() => {
          localStorage.clear();
        }}
      >
        Reset State
      </Button>
      <table>
        <thead>
          <tr>
            <th>Key</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.key}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        className="flex gap-2"
        onClick={() =>
          navigator.clipboard.writeText(JSON.stringify(items, null, 2))
        }
      >
        Copy JSON <Copy />
      </Button>
    </>
  );
}
