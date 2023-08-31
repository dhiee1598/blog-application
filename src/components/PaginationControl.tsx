import { PaginationProps } from "@/types/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const PaginationControl = ({
  hasNextPage,
  hasPrevPage,
  total_page,
}: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1";
  const per_page = searchParams.get("per_page") ?? "9";

  return (
    <div className="w-full flex justify-center items-center my-5">
      <button
        type="button"
        disabled={!hasPrevPage}
        onClick={() => {
          router.push(`/home?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <FaAngleDoubleLeft size={20} />
      </button>
      <p className="px-5 py-2 shadow-md">
        {page} / {total_page}
      </p>
      <button
        type="button"
        disabled={!hasNextPage}
        onClick={() => {
          router.push(`/home?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <FaAngleDoubleRight size={20} />
      </button>
    </div>
  );
};

export default PaginationControl;
