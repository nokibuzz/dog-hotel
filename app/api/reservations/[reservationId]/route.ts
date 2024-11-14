import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
    reservationId?: string;
}

export async function DELETE(request: Request, {params}: {params: IParams}) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const { reservationId } = await params;

    if (!reservationId || typeof reservationId !== "string") {
        throw new Error("Invalid Reservation ID");
    }

    const reservation = await prisma.reservation.deleteMany({
        where: {
            id: reservationId,
            OR: [
                { userId: currentUser.id },
                { Listing: { userId: currentUser.id } }
            ]
        }
    });

    return NextResponse.json(reservation);
}