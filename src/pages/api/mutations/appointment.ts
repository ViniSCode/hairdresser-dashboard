

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const { name, phone, service } = req.body;
//     const response = await fetch('https://api-sa-east-1.HYGRAPH/MASTER', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'x-api-key': process.env.secretkey,
//       },
//       body: JSON.stringify({
//         query: `
//           mutation AddAppointment($name: String!, $phone: String!, $service: String!) {
//             addAppointment(name: $name, phone: $phone, service: $service) {
//               id
//               name
//               phone
//               service
//             }
//           }
//         `,
//         variables: {
//           name,
//           phone,
//           service,
//         },
//       }),
//     });

//     if (response.ok) {
//       // Send a successful response to the client
//     } else {
//       // Send an error response to the client
//     }
//   } catch (error) {
//     // Send an error response to the client
//   }
// };


// if (response.ok) {
//   res.status(200).send({ success: true });
// } else {
//   // Send an error response to the client
// }
// To send an error response to the client, you can use the res.status and res.send functions and include an error message:
// Copy code
// if (response.ok) {
//   // Send a successful response to the client
// } else {
//   res.status(500).send({ error: 'Error adding appointment' });
// }