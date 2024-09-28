import React from 'react'

const SearchHistory = () => {
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
                <tr>
                    <td className='p-3 border'>1</td>
                    <td className='p-3 border'>React</td>
                    <td className='p-3 border'>2021-09-01</td>
                </tr>
                <tr>
                    <td className='p-3 border'>2</td>
                    <td className='p-3 border'>Vue</td>
                    <td className='p-3 border'>2021-09-02</td>
                </tr>
                <tr>
                    <td className='p-3 border'>3</td>
                    <td className='p-3 border'>Angular</td>
                    <td className='p-3 border'>2021-09-03</td>
                </tr>
            </tbody>
        </table>
        
    </div>
  )
}

export default SearchHistory