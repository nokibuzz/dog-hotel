import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body = await request.json();
    const {
        title, 
        description, 
        imageSrc, 
        category,
        roomCount, 
        guestCount, 
        location, 
        price,
        checkInTime,
        checkOutTime,
        hasCancelation,
        allowBooking,
        paymentMethodsCards,
        paymentMethodsCash,
        hasFood,
        hasGrooming,
        hasVet,
        addionalInformation
    } = body;

    const listing = await prisma.listing.create({
        data: {
            title,
            description,
            imageSrc, 
            category, 
            roomCount, 
            guestCount, 
            locationValue: location.value, 
            price: parseInt(price, 10),
            userId: currentUser.id,
            checkInTime,
            checkOutTime,
            hasCancelation,
            allowBooking,
            paymentMethodsCards,
            paymentMethodsCash,
            hasFood,
            hasGrooming,
            hasVet,
            addionalInformation
        }
    });

    return NextResponse.json(listing);
}
