"use client";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import React from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";

const SearchBar = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      searchTerm: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const searchTerm = data.searchTerm as string; 
    if (!searchTerm) return router.push("/");

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: {
          searchTerm,
        },
      },
      { skipNull: true }
    );
    router.push(url);
    reset();
  };

  return (
    <div className="flex items-center">
      <input
        {...register("searchTerm")}
        placeholder="Explore E-shop"
        type="text"
        autoComplete="off"
        className="p-2 border border-gray-300 rounded-l-md focus:border-[0.5px] focus:border-slate-500 w-80"
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="bg-slate-700 hover:opacity-80 text-white p-2 rounded-r-md"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
