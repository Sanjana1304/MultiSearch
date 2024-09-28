import React from 'react';

const CardScroller = ({ cards }) => {
  return (
    <div className=" overflow-x-scroll p-4" style={{ whiteSpace: 'nowrap' }}>
      {cards?.map((card, index) => (
        <a href={card.url} target='_blank' key={index}>
        <div
            key={index}
            className="inline-block card-shadow m-2 p-4 rounded-lg border border-gray-300"
            style={{ width: '300px', minWidth: '250px' }}
        >
            <div>
                <img
                    src={card.thumbnail}
                    alt="thumbnail"
                    title={card.description}
                    style={{ width: '100%', height: '200px' }}
                    className='rounded-lg'
                />
            </div>
            <div className=''>
                <p className="font-semibold text-green-800 text-sm">{card.title.substring(0,35)}</p>
                {
                    card.type === "youtube video" &&
                        <div className="flex text-[11px] justify-between font-semibold">
                            <div>{card.likes} Likes</div>
                            <div>{card.comments} Comments</div>
                            <div>{card.views} Views</div>
                        </div>
                }
                {
                    (card.type === "article" || card.type === "paper" ) &&
                        <p className='font-semibold text-sm text-green-500'>Author: {card.author}</p>
                }
                {
                    card.type === "blog" &&
                        <p className='font-semibold text-sm text-green-500'>Likes: {card.likes}</p>
                }
                <p className='text-[11px] text-gray-500 mt-5'>Published : {card.publishedAt}</p>
            </div>
        </div>
        </a>
      ))}
    </div>
  );
};

export default CardScroller;