import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams) {
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
                Listing: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeReservations = reservations.map((reservation) => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            Listing: {
                ...reservation.Listing,
                createdAt: reservation?.Listing?.createdAt.toISOString()
            }
        }));

        return safeReservations;
    } catch(error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(error);
    }
}