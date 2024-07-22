import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, feautredImage}) {
  const imageUrl = appwriteService.getFilePreview(feautredImage);
  console.log(imageUrl);
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(feautredImage)} alt={title}
                className='rounded-xl' />

            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}


 export default PostCard

// import React, { useState, useEffect } from 'react';
// import appwriteService from "../appwrite/config";
// import { Link } from 'react-router-dom';

// function PostCard({ $id, title, feautredImage }) {
//   const [imageUrl, setImageUrl] = useState('');

//   useEffect(() => {
//     async function fetchImageUrl() {
//       try {
//         const url = await appwriteService.getFilePreview(feautredImage);
//         setImageUrl(url);
//       } catch (error) {
//         console.error('Error fetching image URL:', error);
//       }
//     }

//     fetchImageUrl();
//   }, [feautredImage]);

//   return (
//     <Link to={`/post/${$id}`}>
//       <div className='w-full bg-gray-100 rounded-xl p-4'>
//         <div className='w-full justify-center mb-4'>
//           {imageUrl ? (
//             <img src={imageUrl} alt={title} className='rounded-xl' />
//           ) : (
//             <div>Loading...</div>
//           )}
//         </div>
//         <h2 className='text-xl font-bold'>{title}</h2>
//       </div>
//     </Link>
//   );
// }

// export default PostCard;
