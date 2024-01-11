import { Rave, RavePayload } from "@/types";
import { db } from "./db"

export const getAllRaves = async () => {
    const data = await db.rave.findMany() 

    const formattedData = data.map((item: Rave) => ({
        ...item,
        quantity: item?.quantity?.toNumber(), // Convert 'quantity' Decimal to a number
        // Convert other Decimal values similarly if needed
      }));
    
      return formattedData; // 
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
    return formattedData
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
  const newRave = await db.rave.create({
    data: { ...payload },
    include: {
      author: true
    }
  })

  return newRave
}