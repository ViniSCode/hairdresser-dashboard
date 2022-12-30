import { NextApiRequest, NextApiResponse } from "next/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, name, service, date, number, status } = req.body;

  let createdUserId: string | null = null;
  let createdAppointmentId: string | null = null;

  try {
    // Make the createAppointment mutation and wait for it to complete

    const response = await fetch(
      `https://api-sa-east-1.hygraph.com/v2/cla71chwd0qx901uo0ry870iq/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          mutation MyMutation {
            createAppointment(
              data: {
                customerStatus: ${status}, 
                service: "${service}", 
                date: "${date}", 
                customer: {
                  create: {
                    name: "${name}", 
                    number: "${number}", 
                    owner: {
                      connect: {
                        email: "${email}"
                      }
                    }
                  }
                }
              }
            ) {
              id,
              customer {
                id
              }
            }
          }
             
          `,
        }),
      }
    )

    const data = await response.json();
    createdAppointmentId = data.data.createAppointment.id
    createdUserId = data.data.createAppointment.customer.id

    // Make the publishAppointment, publishCustomer, and publishOwner mutations
    
    await publishAppointment(createdAppointmentId, createdUserId, email);

    res.status(200).redirect('/dashboard');
  } catch (error: any) {
    console.log(error.message);
    // Send an error response to the client
    res.status(500).send("Error creating appointment");
  }
};

async function publishAppointment (createdAppointmentId: any, createdUserId: any, email: string) {  
  try {

    const response = await fetch(
      `https://api-sa-east-1.hygraph.com/v2/cla71chwd0qx901uo0ry870iq/master`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          query: `
          mutation MyMutation {
            publishAppointment (where: {id: "${createdAppointmentId}"}) {
              id
            }
  
            publishCustomer (where: {id: "${createdUserId}"}) {
              id
            }
  
            publishOwner (where: {email: "${email}"}) {
              id
            }
          }
             
          `,
        }),
      }
    )

    const data = await response.json();

    console.log(data)
  } catch (error) {
    console.error('Error publishing appointment:', error);
    throw new Error("Error publishing appointment")
  }
}