import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebaseConfig';
import MyOrder from '../../components/MyOrder';


const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [user] = useAuthState(auth);
   console.log(myOrders)
    
    useEffect(() => {
           const email = user?.email;
        if (email) {
              const getMyOrder = async () => {
              const url = `https://ancient-beyond-42134.herokuapp.com/my-order?email=${email}`;
              const { data } = await axios.get(url);
              setMyOrders(data);
          }
          getMyOrder()
         }
    }, [user])
  
    const handleDelete = id => {
      const proceed = window.confirm('Are you Sure?');
      if (proceed) {
          const url = `https://ancient-beyond-42134.herokuapp.com/order/${id}`;
          fetch(url, {
              method:'DELETE'
          })
              .then(res => res.json())
              .then(data => {
                  console.log(data);
                  const remaining = myOrders.filter(order => order._id !== id);
                  setMyOrders(remaining)
          })}}
  
    return (
        
        <>
        <h1 className='mt-4 text-xl font-semibold text-indigo-700'>YOUR ORDER'S </h1>
       <div className="overflow-x-auto w-[90%] mt-4">
       <table className="table w-full">
         <thead>
           <tr>
             <th>IMAGE</th>
             <th>PART</th>
             <th>ORDER QUANTITY</th>
             <th>TOTAL COST</th>
             <th>WHERE SEND(ADDRESS) </th>
             <th>PAYMENT</th>
             <th>DELETE</th>
             <th>DELETE</th>
           </tr>
         </thead>
         <tbody>
        {myOrders.map(order =>
           <MyOrder
             key={order._id}
            order={order}
            handleDelete ={handleDelete}
             />,
             )  }
         </tbody>
       </table>
        </div>
       </>
    );
};

export default MyOrders;