import { NextApiRequest, NextApiResponse } from "next/types";
import { client } from "../../../lib/urql";
import { GetAppointmentDocument } from './../../../generated/graphql';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, appointmentId, name, number, service, status, date} = req.body;

  try {
    // Make the createAppointment mutation and wait for it to complete
    
    const {data: {appointments}} = await client.query(GetAppointmentDocument, {
      id: appointmentId
    }).toPromise();
    
    if (appointmentId === appointments[0].id && appointments[0].customer.owner.email === email) {
      await fetch(
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
              deleteAppointment(where: {id: "${appointments[0].id}"}) {
                id
              }
              publishCustomer (where: {id: "${appointments.customer.id}"}) {
                id
              }
            }
            
            `,
          }),
        }
      ).then(response => {
        if (response.ok) {
          
        } else {
          throw new Error('Something went wrong')
        }
      })

      // const data = await response.json();
      // createdAppointmentId = data.data.createAppointment.id
      // createdUserId = data.data.createAppointment.customer.id

      // Make the publishAppointment, publishCustomer, and publishOwner mutations
      
      // await publishAppointment(createdAppointmentId, createdUserId, email);

    } else {
      throw new Error('Something went wrong')
    }

    res.status(200).redirect('/dashboard');
  } catch (error: any) {
    console.log(error.message);
    // Send an error response to the client
    res.status(500).send("Error creating appointment");
  }
};

// async function publishAppointment (createdAppointmentId: any, createdUserId: any, email: string) {  
//   try {

//     const response = await fetch(
//       `https://api-sa-east-1.hygraph.com/v2/cla71chwd0qx901uo0ry870iq/master`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${process.env.API_ACCESS_TOKEN}`,
//         },
//         body: JSON.stringify({
//           query: `
//           mutation MyMutation {
//             publishAppointment (where: {id: "${createdAppointmentId}"}) {
//               id
//             }
  
//             publishCustomer (where: {id: "${createdUserId}"}) {
//               id
//             }
  
//             publishOwner (where: {email: "${email}"}) {
//               id
//             }
//           }
             
//           `,
//         }),
//       }
//     )

//     const data = await response.json();

//   } catch (error) {
//     console.error('Error publishing appointment:', error);
//     throw new Error("Error publishing appointment")
//   }
// }