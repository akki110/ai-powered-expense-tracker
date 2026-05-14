import { Loader2 } from "lucide-react";

export default function Loader() {
  return (
    <div className="p-8 text-center text-muted-foreground flex justify-center items-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <Loader2 className="animate-spin text-black dark:text-white" />
    </div>
  );
}
