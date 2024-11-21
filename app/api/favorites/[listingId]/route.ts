import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/app/libs/prismadb";

interface IParams {
    listingId: string;
}

export async function POST(request: Request, context: { params: Promise<IParams> }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    // Await and resolve `params` if it's a promise
    const resolvedParams: IParams = await context.params;
    const listingId = resolvedParams?.listingId;

    if (!listingId || typeof listingId !== "string") {
        throw new Error("Invalid Listing ID");
    }

    const favouriteIds = [...(currentUser.favouriteIds || [])];
    favouriteIds.push(listingId);

    const user = await prisma.user.update({
        where: {
            id: currentUser.id,
        },
        data: {
            favouriteIds,
        },
    });

    return NextResponse.json(user);
}

// TODO: DELETE commented
// export async function DELETE(request: Request, context: { params: IParams }) {
//   const currentUser = await getCurrentUser();

//   if (!currentUser) {
//     return NextResponse.error();
//   }

//   const listingId = context.params?.listingId; // Directly get the listingId from params

//   if (!listingId || typeof listingId !== "string") {
//     throw new Error("Invalid Listing ID");
//   }

//   let favouriteIds = [...(currentUser.favouriteIds || [])];
//   favouriteIds = favouriteIds.filter((id) => id !== listingId);

//   const user = await prisma.user.update({
//     where: {
//       id: currentUser.id,
//     },
//     data: {
//       favouriteIds,
//     },
//   });

//     return NextResponse.json(user);
// }
