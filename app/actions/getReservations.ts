import {prisma} from "@/app/libs/prismadb";
import { Reservation } from "@prisma/client";
import { SafeReservation } from "../types";

// type IParams = Promise<{listingId?: string; userId?: string; authorId?: string}>;
type IParams = { listingId?: string; userId?: string; authorId?: string };


export default async function getReservations(params: IParams): Promise<SafeReservation[]> {
    try {
        const {listingId, userId, authorId} = await params;

        const query: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

        if (listingId) {
            query.listingId = listingId;
        }

        if (userId) {
            query.userId = userId;
        }

        if (authorId) {
            query.listing = {userId: authorId}
        }

        const reservations = await prisma.reservation.findMany({
            include: {
                listing: true,
            },
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map((reservation: Reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                // @ts-expect-error asd
                ...reservation.listing,
                // @ts-expect-error asd
                createdAt: reservation?.listing?.createdAt.toISOString()
            }
        }));

        return safeReservations;
    } catch(error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(error);
    }
}