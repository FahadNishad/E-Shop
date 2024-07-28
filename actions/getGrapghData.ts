import moment from "moment";
import prisma from "@/libs/prismadb"
export default async function getGraphData() {
    try {
        //get the start and end dates for the range (7 days to today ) 

        const startDate = moment().subtract(6, "days").startOf("day")
        const endDate = moment().endOf("day")

        // query the database to get order data grouped by createDate 


        const result = await prisma.order.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: startDate.toISOString(),
                    lte: endDate.toISOString()
                },
                status: "complete"
            },
            _sum: {
                amount: true
            }
        })
        // initialize an object to aggregate the date by day 
        const aggregatedData: {
            [day: string]: { day: string, date: string, totalAmount: number }
        } = {}
        //  create a clone of the start date to iterate over each day 
        const currentDate = startDate.clone()
        //  Iterate over each day in the data range 
        while (currentDate <= endDate) {
            // Format the day as a string (e.g., "Monday")

            const day = currentDate.format("dddd")
            console.log("day<<<<", day, currentDate);
            //initialize the aggregated data for the day data , and totalAmount 
            aggregatedData[day] = {
                day,
                date: currentDate.format('YYYY-MM-DD'),
                totalAmount: 0

            }
            //move to the next day 
            currentDate.add(1, "day")

        }
        result.forEach((entry) => {
            const day = moment(entry.createdAt).format('dddd')
            const amount = entry._sum.amount || 0
            aggregatedData[day].totalAmount += amount

        })
        //convert the aggregated object to an array sort it by date 
        const formattedData = Object.values(aggregatedData).sort((a, b) =>
            moment(a.date).diff(moment(b.date))
        )

        //return the formatted data 
        return formattedData
    } catch (error:any) {
        throw new Error(error)
    }
}