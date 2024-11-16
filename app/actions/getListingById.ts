import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId?: string;
}

export default async function getListingById(params: IParams) {
    try {
        const {listingId} = await params;

        const listing = await prisma.listing.findUnique({
            where: {
                id: listingId
            },
            include: {
                user: true
            }
        });

        if (!listing) {
            return null;
        }

        return {
            ...listing,
            createdAt: listing.createdAt.toISOString(),
            User: {
                ...listing.User,
                createdAt: listing?.User?.createdAt.toISOString() || null,
                updatedAt: listing?.User?.updatedAt.toISOString(),
                emailVerified: listing?.User?.emailVerified?.toISOString() || null,
            }
        }
    } catch(error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(error);
    }
}