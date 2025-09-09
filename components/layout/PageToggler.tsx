import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

type PageTogglerProps = {
  page: number;
  handlePageChange: (page: number) => void;
};

function PageToggler({ page, handlePageChange }: PageTogglerProps) {
  return (
    <div className="flex justify-between m-3 lg:mx-10">
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
    </div>
  );
}

export default PageToggler;
