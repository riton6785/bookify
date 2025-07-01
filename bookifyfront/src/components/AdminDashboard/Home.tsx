import 
{ BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}
 from 'react-icons/bs'
import "./dashboard.css"
import SalesOverTime from './charts/SalesOverTime';
import SalesRevenueOverTime from './charts/SalesRevenueOverTime';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import SalesByGenres from './charts/SalesByGenres';

function Home() {
  const [productCount , setproductsCount] = useState<number>(0);
  const [categoryCount , setCategoryCount] = useState<number>(0);
  const [customersCount , setCustomersCount] = useState<number>(0);
  const user: User | null = useSelector((state: {userReducer: StateType})=> state.userReducer.user);

  const setCardsDataHandler = (async()=> {
    const config = {
       headers: {
        Authorization: `Bearer ${user?.token}`,
      },

    }
    const totalUser = await axios.get("http://localhost:2000/api/user/getrecordcount", config);
    setCustomersCount(totalUser.data);
    const totalProduct = await axios.get("http://localhost:2000/api/book/getrecordcount", config)
    setproductsCount(totalProduct.data);
    const totalCategory = await axios.get("http://localhost:2000/api/genres/getrecordcount", config);
    setCategoryCount(totalCategory.data)
  })
  useEffect(()=> {
    setCardsDataHandler();
  }, [])
  return (
    <main className='main-container'>
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>PRODUCTS</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h1>{productCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h1>{categoryCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CUSTOMERS</h3>
                    <BsPeopleFill className='card_icon'/>
                </div>
                <h1>{customersCount}</h1>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>ALERTS</h3>
                    <BsFillBellFill className='card_icon'/>
                </div>
                <h1>42</h1>
            </div>
        </div>
          <SalesOverTime/>
          <SalesRevenueOverTime/>
          <SalesByGenres/>
    </main>
  )
}

export default Home
