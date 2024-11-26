import {prisma} from "@/app/libs/prismadb";

type IParams = Promise<{listingId: string}>;

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
            user: {
                ...listing.user,
                id: listing?.user?.id || "",
                createdAt: listing?.user?.createdAt.toISOString() || null,
                updatedAt: listing?.user?.updatedAt.toISOString(),
                emailVerified: listing?.user?.emailVerified?.toISOString() || null,
            }
        }
    } catch(error: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
        throw new Error(error);
    }
}