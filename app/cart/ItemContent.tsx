"use client";
import React from "react";
import { CartProductType } from "../product/[productId]/productDetails";
import { formatPrice } from "@/utils/formatPrice";
import Link from "next/link";
import { truncateText } from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";
import { useCart } from "../hooks/useCart";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const { handleRemoveItemToCart, handleCartQtIncrease, handleCartQtDecrease } =
    useCart();
  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t-[1.5px] border-slate-200 py-4 items-center">
      <div
        className="col-span-2  justify-self-start flex gap-2 md:hap4
      "
      >
        <Link
          href={`/product/${item.id}`}
          className="relative w-[70px] aspect-square"
        >
          <div>
            <Image
              fill
              src={item.selectedImage.image}
              alt={item.name}
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>{truncateText(item.name)}</Link>
          <div>{item.selectedImage.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500  underline"
              onClick={() => {
                handleRemoveItemToCart(item);
              }}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyIncrease={() => {
            handleCartQtIncrease(item);
          }}
          handleQtyDecrease={() => {
            handleCartQtDecrease(item);
          }}
        />
      </div>
      <div className="font-semibold justify-self-end">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
