import { AiOutlineEdit } from "react-icons/ai";

type Customer = {
  __typename?: "Customer";
  name: string;
  number: number;
};

interface CustomerProps {
  customer: Customer;
}

export function Customer({ customer }: CustomerProps) {
  return (
    <div className="w-full bg-gray-800 lg:bg-gray-800 px-4 lg:px-0 py-4 flex flex-col h-fit rounded-lg lg:rounded-none lg:border-b lg:border-gray-500">
      <div className="flex-1 w-full flex justify-between">
        <span className="block font-medium truncate">{customer.name}</span>
        <div className="flex items-center gap-1 ml-2">
          <span className="truncate flex-1 text-sm text-gray-500 font-medium">
            Edit
          </span>
          <AiOutlineEdit size={18} className="text-gray-500" />
        </div>
      </div>
      <span className="block text-gray-500 text-sm font-semibold truncate">
        {customer.number}
      </span>
    </div>
  );
}
