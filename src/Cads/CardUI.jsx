import React from 'react';
import img1 from '../assets/treeimg.PNG';
import './card-style.css';

const Card = props =>{
    return(
       <div className='card-text-center'>
           <div className='overflow'>
               <img src={img1} alt='Image 1' className="card-img-top"/>
           </div>
           <div className="card-body text-dark">
               <h4 className="card-title">Card Title</h4>
               <p className="card-text text-secondary">
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptas cupiditate animi doloribus voluptatem, earum ea hic praesentium quidem a magni. Odit id eveniet aliquid temporibus reiciendis obcaecati at ipsam!
               </p>
               <a href="#"className="btn btn-outline-success">Go Anywhere</a>
           </div>
       </div>
    );
}

export default Card;