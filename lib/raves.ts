import { Rave, RavePayload, UpdateRavePayload } from "@/types";
import { db } from "./db"

export const getAllRaves = async (userId: string) => {
      const data = await db.rave.findMany({
        where: {
         authorId: userId, // Replace 'userId' with the actual field name in your rave model
        },
      }) 

      const formattedData = data.map((item: Rave) => ({
          ...item,
          quantity: item?.quantity?.toNumber(), // Convert 'quantity' Decimal to a number
        }));
      
      return formattedData;
}

export const getRave = async (id: string) => {
    const data = await db.rave.findUnique({
          where: {
            id: id,
          },
      });
      const formattedData = {
          ...data,
          quantity: data?.quantity?.toNumber()
      }
      
      return formattedData as Rave
}

export const getNearestPastRave = async () => {
    const currentDate = new Date(); 

    const data = await db.rave.findMany({
      orderBy: {
        date: 'desc', // Order by date in descending order
      },
      take: 1, // Retrieve only the closest date
      where: {
        date: {
          lt: currentDate, // Get dates less than the current date
        },
      },
    });
  
    if (!data || data.length === 0) {
      return null;
    }
  
    const nearestPastDate = data[0].date
    
    return nearestPastDate;
};

export const createRave = async (payload: RavePayload) => {
     await db.rave.create({
      data: { ...payload },
      include: {
        author: true
      }
    })
}

export const updateRave = async (id: string, payload: UpdateRavePayload) => {
    await db.rave.update({
      where: { id },
      data: { ...payload },
    })
}


export const deleteRave = async (id: string) => {
    await db.rave.delete({
      where: {
        id: id
      },
    })
}