import prisma from "@/app/libs/prismadb";

export interface ILIstingParams {
    userId?: string;
    guestCount?: number;
    startDate?: string;
    endDate?: string;
    locationValue?: string;
    category?: string;
}

export default async function getListings(params: ILIstingParams) {
    try {
        const {userId, guestCount, startDate, endDate, locationValue, category} = await params;

        const query: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any

        if (userId) {
            query.userId = userId;
        }

        if (category) {
            query.category = category;
        }

        if (guestCount) {
            query.guestCount = {gte: +guestCount};
        }

        if (locationValue) {
            query.locationValue = locationValue;
        }

        if (startDate && endDate) {
            query.NOT = {
                reservations: {
                    some: {
                        OR: [
                            {
                                endDate: { gte: startDate },
                                startDate: { lte: startDate },
                            },
                            {
                                startDate: { lte: endDate },
                                endDate: { gte: endDate },
                            },
                        ]
                    }
                }
            };
        }

        const listings = await prisma.listing.findMany({
            where: query,
            orderBy: {
                createdAt: 'desc'
            }
        });

        const safeListings = listings.map((listing) => ({
            ...listing,
            createdAt: listing.createdAt.toISOString(),
        }));
        
        return safeListings;
    } catch (error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(error);
    }
}