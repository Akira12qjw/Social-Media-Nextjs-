import {
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Post from "../../tweet/_components/button-post";
import { Dialog } from "@/components/ui/dialog";
import React, { useState } from "react";

export default function ModalPost() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-center group relative items-center w-14 h-14 bg-gray-950 hover:bg-gray-800 cursor-pointer rounded-full">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-white"
            style={{ color: "rgb(255, 255, 255)" }}
          >
            <g>
              <path d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z" />
            </g>
          </svg>
        </div>
      </DialogTrigger>
      <DialogTitle>
        <DialogContent className="sm:max-w-[600px] p-0 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center p-6 border-b" />
          <Post onPostSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </DialogTitle>
    </Dialog>
  );
}
