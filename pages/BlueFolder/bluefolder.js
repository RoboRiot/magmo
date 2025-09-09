import React from 'react'

function bluefolder() {
  return (
    <div>bluefolder</div>
  )
}

export default bluefolder

// // pages/workOrders.js
// import React from 'react';
// import { getWorkOrders } from '../../context/BlueFolder/bluefolderService';
// import { requireAuthentication } from '../../context/BlueFolder/auth';

// export const getServerSideProps = requireAuthentication(async (context, session, accessToken) => {
//   const workOrders = await getWorkOrders(accessToken); // Retrieve work orders using the token
//   return { props: { workOrders } };
// });

// function WorkOrders({ workOrders }) {
//   return (
//     <div>
//       <h1>Work Orders</h1>
//       {workOrders.map(order => (
//         <div key={order.id}>
//           <p>Work Order Number: {order.number}</p>
//           <p>Name: {order.name}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WorkOrders;
