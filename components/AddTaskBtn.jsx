"use client";

import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const AddTaskBtn = () => {
  return (
    <Link href='/task'>
      <PlusIcon className="h-6 w-6" />
    </Link>
  );
};

export default AddTaskBtn;
