import React, { useEffect, useState } from 'react';
import { fetchSearchHistories } from '../api-client';

const SearchHistory = () => {

    const [histories, setHistories] = useState([]);
    useEffect(() => {
        const fetchHistories = async () => {
            try {
                const histories = await fetchSearchHistories();
                setHistories(histories);
                console.log('Search Histories:', histories);
            } catch (error) {
                console.error('Error fetching search histories:', error);
            }
        };
        fetchHistories();
    }, []);


  return (
    <div className='p-3 w-[85%] mx-auto mt-8'>
        <h1 className='font-semibold text-3xl text-green-800'>Search History</h1>
        <table className='w-full mt-5'>
            <thead>
                <tr>
                    <th className='p-3 border'>S/N</th>
                    <th className='p-3 border'>Search Term</th>
                    <th className='p-3 border'>Date</th>
                </tr>
            </thead>
            <tbody>
                {
                    histories.map((history, index) => (
                        <tr key={history._id}>
                            <td className='p-3 border'>{index + 1}</td>
                            <td className='p-3 border'>{history.searchTerm}</td>
                            <td className='p-3 border'>{new Date(history.dateSearched).toLocaleString()}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        
    </div>
  )
}

export default SearchHistory