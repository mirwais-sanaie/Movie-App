"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface PageTogglerProps {
  page: number;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
}

export default function PageToggler({
  page,
  totalPages = 0,
  handlePageChange,
}: PageTogglerProps) {
  return (
    <div className="flex justify-center gap-4 my-6">
      {totalPages ? (
        <>
          <Button
            disabled={page <= 1}
            onClick={() => handlePageChange(page - 1)}
          >
            Prev
          </Button>
          <span className="px-4 py-2">
            Page {page} of {totalPages}
          </span>
          <Button
            disabled={page >= totalPages}
            onClick={() => handlePageChange(page + 1)}
          >
            Next
          </Button>
        </>
      ) : (
        <>
          {page > 1 && (
            <Button
              size="lg"
              className="py-6 cursor-pointer"
              onClick={() => handlePageChange(page - 1)}
            >
              <ArrowLeft />
              Page {page - 1}
            </Button>
          )}

          <Button
            size="lg"
            className="py-6 cursor-pointer ml-auto"
            onClick={() => handlePageChange(page + 1)}
          >
            Page {page + 1}
            <ArrowRight />
          </Button>
        </>
      )}
    </div>
  );
}
