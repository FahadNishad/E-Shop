import Stripe from "stripe";
import prisma from '@/libs/prismadb'
import { CartProductType } from "@/app/product/[productId]/productDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";




const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2024-06-20", })

const calculateOrderAmount = (item: CartProductType[]) => {

    const totalPrice = item.reduce((acc, item) => {
        const itemTotal = item.price * item.quantity
        return acc + itemTotal
    }, 0)

    const price: any = Math.floor(totalPrice)
    return price



}

export async function POST(request: Request) {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { items, payment_intent_id } = body

    console.log('this is the item ', items);
    console.log('this is the payment intent id  ', payment_intent_id);


    const total = calculateOrderAmount(items) * 100

    const orderData = {
        user: { connect: { id: currentUser.id } },
        amount: total,
        currency: "usd",
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: payment_intent_id,
        products: items

    }

    if (payment_intent_id) {
        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id)
        if (current_intent) {
            const updated_intent = await stripe.paymentIntents.update(
                payment_intent_id,
                {
                    amount: total
                }
            )
            //update the order

            const [existing_order, update_order] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id }
                }),

                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ])

            if (!existing_order) {
                return NextResponse.json({ error: 'Invalid Payment Intent' }, { status: 400 })

            }

            return NextResponse.json({ paymentIntent: updated_intent })
        }
    }


    else {
        //create the payment intent 
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
            automatic_payment_methods: { enabled: true }
        })
        //create the order 
        orderData.paymentIntentId = paymentIntent.id
        await prisma.order.create({
            data: orderData
        })
        return NextResponse.json({ paymentIntent })
    }

}